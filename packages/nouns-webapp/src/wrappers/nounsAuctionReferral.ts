import { useContractCall } from '@usedapp/core';
import { BigNumber as EthersBN, utils } from 'ethers';
import { NounsAuctionReferralABI } from '@nouns/sdk';
import config from '../config';
import BigNumber from 'bignumber.js';

export enum AuctionHouseReferralContractFunction {
  createBid = 'createBid',
}

