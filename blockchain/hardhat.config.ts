import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';

import { HardhatUserConfig } from 'hardhat/config';

/* This loads the variables in your .env file to `process.env` */


const config: HardhatUserConfig = {
  solidity: '0.8.2',
  networks: {
    
    matic: {
        url: "https://rpc-mumbai.maticvigil.com/",
        accounts: ["0xaece8d8da9a28335c29cd164d8c01ce0cbe0bcd0b0f7c4f1ca705e94bcf04b04"]
    },

  },

  
  namedAccounts: {
    deployer: 0,
  },
};

export default config;