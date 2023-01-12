import { Proposal, ProposalState } from '../../wrappers/nounsDao';
import { Alert, Button } from 'react-bootstrap';
import ProposalStatus from '../ProposalStatus';
import classes from './Proposals.module.css';
import { useHistory } from 'react-router-dom';
import { useBlockNumber, useEthers } from '@usedapp/core';
import { isMobileScreen } from '../../utils/isMobile';
import clsx from 'clsx';
import { useUserNounTokenBalance, useUserVotes } from '../../wrappers/nounToken';
import { Trans } from '@lingui/macro';
import { ClockIcon } from '@heroicons/react/solid';
import proposalStatusClasses from '../ProposalStatus/ProposalStatus.module.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useActiveLocale } from '../../hooks/useActivateLocale';
import { SUPPORTED_LOCALE_TO_DAYSJS_LOCALE, SupportedLocale } from '../../i18n/locales';
import React, { useState } from 'react';
import DelegationModal from '../DelegationModal';
import { i18n } from '@lingui/core';
import en from 'dayjs/locale/en';

dayjs.extend(relativeTime);

const getCountdownCopy = (proposal: Proposal, currentBlock: number, locale: SupportedLocale) => {
  const AVERAGE_BLOCK_TIME_IN_SECS = 13;
  const timestamp = Date.now();
  const startDate =
    proposal && timestamp && currentBlock
      ? dayjs(timestamp).add(
          AVERAGE_BLOCK_TIME_IN_SECS * (proposal.startBlock - currentBlock),
          'seconds',
        )
      : undefined;

  const endDate =
    proposal && timestamp && currentBlock
      ? dayjs(timestamp).add(
          AVERAGE_BLOCK_TIME_IN_SECS * (proposal.endBlock - currentBlock),
          'seconds',
        )
      : undefined;

  const expiresDate = proposal && dayjs(proposal.eta).add(14, 'days');

  const now = dayjs();

  if (startDate?.isBefore(now) && endDate?.isAfter(now)) {
    return (
      <Trans>
        Ends {endDate.locale(SUPPORTED_LOCALE_TO_DAYSJS_LOCALE[locale] || en).fromNow()}
      </Trans>
    );
  }
  if (endDate?.isBefore(now)) {
    return (
      <Trans>
        Expires {expiresDate.locale(SUPPORTED_LOCALE_TO_DAYSJS_LOCALE[locale] || en).fromNow()}
      </Trans>
    );
  }
  return (
    <Trans>
      Starts{' '}
      {dayjs(startDate)
        .locale(SUPPORTED_LOCALE_TO_DAYSJS_LOCALE[locale] || en)
        .fromNow()}
    </Trans>
  );
};

const Proposals = ({ proposals }: { proposals: Proposal[] }) => {
  const history = useHistory();

  const { account } = useEthers();
  const connectedAccountNounVotes = useUserVotes() || 0;
  const currentBlock = useBlockNumber();
  const isMobile = isMobileScreen();
  const activeLocale = useActiveLocale();
  const [showDelegateModal, setShowDelegateModal] = useState(false);

  const nullStateCopy = () => {
    if (account !== null) {
      return <Trans>You have no Votes.</Trans>;
    }
    return <Trans>Connect wallet to make a proposal.</Trans>;
  };

  const hasNounVotes = account !== undefined && connectedAccountNounVotes > 0;
  const hasNounBalance = (useUserNounTokenBalance() ?? 0) > 0;
  return (
    <div className={classes.proposals}>
      {showDelegateModal && <DelegationModal onDismiss={() => setShowDelegateModal(false)} />}
      <div className={clsx(classes.headerWrapper, !hasNounVotes ? classes.forceFlexRow : '')}>
        <h3 className={classes.heading}>
          <Trans>Proposals</Trans>
        </h3>
        {hasNounVotes ? (
          <div className={classes.nounInWalletBtnWrapper}>
            <div className={classes.submitProposalButtonWrapper}>
              <Button
                className={classes.generateBtn}
                onClick={() => history.push('create-proposal')}
              >
                <Trans>Submit Proposal</Trans>
              </Button>
            </div>

            {hasNounBalance && (
              <div className={classes.delegateBtnWrapper}>
                <Button
                  className={classes.changeDelegateBtn}
                  onClick={() => setShowDelegateModal(true)}
                >
                  <Trans>Delegate</Trans>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className={clsx('d-flex', classes.nullStateSubmitProposalBtnWrapper)}>
            {!isMobile && <div className={classes.nullStateCopy}>{nullStateCopy()}</div>}
            <div className={classes.nullBtnWrapper}>
              <Button className={classes.generateBtnDisabled}>
                <Trans>Submit Proposal</Trans>
              </Button>
            </div>
            {!isMobile && hasNounBalance && (
              <div className={classes.delegateBtnWrapper}>
                <Button
                  className={classes.changeDelegateBtn}
                  onClick={() => setShowDelegateModal(true)}
                >
                  <Trans>Delegate</Trans>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {isMobile && <div className={classes.nullStateCopy}>{nullStateCopy()}</div>}
      {isMobile && hasNounBalance && (
        <div>
          <Button className={classes.changeDelegateBtn} onClick={() => setShowDelegateModal(true)}>
            <Trans>Delegate</Trans>
          </Button>
        </div>
      )}
      {proposals?.length ? (
        proposals
          .slice(0)
          .reverse()
          .map((p, i) => {
            const isPropInStateToHaveCountDown =
              p.status === ProposalState.PENDING ||
              p.status === ProposalState.ACTIVE ||
              p.status === ProposalState.QUEUED;

            const countdownPill = (
              <div className={classes.proposalStatusWrapper}>
                <div className={clsx(proposalStatusClasses.proposalStatus, classes.countdownPill)}>
                  <div className={classes.countdownPillContentWrapper}>
                    <span className={classes.countdownPillClock}>
                      <ClockIcon height={16} width={16} />
                    </span>{' '}
                    <span className={classes.countdownPillText}>
                      {getCountdownCopy(p, currentBlock || 0, activeLocale)}
                    </span>
                  </div>
                </div>
              </div>
            );

            return (
              <div
                className={clsx(classes.proposalLink, classes.proposalLinkWithCountdown)}
                onClick={() => history.push(`/vote/${p.id}`)}
                key={i}
              >
                <div className={classes.proposalInfoWrapper}>
                  <span className={classes.proposalTitle}>
                    <span className={classes.proposalId}>{i18n.number(parseInt(p.id || '0'))}</span>{' '}
                    <span>{p.title}</span>
                  </span>

                  {isPropInStateToHaveCountDown && (
                    <div className={classes.desktopCountdownWrapper}>{countdownPill}</div>
                  )}
                  <div className={clsx(classes.proposalStatusWrapper, classes.votePillWrapper)}>
                    <ProposalStatus status={p.status}></ProposalStatus>
                  </div>
                </div>

                {isPropInStateToHaveCountDown && (
                  <div className={classes.mobileCountdownWrapper}>{countdownPill}</div>
                )}
              </div>
            );
          })
      ) : (
        <Alert variant="secondary">
          <Alert.Heading>
            <Trans>No proposals found</Trans>
          </Alert.Heading>
          <p>
            <Trans>Proposals submitted by community members will appear here.</Trans>
          </p>
        </Alert>
      )}
    </div>
  );
};
export default Proposals;
