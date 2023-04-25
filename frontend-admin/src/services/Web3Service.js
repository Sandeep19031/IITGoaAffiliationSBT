import { toBuffer } from "ethereumjs-util";
import IDCARD_ABI from "../assets/abi/IDCard.json";

import Web3 from "web3";
import { CONTRACT_ADDR, POLYGON_ALCHEMY } from "../constants";

let abi = require("ethereumjs-abi");

class Web3Service {
  providerUrl = POLYGON_ALCHEMY;
  web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  contract = {};

  constructor() {
    this.initContract();
  }

  initContract() {
    try {
      this.contract = new this.web3.eth.Contract(IDCARD_ABI.abi, CONTRACT_ADDR);
      console.log("contract object created...");
    } catch (error) {
      throw error;
    }
  }
}

export default new Web3Service();
