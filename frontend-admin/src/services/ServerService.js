import axios from "axios";
import { SERVER_URL } from "../constants";

// Save TXHash to the server
export const saveTXHash = async (userAccAddr, txHash) => {
  try {
    const response = await axios.post(`${SERVER_URL}/saveTxHash`, {
      userAccAddr: userAccAddr,
      txHash: txHash,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get TXHash from the server
export const getTXHash = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/getTxHash`);
    return response.txHash;
  } catch (error) {
    console.log("getTxHash", error);
    return false;
  }
};
