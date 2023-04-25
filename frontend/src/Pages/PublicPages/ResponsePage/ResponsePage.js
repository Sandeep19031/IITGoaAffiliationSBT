import React, { useEffect, useState } from "react";
import DetailCard from "../../../Components/DetailCard/DetailCard";

import LayoutCard from "../../../Components/LayoutCard/LayoutCard";
import logo from "../../../Theme/Assets/Images/logo.svg";
import tick from "../../../Theme/Assets/Images/tick.svg";
import ContractServices from "../../../services/ContractServices";
import { sbtAddr, registerAddr, receiver, TXNHASH } from "../../../constants";
import "./ResponsePage.scss";
import { json, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { txnHash } from "../../../Components/Redux/sbtaction";

const ResponsePage = () => {
  const [sbtdatares, setSbtdata] = useState();
  const dispatch = useDispatch();
  const [Txn, setTxn] = useState("");
  const location = useLocation();
  console.log(location.state, "props=========------");
  const addmeta = useSelector((state) => state.address.address);
  const txnhash = useSelector((state) => state.address);

  // const TXNHASH1 = Txn && JSON.parse(Txn);
  const TXNHASH1 = location.state;
  useEffect(() => {
    sbtFunction();
  }, []);
  const sbtFunction = async () => {
    const res = await ContractServices.sbtfnc(addmeta);
    console.log(res, "testresssssss");
    getdata(res);
  };

  const getdata = (res) => {
    const sbtdata = [
      { id: 1, title: "SBT Type:", info: res.SbtType },
      { id: 2, title: "SBT ID:", info: res.SbtId },
      { id: 3, title: "Issuing Date:", info: res.IssueDate },
      {
        id: 4,
        title: "Receiver:",
        info: res.Receiver,
      },
      { id: 5, title: "Event Name:", info: res.EventName },
      { id: 6, title: "Issuer:", info: res.Issuer },
      { id: 7, title: "EXP Tokens:", info: res.EXPTokens },
      { id: 8, title: "Location:", info: res.Location },
    ];
    setSbtdata(sbtdata);
  };

  // const Txnhash = () => {
  //   let gettxn = localStorage.getItem("txn");
  //   setTxn(gettxn);
  // };
  console.log(sbtdatares, "testsbtdatares");

  return (
    <LayoutCard>
      <div className="text-center">
        <img src={tick} alt="icon" className="mb-3" />
        <h2 className="mb-0">Thank you for your response.</h2>
        <p className="light-gray my-3">
          To check your SBT balance, access the below URL
        </p>
        <h5>
          TXN Hash :
          <a
            href={TXNHASH + TXNHASH1}
            target="_blank"
            className="text-decoration-none"
          >
            {/* {addmeta
              ? `${addmeta.slice(0, 7)}...${addmeta.slice(37)}`
              : "Connect Wallet"} */}
            {TXNHASH1
              ? `${TXNHASH1.slice(0, 7)}.......${TXNHASH1.slice(37, 45)}`
              : null}
          </a>
        </h5>
      </div>
      <div className="sbt-detail-row">
        <DetailCard
          title="SBT Details"
          imgleft={logo}
          imgRight={logo}
          className="detail-card--arrows"
        >
          <ul className="content-list content-list--flex">
            {sbtdatares &&
              sbtdatares?.map((data) => {
                return (
                  <li key={data.id}>
                    <span className="content-list__title">{data.title}</span>
                    <span className="content-list__data">{data.info}</span>
                  </li>
                );
              })}
          </ul>
        </DetailCard>
      </div>
    </LayoutCard>
  );
};

export default ResponsePage;
