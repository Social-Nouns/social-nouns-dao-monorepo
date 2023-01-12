import { task, types } from 'hardhat/config';
import { readFileSync, writeFileSync } from 'fs';
import { ContractName, ContractNameDescriptorV1, DeployedContract } from './types';
import { join } from 'path';

task('transfer', 'transfer all contracts and start auction')
  .setAction( async (
    {
      contracts,
    }: { contracts: Record<ContractName | ContractNameDescriptorV1, DeployedContract> },
    { ethers,run },
    ) => {
      const sdkPath = join(__dirname, '../../nouns-sdk');
      const contractpath = join(sdkPath, 'src/contract/contractdata.json');

      const network = await ethers.provider.getNetwork();

      const options = { gasLimit: network.name === 'hardhat' ? 30000000 : 1_000_000, };
      if(!contracts){
        console.log("Contracts not provided. Get from SDK");
        contracts = JSON.parse(readFileSync(contractpath, 'utf8'));
      }
    const NounsAuctionHouse = await ethers.getContractAt("NounsAuctionHouse",contracts.NounsAuctionHouse.address);
    const NounsDescriptorV2 = await ethers.getContractAt("NounsDescriptorV2",contracts.NounsDescriptorV2.address);
    const NounsAuctionHouseProxyAdmin = await ethers.getContractAt("NounsAuctionHouseProxyAdmin",contracts.NounsAuctionHouseProxyAdmin.address);
    const NounsToken = await ethers.getContractAt("NounsDescriptorV2",contracts.NounsDescriptorV2.address);
    // Transfer ownership of all contract except for the auction house.
    // We must maintain ownership of the auction house to kick off the first auction.
    console.log("Auctionhouse adress: " + NounsAuctionHouse.address);
    const auctionHouse = NounsAuctionHouse.attach(
      contracts.NounsAuctionHouseProxy.address,
    );
    await auctionHouse.unpause({
      gasLimit: 1_000_000,
    });
    const executorAddress = contracts.NounsDAOExecutor.address;
    await NounsDescriptorV2.transferOwnership(executorAddress,options,);
    await NounsToken.transferOwnership(executorAddress,options,);
    await NounsAuctionHouseProxyAdmin.transferOwnership(executorAddress,options,);
    console.log(
      'Transferred ownership of the descriptor, token, and proxy admin contracts to the executor.',
    );

    await run('update-configs', {
      contracts,
    });
    console.log('Transfer Complete.');
});