// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '../governance/NounsDAOLogicV1.sol';

contract NounsDAOLogicV1Harness is NounsDAOLogicV1 {
    function initialize(
        address timelock_,
        address nouns_,
        address vetoer_,
        uint256 votingPeriod_,
        uint256 votingDelay_,
        uint256 proposalThresholdBPS_,
        uint256 quorumVotesBPS_
    ) public override {
        require(msg.sender == admin, 'sNounsDAO::initialize: admin only');
        require(address(timelock) == address(0), 'sNounsDAO::initialize: can only initialize once');

        timelock = INounsDAOExecutor(timelock_);
        nouns = NounsTokenLike(nouns_);
        vetoer = vetoer_;
        votingPeriod = votingPeriod_;
        votingDelay = votingDelay_;
        proposalThresholdBPS = proposalThresholdBPS_;
        quorumVotesBPS = quorumVotesBPS_;
    }
}
