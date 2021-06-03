// @flow

import type { Exchange, GetExchangeRates } from "./types";
import type { Transaction } from "../../types";
import { getAccountCurrency, getAccountUnit } from "../../account";
import type { Unit } from "../../types";
import { formatCurrencyUnit } from "../../currencies";
import { mockGetExchangeRates } from "./mock";
import network from "../../network";
import { getSwapAPIBaseURL } from "./";
import { getEnv } from "../../env";
import { BigNumber } from "bignumber.js";
import {
  SwapExchangeRateAmountTooLow,
  SwapExchangeRateAmountTooHigh,
} from "../../errors";

const getExchangeRates: GetExchangeRates = async (
  exchange: Exchange,
  transaction: Transaction,
  userId?: string // TODO remove when wyre doesn't require this for rates
) => {
  if (getEnv("MOCK")) return mockGetExchangeRates(exchange, transaction);

  // Rely on the api base to determine the version logic
  const usesV3 = getSwapAPIBaseURL().endsWith("v3");
  const from = getAccountCurrency(exchange.fromAccount).id;
  const unitFrom = getAccountUnit(exchange.fromAccount);
  const unitTo = getAccountUnit(exchange.toAccount);
  const to = getAccountCurrency(exchange.toAccount).id;
  const amountFrom = transaction.amount;
  const tenPowMagnitude = BigNumber(10).pow(unitFrom.magnitude);
  const apiAmount = BigNumber(amountFrom).div(tenPowMagnitude);
  const request = {
    from,
    to,
    amountFrom: apiAmount.toString(),
  };
  const res = await network({
    method: "POST",
    url: `${getSwapAPIBaseURL()}/rate`,
    headers: {
      ...(userId ? { userId } : {}),
    },
    data: usesV3 ? request : [request],
  });

  return res.data.map((responseData) => {
    const {
      amountFrom,
      amountTo,
      payoutNetworkFees,
      provider,
      rate,
      rateId,
      tradeMethod,
    } = responseData;

    const error = inferError(apiAmount, unitFrom, responseData);
    if (error) {
      return {
        provider,
        tradeMethod,
        error,
      };
    }
    const toMagnitudePow = BigNumber(10).pow(unitTo.magnitude);
    if (tradeMethod === "fixed") {
      return {
        magnitudeAwareRate: BigNumber(rate),
        provider,
        rate,
        rateId,
        toAmount: BigNumber(amountTo).times(toMagnitudePow),
        tradeMethod,
      };
    } else {
      // NB For floating trades we don't have a guaranteed rate but rather an estimated `amountTo`
      const magnitudeChange = BigNumber(10).pow(
        unitFrom.magnitude - unitTo.magnitude
      );
      return {
        magnitudeAwareRate: BigNumber(amountTo)
          .div(amountFrom)
          .div(magnitudeChange),
        payoutNetworkFees: BigNumber(payoutNetworkFees).times(toMagnitudePow),
        provider,
        rate: BigNumber(amountTo).div(amountFrom),
        toAmount: BigNumber(amountTo).times(toMagnitudePow),
        tradeMethod,
      };
    }
  });
};

const inferError = (
  apiAmount: BigNumber,
  unitFrom: Unit,
  responseData: {
    amountTo: string,
    minAmountFrom: string,
    maxAmountFrom: string,
    errorCode?: number,
  }
): ?Error => {
  const tenPowMagnitude = BigNumber(10).pow(unitFrom.magnitude);
  const { amountTo, minAmountFrom, maxAmountFrom, errorCode } = responseData;

  if (!amountTo) {
    // We are in an error case regardless of api version.
    if (errorCode) {
      // TODO Do we have consistent errorCodes for providers?
      return new Error(`Generic Swap API error with code [${errorCode}]`);
    }
    // For out of range errors we will have a min/max pairing
    if (minAmountFrom) {
      const isTooSmall = BigNumber(apiAmount).lte(minAmountFrom);

      const MinOrMaxError = isTooSmall
        ? SwapExchangeRateAmountTooLow
        : SwapExchangeRateAmountTooHigh;

      const key: string = isTooSmall
        ? "minAmountFromFormatted"
        : "maxAmountFromFormatted";

      const amount = isTooSmall ? minAmountFrom : maxAmountFrom;

      return new MinOrMaxError(null, {
        [key]: formatCurrencyUnit(
          unitFrom,
          BigNumber(amount).times(tenPowMagnitude),
          {
            alwaysShowSign: false,
            disableRounding: true,
            showCode: true,
          }
        ),
      });
    }
  }
  return;
};

export default getExchangeRates;
