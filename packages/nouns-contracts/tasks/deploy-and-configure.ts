import { task, types } from 'hardhat/config';
import { printContractsTable } from './utils';
async function delay(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, 1000 * seconds));
}

task('deploy-and-configure', 'Deploy and configure all contracts')
  .addFlag('startAuction', 'Start the first auction upon deployment completion')
  .addFlag('autoDeploy', 'Deploy all contracts without user interaction')
  .addFlag('updateConfigs', 'Write the deployed addresses to the SDK and subgraph configs')
  .addOptionalParam('weth', 'The WETH contract address')
  .addOptionalParam('noundersdao', 'The nounders DAO contract address',"0xca5b18bAc2c94ba742062968BB0fEA7A28540bDe",types.string)
  .addOptionalParam(
    'auctionTimeBuffer',
    'The auction time buffer (seconds)',
    5 * 60 /* 5 minutes */,
    types.int,
  )
  .addOptionalParam('auctionReservePrice', 'The auction reserve price (wei)')
  .addOptionalParam(
    'auctionMinIncrementBidPercentage',
    'The auction min increment bid percentage (out of 100)',
  )
  .addOptionalParam('auctionDuration', 'The auction duration (seconds)')
  .addOptionalParam('timelockDelay', 'The timelock delay (seconds)')
  .addOptionalParam('votingPeriod', 'The voting period (blocks)')
  .addOptionalParam('votingDelay', 'The voting delay (blocks)')
  .addOptionalParam('proposalThresholdBps', 'The proposal threshold (basis points)')
  .addOptionalParam('quorumVotesBps', 'Votes required for quorum (basis points)')
  .setAction(async (args, { run }) => {
    // Deploy the Nouns DAO contracts and return deployment information
    const contracts = await run('deploy', args);
    await delay(60);
    printContractsTable(contracts);
    // Populate the on-chain art
    /*
    await run('populate-descriptor', {
      nftDescriptor: contracts.NFTDescriptorV2.address,
      nounsDescriptor: contracts.NounsDescriptorV2.address,
    });*/

    // Transfer ownership of all contract except for the auction house.
    // We must maintain ownership of the auction house to kick off the first auction.
    const executorAddress = contracts.NounsDAOExecutor.address;
    
    

    // Optionally kick off the first auction and transfer ownership of the auction house
    // to the Nouns DAO executor.
    /*
    if (true) {
      const auctionHouse = contracts.NounsAuctionHouse.instance.attach(
        contracts.NounsAuctionHouseProxy.address,
      );
      await auctionHouse.unpause({
        gasLimit: 1_000_000,
      });
      await auctionHouse.transferOwnership(executorAddress);
      await contracts.NounsToken.instance.transferOwnership(executorAddress);
      await contracts.NounsDescriptorV2.instance.transferOwnership(executorAddress);
      await contracts.NounsAuctionHouseProxyAdmin.instance.transferOwnership(executorAddress);
      console.log(
        'Started the first auction and transferred ownership of the auction house to the executor.',
      );
    }
    console.log(
      'Transferred ownership of the descriptor, token, and proxy admin contracts to the executor.',
    );*/
    // Optionally write the deployed addresses to the SDK and subgraph configs.
    if (args.updateConfigs) {
      await run('update-configs', {
        contracts,
      });
    }

    printContractsTable(contracts);
    
     // Verity really slow -> maybe etherscan problem?
    console.log('Verifying contracts on Etherscan...');
    await run('verify-etherscan', {
      contracts,
    });
    console.log('Deployment Complete.');
  });
