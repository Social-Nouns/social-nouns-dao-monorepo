import { Result } from 'ethers/lib/utils';
import { task, types } from 'hardhat/config';

task('mint-noun', 'Mints a Noun')
  .addOptionalParam(
    'nounsToken',
    'The `NounsToken` contract address',
    '0xd78287cdbe23c672612fBc277f752860b4f3e062',
    types.string,
  )
  .setAction(async ({ nounsToken }, { ethers }) => {
    const nftFactory = await ethers.getContractFactory('NounsToken');
    const nftContract = nftFactory.attach(nounsToken);

    const receipt = await (await nftContract.mint()).wait();
    const nounCreated = receipt.events?.[1];
    const { tokenId } = nounCreated?.args as Result;

    console.log(`Noun minted with ID: ${tokenId.toString()}.`);
  });
