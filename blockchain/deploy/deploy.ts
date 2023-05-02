import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
    
  } = hre;
  const { deployer } = await getNamedAccounts();

  const resWagmiCupSbt = await deploy('SBT', {
    from: deployer,
    log: true,
  });
  console.log("SBT deployed...");



};

export default func;
