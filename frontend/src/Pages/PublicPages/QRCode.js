import { useState } from "react";
import QRCode from "react-qr-code";

export default function QRCodeGenerate() {
  const [url, setUrl] = useState("http://192.168.64.46:3000/sbtSearch");
  return (
    <div
      style={{ height: "auto", margin: "0 auto", maxWidth: 304, width: "100%" }}
    >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={url}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}
