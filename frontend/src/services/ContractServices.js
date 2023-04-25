import Web3Service from "./Web3Service";
import axios from "axios";

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
    const res = await Web3Service.contract.methods.studentSbtInfo(id).call();
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

export default {
  getHashData,
  getTokenUri,
  getSbtIdfnc,
  getSbtInfofnc,
};
