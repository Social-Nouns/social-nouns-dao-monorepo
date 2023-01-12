import { utils } from 'ethers';
import { task, types } from 'hardhat/config';

task('create-proposal', 'Create a governance proposal')
  .addOptionalParam(
    'nounsDaoProxy',
    'The `NounsDAOProxy` contract address',
    '0xc89f4cAE1E89DeC465b13dE5C00Ef81704bE6182',
    types.string,
  )
  .setAction(async ({ nounsDaoProxy }, { ethers }) => {
    const nounsDaoFactory = await ethers.getContractFactory('NounsDAOLogicV1');
    const nounsDao = nounsDaoFactory.attach(nounsDaoProxy);

    const [deployer] = await ethers.getSigners();
    const oneETH = utils.parseEther('0.05');

    const receipt = await (
      await nounsDao.propose(
        [deployer.address],
        [oneETH],
        [''],
        ['0x'],
        '# Test Proposal\n## This is a **test**.',
      )
    ).wait();
    if (!receipt.events?.length) {
      throw new Error('Failed to create proposal');
    }
    console.log('Proposal created');
  });
