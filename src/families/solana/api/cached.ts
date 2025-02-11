import { makeLRUCache } from "../../../cache";
import { ChainAPI } from "./chain";
import hash from "object-hash";

export function seconds(num: number, max = 100): Record<string, any> {
  return {
    max,
    maxAge: num * 1000,
  };
}

export function minutes(num: number, max = 100): Record<string, any> {
  return seconds(num * 60, max);
}

const cacheKeyAddress = (address: string) => address;
const cacheKeyEmpty = () => "" as const;
const cacheKeyAssocTokenAccAddress = (owner: string, mint: string) =>
  `${owner}:${mint}`;

const cacheKeyTransactions = (signatures: string[]) =>
  hash([...signatures].sort());

const cacheKeyByArgs = (...args: any[]) => hash(args);

export function cached(api: ChainAPI): ChainAPI {
  return {
    findAssocTokenAccAddress: makeLRUCache(
      api.findAssocTokenAccAddress,
      cacheKeyAssocTokenAccAddress,
      minutes(1000)
    ),

    getAccountInfo: makeLRUCache(
      api.getAccountInfo,
      cacheKeyAddress,
      seconds(30)
    ),

    getAssocTokenAccMinNativeBalance: makeLRUCache(
      api.getAssocTokenAccMinNativeBalance,
      cacheKeyEmpty,
      minutes(5)
    ),

    getBalance: makeLRUCache(api.getBalance, cacheKeyAddress, seconds(30)),

    getBalanceAndContext: makeLRUCache(
      api.getBalanceAndContext,
      cacheKeyAddress,
      seconds(30)
    ),

    getParsedConfirmedTransactions: makeLRUCache(
      api.getParsedConfirmedTransactions,
      cacheKeyTransactions,
      seconds(30)
    ),

    getParsedTokenAccountsByOwner: makeLRUCache(
      api.getParsedTokenAccountsByOwner,
      cacheKeyAddress,
      minutes(1)
    ),

    getRecentBlockhash: makeLRUCache(
      api.getRecentBlockhash,
      cacheKeyEmpty,
      seconds(5)
    ),

    getTxFeeCalculator: makeLRUCache(
      api.getTxFeeCalculator,
      cacheKeyEmpty,
      minutes(5)
    ),

    getSignaturesForAddress: makeLRUCache(
      api.getSignaturesForAddress,
      cacheKeyByArgs,
      seconds(30)
    ),

    // do not cache
    sendRawTransaction: api.sendRawTransaction,

    config: api.config,
  };
}
