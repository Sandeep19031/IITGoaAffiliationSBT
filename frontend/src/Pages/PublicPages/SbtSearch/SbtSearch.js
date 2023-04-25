import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { AddressIcon, DocumentIcon } from "../../../Theme/Assets/Svg/SvgImages";
import ButtonCustom from "../../../Components/Button/ButtonCustom";
import LayoutCard from "../../../Components/LayoutCard/LayoutCard";
import CustomInput from "../../../Components/CustomInput/CustomInput";
import ContractServices, {
  getHashData,
} from "../../../services/ContractServices";
import { useDispatch, useSelector } from "react-redux";
import "./SbtSearch.scss";
import { Button } from "bootstrap";
import Loader from "../../../Components/LoaderComponent/Loader";
import { toast } from "../../../Components/Layout/Toasts/Toast";
import { useNavigate } from "react-router-dom";

const SbtSearch = () => {
  const addmeta = useSelector((state) => state.address.address);
  const navigate = useNavigate();
  const [inputAddr, setInputAddr] = useState("");
  const [id, setSbtid] = useState("");
  const [loader, setLoader] = useState(false);

  const handlesbtid = (e) => {
    setSbtid(e.target.value);
  };

  // const handleSearch_next = async (e) => {
  //   try {
  //     setLoader(true);
  //     const addr = addmeta ? addmeta : inputAddr;

  //     const sbtId = await ContractServices.getSbtIdfnc(addr);

  //     if (sbtId == 0) {
  //       toast.error("No info available...");
  //       setLoader(false);
  //       return;
  //     }
  //     console.log("Sbt id corresponds to the addr ", addr, " is ", sbtId);
  //     const sbtInfo = await ContractServices.getSbtInfofnc(sbtId);
  //     if (!sbtInfo) {
  //       toast.error("No info available...");
  //       setLoader(false);

  //       return;
  //     }
  //     console.log("Sbt info corresponds to the sbtId ", addr, " is ", sbtInfo);
  //     let resuri;
  //     if (sbtId !== 0) {
  //       resuri = await ContractServices.getTokenUri(sbtId);
  //     }

  //     if (!resuri) {
  //       toast.error("No info available...");
  //       setLoader(false);

  //       return;
  //     }
  //     console.log("token uri", resuri);
  //     const getValue = await getHashData(resuri);

  //     if (getValue.status == 200) {
  //       setLoader(false);
  //     }
  //     let data = getValue;
  //     let datauri = data?.data[0];
  //     console.log("data of uri", datauri);
  //     sbturi(datauri);
  //     const res = await ContractServices.getSbtInfofnc(addr);
  //     console.log("Sbt info res", res);
  //     sbtdata(res);
  //   } catch (error) {
  //     setLoader(false);
  //     console.log(error, "error");
  //   }
  // };

  const handleSearch = async (e) => {
    const addr = addmeta ? addmeta : inputAddr;

    navigate(`/sbtSearch/${addr}`);
  };

  return (
    <LayoutCard title="IIT Goa Affiliation Membership SBT">
      <Form>
        {loader && <Loader />}

        <Row className="search-row align-items-end">
          <Col md={8} className="d-flex align-items-end">
            <div onChange={(e) => setInputAddr(e.target.value)}>
              <CustomInput
                icon={<AddressIcon />}
                label="Wallet Address"
                placeholder="Enter Your Wallet Address"
                type="text"
                className="mb-0"
                value={addmeta ? addmeta : inputAddr}
              />
            </div>

            <ButtonCustom
              title="Search"
              className="ms-4"
              onClick={(e) => {
                handleSearch(e);
              }}
            />
          </Col>
        </Row>
      </Form>
    </LayoutCard>
  );
};

export default SbtSearch;
