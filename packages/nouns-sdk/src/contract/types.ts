import {
  NounsTokenFactory,
  NounsAuctionHouseFactory,
  NounsDescriptorFactory,
  NounsSeederFactory,
  NounsDaoLogicV1Factory,
  NounsAuctionReferralFactory,
} from '@nouns/contracts';

export interface ContractAddresses {
  nounsToken: string;
  nounsSeeder: string;
  nounsDescriptor: string;
  nftDescriptor: string;
  nounsAuctionHouse: string;
  nounsAuctionHouseProxy: string;
  nounsAuctionHouseProxyAdmin: string;
  nounsDaoExecutor: string;
  nounsDAOProxy: string;
  nounsDAOLogicV1: string;
  nounsAuctionReferral: string;
}

export interface Contracts {
  nounsTokenContract: ReturnType<typeof NounsTokenFactory.connect>;
  nounsAuctionHouseContract: ReturnType<typeof NounsAuctionHouseFactory.connect>;
  nounsDescriptorContract: ReturnType<typeof NounsDescriptorFactory.connect>;
  nounsSeederContract: ReturnType<typeof NounsSeederFactory.connect>;
  nounsDaoContract: ReturnType<typeof NounsDaoLogicV1Factory.connect>;
  nounsAuctionReferralContract: ReturnType<typeof NounsAuctionReferralFactory.connect>;
}

export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Kovan = 42,
  Goerli = 5,
  Local = 31337,
}
