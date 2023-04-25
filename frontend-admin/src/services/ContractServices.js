import { toast } from "../Components/Layout/Toasts/Toast";
import Web3 from "web3";
import Web3Service from "./Web3Service";
import axios from "axios";
import { MINTER_ADDR } from "../constants";

const getTokenUri = async (sbtId) => {
  try {
    const res = await Web3Service.contract.methods.tokenURI(sbtId).call();
    return res;
  } catch (err) {
    console.log("error in getTokenUri fnc", err);
    return false;
  }
};

const getSbtIdfnc = async (addr) => {
  try {
    const res = await Web3Service.contract.methods.studentSbtId(addr).call();
    return res;
  } catch (err) {
    console.log("Error in getSbtIdfnc", err);
    return false;
  }
};

const getSbtInfofnc = async (id) => {
  try {
    const res = await Web3Service.contact.methods.studentSbtInfo(id).call();
    return res;
  } catch (err) {
    console.log("Error in getSbtInfofnc", err);
    return false;
  }
};

export const getHashData = async (data) => {
  try {
    return await axios("https://ipfs.io/ipfs/" + data);
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const mintIdCard = async (toAddr, sbtParams, tokenUri) => {
  try {
    const res = await Web3Service.contract.methods
      .mint(toAddr, sbtParams, tokenUri)
      .send({
        from: MINTER_ADDR,
      });

    return res;
  } catch (err) {
    console.log("Error in minting ID Card", err);
    return false;
  }
};

export default {
  getHashData,
  getTokenUri,
  getSbtIdfnc,
  getSbtInfofnc,
  mintIdCard,
};
