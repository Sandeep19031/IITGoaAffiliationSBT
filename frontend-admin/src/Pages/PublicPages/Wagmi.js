import React, { useState } from "react";
import LayoutCard from "../../../Components/LayoutCard/LayoutCard";
import DisplayExcel from "../../../Excel/DisplayExcel";
import ButtonCustom from "../../../Components/Button/ButtonCustom";
import { Col, Row } from "react-bootstrap";
import ExcelImportTool from "../../../Excel/ExcelImportTool";
import { Walletservices } from "../../../services/Walletservices";
import ContractServices from "../../../services/ContractServices";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spreadsheet from "react-spreadsheet";
import * as XLSX from "xlsx";
import { toast } from "../../../Components/Layout/Toasts/Toast";
import { type } from "@testing-library/user-event/dist/type";
import Web3 from "web3";
import Loader from "../../../Components/LoaderComponent/Loader";

export default function Wagmi() {
  const [sheetData, setSheetData] = useState();
  const [sheet, setSheet] = useState();

  const [newSheetData, setNewSheetData] = useState();
  const [newSheetName, setNewSheetName] = useState("Sheet1");

  const [state, setState] = useState({
    newSheetData: null,
    newSheetArrData: null,
    txHashArrData: null,
    minted: false,
    newSheetCompleted: false,
  });

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleFileUploaded = (e) => {
    console.log("File is uploaded", e);
    if (e != null) {
      setSheet(Object.keys(e)[0]);
    }
    setSheetData(e);
  };

  const newSheetDataMakingFnc = async (txHashArrData) => {
    console.log("New sheet is in progress...", txHashArrData);
    var headerRow = sheetData[sheet][0].concat(["TX Hash"]);
    console.log("header row", headerRow);
    var arrData = [headerRow];
    for (var i = 1; i < sheetData[sheet].length; i++) {
      var row = await sheetData[sheet][i].concat([txHashArrData[`row${i}`]]);
      arrData.push(row);
      console.log("arrData", arrData);
    }
    let newSheetData = {};
    newSheetData[newSheetName] = arrData;
    setState({
      newSheetArrData: arrData,
      newSheetData: newSheetData,
      newSheetCompleted: true,
    });
  };
  const handleExport = async (e) => {
    console.log("Export clicked...", sheetData[sheet]);
    console.log(
      "new sheet is ready?",
      state.newSheetCompleted,
      state.newSheetArrData
    );
    var wb = XLSX.utils.book_new();

    if (state.newSheetArrData) {
      console.log("New sheet is ready...", state.newSheetArrData);
      var ws = XLSX.utils.aoa_to_sheet(state.newSheetArrData);

      XLSX.utils.book_append_sheet(wb, ws, newSheetName);
      await XLSX.writeFile(wb, "Result.xlsx");
    }
  };
  const creteUriData = (row) => {
    let uriData = [
      {
        Name: row[0],
        Jersey_Number: row[1],
        Runs_Scored: row[2],
        Balls_Faced: row[3],
        No_Of_4s_hit: row[4],
        No_Of_6s_hit: row[5],
        Strike_Rate: row[6],
        Overs_Bowled: row[7],
        Wickets_Taken: row[8],
        No_Of_Maiden_Overs_Bowled: row[9],
        Economy_Rate: row[10],
        No_Of_Catches: row[11],
        No_Of_Run_Outs: row[12],
        No_Of_Stumpings: row[13],
      },
    ];
    let udata = JSON.stringify(uriData);
    return udata;
  };

  const handleMint = async () => {
    console.log("Mint", sheetData[sheet]);
    const data = sheetData[sheet].slice(1).map((row) => {
      return row;
    });
    console.log("data", data);

    // Max Parameters
    let MostRuns = 0;
    let MostSixes = 0;
    let MostWickets = 0;
    let MostCatches = 0;

    //Start loop
    let txHashArrData = {};

    for (var i = 0; i < data.length; i++) {
      // Generating max parameters
      const row = data[i];
      MostRuns = row[2] > MostRuns ? row[2] : MostRuns;
      MostSixes = row[5] > MostSixes ? row[5] : MostSixes;
      MostWickets = row[8] > MostWickets ? row[8] : MostWickets;
      MostCatches = row[11] > MostCatches ? row[11] : MostCatches;
    }
    console.log("Data length: ", data.length);
    for (var i = 0; i < data.length; i++) {
      // 1. create uri data
      const row = data[i];
      const udata = creteUriData(row);
      // 2. uplod uri data and get uriHash
      console.log("trying to upload data to ipfs server");

      const uriHash = await Walletservices.ipfsAdd(udata);
      console.log("Successfully uploaded", uriHash);
      // 3. make sbt object

      const flag = row[14] === 1 ? true : false;

      console.log(
        "Details of max: ",
        MostRuns,
        MostSixes,
        MostWickets,
        MostCatches,
        flag
      );
      console.log(
        "Details of the row: ",
        typeof row[2], //runs scored
        typeof row[8], // wickets taken
        typeof row[11], // no of catches
        typeof row[12], // no of run outs
        typeof row[13], // no of stumping
        flag,
        typeof MostRuns,
        typeof MostSixes,
        typeof MostWickets,
        typeof MostCatches
      );
      const mostRunsFlag = MostRuns === row[2] ? 1 : 0;
      const mostSixesFlag = MostSixes === row[5] ? 1 : 0;
      const mostWicketsFlag = MostWickets === row[8] ? 1 : 0;
      const mostCatchesFlag = MostCatches === row[11] ? 1 : 0;

      console.log("Most runs: ", mostRunsFlag, MostRuns);
      console.log("Most sixes:  ", mostSixesFlag, MostSixes);
      console.log("Most wickets taken: ", mostWicketsFlag, MostWickets);
      console.log("Most catches: ", mostCatchesFlag, MostCatches);
      const params = [
        row[2], //runs scored
        row[8], // wickets taken
        row[11], // no of catches
        row[12], // no of run outs
        row[13], // no of stumping
        mostRunsFlag,
        mostSixesFlag,
        mostWicketsFlag,
        mostCatchesFlag,
      ];

      console.log("params generated...", params);

      const repPoints = await ContractServices.getRepPointsfnc(
        params,
        flag,
        row[15]
      );
      console.log("Rep points is ", repPoints);

      const whaleOftheMatch = flag === true ? "Yes" : "No";
      const sbtParams = [
        "WAGMI Cup POAP", // Title
        "Credential", // SBT category
        "29th October 2022", // Date of issue
        "Inactive", // Desoc Membership status
        repPoints, // REP Token amount
        "Unattasted",
        "EQ8 Desoc", // Issuer
        row[2], // Runs Scored
        row[8], // wickets taken
        row[11], // No of catches
        row[12], // No of run outs
        whaleOftheMatch,
      ];

      // 4. send this to contracts
      setLoader(true);

      console.log(
        "Details of getWagmiCupfnc params: ",
        sbtParams,
        typeof uriHash,
        typeof row[15]
      );
      const res = await ContractServices.getWagmiCupPOAPfnc(
        sbtParams, // required parameters to assign SBTs
        uriHash, // uri data hash of the ipfs server
        row[15] // wallet address of the player
      );

      console.log("Res of getWagmiCupPOAP", res);
      if (res === false) {
        setLoader(false);
        toast.error(`Already Minted. Row number: ${i + 1}, Name: ${row[i]}.`);
        txHashArrData[`row${i + 1}`] = "0x00000000000";
      }
      if (res?.status) {
        // localStorage.setItem("response", JSON.stringify(false));
        setLoader(false);
        toast.success(`Successfully minted SBT for row number ${i + 1}.`);

        txHashArrData[`row${i + 1}`] = res.transactionHash;
        //navigate("/thankyou-for-response", { state: res?.transactionHash });
      }

      setState({ txHashArrData: txHashArrData });
      if (data.length === i + 1) {
        toast.success("Minting work done...");
        setState({ minted: true });
        await newSheetDataMakingFnc(txHashArrData);
      }
    }
  };

  return (
    <LayoutCard>
      {loader && <Loader />}
      <ExcelImportTool onFileUploaded={(e) => handleFileUploaded(e)} />

      {sheetData && <DisplayExcel sheet={sheet} sheetData={sheetData} />}

      {sheetData && (
        <Col md={12} sm={12} className="text-center">
          <ButtonCustom
            title="Mint"
            className="my-3"
            type="submit"
            // onClick={() => navigate("/thankyou-for-response")}
            onClick={(e) => {
              handleMint(e);
            }}
          />
        </Col>
      )}

      {state.newSheetCompleted && (
        <DisplayExcel sheet={newSheetName} sheetData={state.newSheetData} />
      )}
      {state.newSheetCompleted && (
        <Col md={12} sm={12} className="text-center">
          <ButtonCustom
            title="Export"
            className="my-3"
            type="submit"
            // onClick={() => navigate("/thankyou-for-response")}
            onClick={(e) => {
              handleExport(e);
            }}
          />
        </Col>
      )}
    </LayoutCard>
  );
}
