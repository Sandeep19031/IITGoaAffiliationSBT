import axios from "axios";
import { SERVER_URL } from "../constants";

// Get TXHash from the server
export const getTXHash = async (address) => {
  try {
    const response = await axios.get(`${SERVER_URL}/getTxHash`, {
      params: {
        userAccAddr: address,
      },
    });

    return response.data;
  } catch (error) {
    console.log("getTxHash", error);
    return false;
  }
};
