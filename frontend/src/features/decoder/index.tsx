"use client";

import SubNavBar from "~/components/SubNavBar";
import Base64 from "./components/Base64";
import Caesar from "./components/Caesar";
import Url from "./components/Url";

const Decoder = () => {
  return (
    <SubNavBar
      items={[
        { id: "base64", name: "Base64", child: <Base64 /> },
        { id: "caesar", name: "凯撒变换", child: <Caesar /> },
        { id: "url", name: "Url", child: <Url /> },
      ]}
    />
  );
};

export default Decoder;
