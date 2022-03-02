import type BigNumber from "bignumber.js";

export type NFTStandards = "ERC721" | "ERC1155";

export type NFTMetadata = {
  tokenName: string | null;
  nftName: string | null;
  media: string | null;
  description: string | null;
  properties: Array<Record<"key" | "value", string>>;
  links: Record<NFTMetadataLinksProviders, string>;
};

export type ProtoNFT = {
  // id crafted by live
  id: string;
  // id on chain
  tokenId: string;
  amount: BigNumber;
  // contract address. Careful 1 contract address != 1 collection as some collections are off-chain
  // So 1 contract address from OpenSea for example can reprensent an infinity of virtual collections on OS
  // Carefull to non spec compliant NFTs (cryptopunks, cryptokitties, ethrock, and others?)
  contract: string;
  standard: NFTStandards;
  currencyId: string;
  metadata?: NFTMetadata;
};

export type NFT = ProtoNFT & {
  metadata: NFTMetadata;
};

export type NFTRaw = Omit<NFT, "amount"> & {
  amount: string;
};

export type NFTMetadataLinksProviders = "opensea" | "rarible" | "etherscan";

export type NFTMetadataResponse = {
  status: 200 | 404 | 500;
  result?: {
    contract: string;
    tokenId: string;
    tokenName: string | null;
    nftName: string | null;
    media: string | null;
    description: string | null;
    properties: Array<Record<"key" | "value", string>>;
    links: Record<NFTMetadataLinksProviders, string>;
  } | null;
};
