import eip55 from "eip55";
import BigNumber from "bignumber.js";
import { NFT, Operation } from "../types";
import { encodeNftId } from ".";

export const nftsFromOperations = (ops: Operation[]): NFT[] => {
  const nftsMap = ops
    // if ops are Operations get the prop nftOperations, else ops are considered nftOperations already
    .flatMap((op) => (op?.nftOperations?.length ? op.nftOperations : op))
    .reduce((acc: Record<string, NFT>, nftOp: Operation) => {
      let { contract } = nftOp;
      if (!contract) {
        return acc;
      }

      // Creating a "token for a contract" unique key
      contract = eip55.encode(contract);
      const { tokenId, standard, accountId } = nftOp;
      if (!tokenId || !standard) return acc;
      const id = encodeNftId(accountId, contract, tokenId || "");

      const nft = (acc[id] || {
        id,
        tokenId,
        amount: new BigNumber(0),
        collection: { contract, standard },
      }) as NFT;

      if (nftOp.type === "NFT_IN") {
        nft.amount = nft.amount.plus(nftOp.value);
      } else if (nftOp.type === "NFT_OUT") {
        nft.amount = nft.amount.minus(nftOp.value);
      }

      acc[id] = nft;

      return acc;
    }, {});

  return Object.values(nftsMap);
};

export const nftsByCollections = (
  nfts: NFT[] = [],
  collectionAddress: string
): NFT[] => {
  return nfts.filter((n) => n.contract === collectionAddress);
};

export const getNftKey = (contract: string, tokenId: string): string => {
  return `${contract}-${tokenId}`;
};
