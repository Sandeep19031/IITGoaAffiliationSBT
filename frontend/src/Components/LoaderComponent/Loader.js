import { Puff } from "react-loader-spinner";
// import { Loader } from "rsuite";
import LoadingOverlay from "react-loading-overlay";
import "./LoaderStyle.scss";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import React, { useState } from "react";

const Loader = () => {
  return (
    <div className="loader-style">
      {/* <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#00abe6", "#62f6be", "#62f6de", "#62f7be", "#62f6de"]}
      /> */}

    
      <Puff
        height="80"
        width="80"
        radisu={1}
        color="#62f6de"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
