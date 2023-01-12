import { useQuery } from '@apollo/client';
import React from 'react';
import { Image } from 'react-bootstrap';
import _LinkIcon from '../../assets/icons/Link.svg';
import { auctionQuery } from '../../wrappers/subgraph';
import _HeartIcon from '../../assets/icons/Heart.svg';
import classes from './NounInfoRowHolder.module.css';

import config from '../../config';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import ShortAddress from '../ShortAddress';

import { useAppSelector } from '../../hooks';
import { Trans } from '@lingui/macro';

interface NounInfoRowHolderProps {
  nounId: number;
}

const NounInfoRowHolder: React.FC<NounInfoRowHolderProps> = props => {
  const { nounId } = props;
  const isCool = useAppSelector(state => state.application.isCoolBackground);
  const { loading, error, data } = useQuery(auctionQuery(nounId));

  const winner = data && data.auction && data.auction.bidder && data.auction.bidder.id;

  if (loading || !winner) {
    return (
      <div className={classes.nounHolderInfoContainer}>
        <span className={classes.nounHolderLoading}>
          <Trans>Loading...</Trans>
        </span>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <Trans>Failed to fetch Social Noun info</Trans>
      </div>
    );
  }

  const etherscanURL = buildEtherscanAddressLink(winner);
  const shortAddressComponent = <ShortAddress address={winner} />;

  return (
    <div className={classes.nounHolderInfoContainer}>
      <span>
        <Image src={_HeartIcon} className={classes.heartIcon} />
      </span>
      <span>
        <Trans>Winner</Trans>
      </span>
      <span>
        <a
          className={
            isCool ? classes.nounHolderEtherscanLinkCool : classes.nounHolderEtherscanLinkWarm
          }
          href={etherscanURL}
          target={'_blank'}
          rel="noreferrer"
        >
          {winner.toLowerCase() === config.addresses.nounsAuctionHouseProxy.toLowerCase() ? (
            <Trans>Social Nouns Auction House</Trans>
          ) : (
            shortAddressComponent
          )}
        </a>
      </span>
      <span className={classes.linkIconSpan}>
        <Image src={_LinkIcon} className={classes.linkIcon} />
      </span>
    </div>
  );
};

export default NounInfoRowHolder;
