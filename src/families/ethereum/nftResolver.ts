import type { CurrencyBridge } from "../../types";
import type { API } from "../../api/Ethereum";
import { getCryptoCurrencyById } from "../../currencies";
import { apiForCurrency } from "../../api/Ethereum";

const nftMetadataResolver: CurrencyBridge["nftMetadataResolver"] = async ({
  contract,
  tokenId,
  currencyId,
}) => {
  const currency = getCryptoCurrencyById(currencyId);
  const ethApi: API = apiForCurrency(currency);

  switch (currency?.ethereumLikeInfo?.chainId) {
    case 1: {
    }

    default: {
      return {};
    }
  }
};

export default nftMetadataResolver;
