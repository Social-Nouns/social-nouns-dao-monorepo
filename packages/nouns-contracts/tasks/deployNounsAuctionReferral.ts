import { task, types } from 'hardhat/config';
import { ContractName, ContractNameDescriptorV1, DeployedContract } from './types';

task('callcontractfunction', 'transfer all contracts and start auction')
  .setAction( async (
    {
      contracts,
    }: { contracts: Record<ContractName | ContractNameDescriptorV1, DeployedContract> },
    { ethers,run },
    ) => {
        const factory = await ethers.getContractFactory("NounsAuctionReferral");
        const admin = "";
        const proxy = "";
        const deployedContract = await factory.deploy(admin,proxy);
        await deployedContract.deployed();
    console.log(`RevShare contract deployed to ${deployedContract.address}`);
    console.log('Complete.');
});