import React, { useState } from "react";
import ButtonCustom from "../../Button/ButtonCustom";
import CommanModal from "../CommanModal/CommanModal";
import metamask from "../../../Theme/Assets/Images/metamask.svg";
import wallet_connect from "../../../Theme/Assets/Images/wallet_connect.svg";
import { Walletservices } from "../../../services/Walletservices";
// import { Modal, Row, Col } from "antd";
// import trust_wallet from "../../../Theme/Assets/Images/trust_wallet.svg";
import "./ConnectWallet.scss";
import { chainID } from "../../../constants";
import { toast } from "../../Layout/Toasts/Toast";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { isMobile } from "react-device-detect";
import { chain } from "wagmi";
import { useDispatch, useSelector } from "react-redux";
import { ownerAddress } from "../../Redux/sbtaction";

const ConnectWallet = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [MetaAcc, setMetaAcc] = useState("Connect Wallet");
  const addmeta = useSelector((state) => state.address.address);
  
  
  const handleShow = (e) => {
    e.preventDefault();
    if (addmeta) {
      dispatch(ownerAddress(""));
      setMetaAcc(addmeta);
      toast.success("Wallet Disconnected");
    } else {
      setShow(true);
    }
  };

  // const handleWConnect = async (e) => {
  //   e.preventDefault();
  //   const result = window.ethereum;
  //   console.log(result && result.networkVersion != chainID, "testresult");
  //   if (result && result.networkVersion != chainID) {
  //     // await snetwork();
  //   }
  //   const account = await Walletservices.walletConnect();
  //   console.log(account, "sadasdsaa===");
  //   localStorage.setItem("recAddr", account);
  //   if (account) {
  //     toast.success("Wallet Connected");
  //   }
  // };
  const handleMetamask = async () => {
    if (!isMobile || window.ethereum) {
      const result = window.ethereum;
      if (result && result.networkVersion != chainID) {
        Walletservices.networkSwitch();
      }
      const account = await Walletservices.isMetamaskInstalled();
      dispatch(ownerAddress(account));
      if (account) {
        setShow(false);
        setMetaAcc(account);
        toast.success("Wallet Connected");
        // window.location.reload();
      }
    } else {
      const metamaskAppDeepLink =
        "https://metamask.app.link/dapp/event-stage-app.eq8.network";
      window.open(metamaskAppDeepLink, "_self");
    }
  };

  return (
    <>
      <ButtonCustom
        className="border-btn"
        title={
          addmeta
            ? `${addmeta.slice(0, 7)}...${addmeta.slice(37)}`
            : "Connect Wallet"
        }
        onClick={handleShow}
      />
      <CommanModal
        show={show}
        onHide={handleClose}
        handleClose={handleClose}
        title="Connect Wallet"
      >
        <ul className="connect-wallet">
          {/* <li>
            <div onClick={(e) => handleWConnect(e)}>
              <span>
                <img src={wallet_connect} alt="icon" />
              </span>
              Wallet Connect
            </div>
          </li> */}

          {/* <li>
            <img src={trust_wallet} alt="icon" /> Trustwallet
          </li> */}
          <li>
            <div onClick={() => handleMetamask()}>
              <span>
                <img src={metamask} alt="icon" />
              </span>
              Metamask
            </div>
          </li>
        </ul>
      </CommanModal>
    </>
  );
};

export default ConnectWallet;
