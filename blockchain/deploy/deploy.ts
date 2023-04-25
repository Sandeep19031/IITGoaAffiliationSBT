import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
    
  } = hre;
  const { deployer } = await getNamedAccounts();

  const resWagmiCupSbt = await deploy('WAGMI_CUP_SBT', {
    from: deployer,
    log: true,
  });
  console.log("WAGMI_CUP_SBT deployed...");

  const resRepPoints = await deploy('RepPoints', {
    from: deployer,
    log: true,
  });
  console.log("REP Points deployed...");

  const resRegistration = await deploy('Registration', {
    from: deployer,
    log: true,
  });
  console.log("Registration deployed...");

  const relayerContract = await deploy("BasicMetaTransaction", {
    from: deployer,
    log: true
  });
  console.log("RelayerContract deployed...");


};

export default func;
func.tags = ['WAGMI_CUP_SBT','RepPoints','Registration', 'BasicMetaTransaction'];
