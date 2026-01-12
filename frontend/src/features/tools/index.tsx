"use client";

import SubNavBar from "~/components/SubNavBar";
import ColorConvert from "./components/ColorConvert";
import HexConvert from "./components/HexConvert";
import SubnetMask from "./components/SubnetMask";

const Tools = () => {
  return (
    <SubNavBar
      items={[
        { id: "color_convert", name: "颜色进制转换", child: <ColorConvert /> },
        { id: "hex_convert", name: "进制转换", child: <HexConvert /> },
        { id: "subnet_mask", name: "子网掩码", child: <SubnetMask /> },
      ]}
    />
  );
};

export default Tools;
