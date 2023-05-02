import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContractServices from "../../services/ContractServices";
import { getTXHash } from "../../services/ServerService";
import logo from "../../Theme/Assets/Images/Logo.svg.png";
import "./IDCard.scss";
import photo from "./profilePhoto.jpg";
import sign from "./sign.png";

const IDCardFront = ({ sbtDetails, tokenDetails }) => {
  return (
    <div className="idCard_Front">
      <div className="idCard_header">
        <div className="header_text">
          <p>INDIAN INSTITUTE OF TECHNOLOGY GOA</p>
          <p>भारतीय प्रौद्योगिकी संस्थान गोवा</p>
          <p>
            An Autonomous Institution Of Ministry of HRD, Government of India
          </p>
        </div>
        <div className="header_logo">
          <img src={logo} alt="IIT Goa" width="100px" height="100px" />
        </div>
      </div>
      <div className="horizontalLine" />
      <div className="idCard_body">
        <div className="idCard_body_left">
          <div className="photoOutline">
            <img
              src={`https://drive.google.com/uc?export=view&id=${
                tokenDetails?.photoUrl.split("/")[5]
              }`}
              alt="img"
              width="120px"
              height="150px"
            />
          </div>
        </div>
        <div className="idCard_body_right">
          <div className="studentName">
            <p>{sbtDetails.StudentName}</p>
          </div>
          <div className="studentBranch">
            <p>{sbtDetails.Branch}</p>
          </div>
          <div className="studentRollNo">
            <p>Roll No: {sbtDetails.RollNo}</p>
          </div>
          <div className="idCardValidity">
            <p>Valid upto: {sbtDetails.ValidUpto}</p>
          </div>
        </div>
      </div>
      <div className="idCard_bottom">
        <div className="studentSign">
          <img
            src={`https://drive.google.com/uc?export=view&id=${
              tokenDetails?.signUrl.split("/")[5]
            }`}
            alt="sign"
            width="60px"
            height="40px"
          />
          <p>Student Signature</p>
        </div>
        <div className="issuingSign">
          <img
            src={`https://drive.google.com/uc?export=view&id=${
              tokenDetails?.issuerUrl.split("/")[5]
            }`}
            alt="sign"
            width="60px"
            height="40px"
          />
          <p>Signature of Issuing Authority</p>
        </div>
      </div>
    </div>
  );
};

const IDCardBack = ({ sbtDetails, tokenDetails, txHash }) => {
  return (
    <div className="idCard_Back">
      <div className="blackBox"></div>
      <div className="backContent">
        <div className="bloodGroup" id="backContent_row">
          <p className="bloodGroup_text" id="contentRow_left">
            Blood Group
          </p>
          <p className="bloodGroup_data" id="contentRow_right">
            {tokenDetails.Blood_Group}
          </p>
        </div>
        <div className="emergencyContact" id="backContent_row">
          <p className="emergencyContact_text" id="contentRow_left">
            Emergency Contact No.
          </p>
          <p className="emergencyContact_data" id="contentRow_right">
            +91-{tokenDetails.Emergency_Contact}
          </p>
        </div>
        <div className="dob" id="backContent_row">
          <p className="dob_text" id="contentRow_left">
            Date of Birth
          </p>
          <p className="dob_data" id="contentRow_right">
            {" "}
            {tokenDetails.DOB}
          </p>
        </div>
        <div className="address" id="backContent_row">
          <p className="address_text" id="contentRow_left">
            Address
          </p>
          <p className="address_data" id="contentRow_right">
            {tokenDetails.Address}
          </p>
        </div>
      </div>
      <div className="horizontalLine_back" />
      <div className="back_bottom">
        <p>This card is property of IIT Goa</p>
        <a
          href={`https://mumbai.polygonscan.com/tx/${txHash}`}
          target={"_blank"}
          color="black"
        >
          {txHash}
        </a>
        <p>INDIAN INSTITUTE OF TECHNOLOGY GOA</p>
        <p>
          Goa college of Engineering Campus Farmagudi, ponda 403401, Goa, India
        </p>
        <p>Phone: +91-832-2490861</p>
      </div>
    </div>
  );
};
export default function IDCard() {
  console.log("I'm at ID Card.js");

  const { address } = useParams();
  console.log("address: ", address);

  const [sbtID, setSbtId] = useState(Number(0));
  const [sbtDetails, setSbtDetails] = useState();
  const [tokenDetails, setTokenDetails] = useState();
  const [txHash, setTxHash] = useState();

  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      // 1. Get SBT ID from address
      const sbtId = await ContractServices.getSbtIdfnc(address);

      if (sbtId == 0) {
        setError(true);
        return;
      }

      // 2. Get Token Uri
      const tokenUri = await ContractServices.getTokenUri(sbtId);
      console.log("tokenUri: ", tokenUri);

      // 3. Get SBT Details
      const sbtDetails = await ContractServices.getSbtInfofnc(sbtId);
      console.log("sbtDetails: ", sbtDetails);
      setSbtDetails(sbtDetails);

      // 4. Get Token Details
      const data = await ContractServices.getHashData(tokenUri);
      let datauri = data?.data[0];
      console.log("data of uri", datauri);
      setTokenDetails(datauri);

      // 5. Get TxHash
      const data2 = await getTXHash(address);
      console.log("txHash: ", data2.data);
      setTxHash(data2?.data.txHash);
    };
    fetchdata();
  }, []);

  return (
    <div className="idCard">
      {tokenDetails && (
        <IDCardFront sbtDetails={sbtDetails} tokenDetails={tokenDetails} />
      )}
      {tokenDetails && txHash && (
        <IDCardBack
          sbtDetails={sbtDetails}
          tokenDetails={tokenDetails}
          txHash={txHash}
        />
      )}
    </div>
  );
}
