import React from "react";
import Close from "~/svg/close.svg";
import Comparer from "~/svg/comparer.svg";
import Decoder from "~/svg/decoder.svg";
import Dictionary from "~/svg/dict.svg";
import Home from "~/svg/home.svg";
import Intruder from "~/svg/intruder.svg";
import Note from "~/svg/note.svg";
import Output from "~/svg/output.svg";
import Project from "~/svg/project.svg";
import Settings from "~/svg/settings.svg";
import Tool from "~/svg/tool.svg";

const IconMap = {
  Close,
  Comparer,
  Decoder,
  Dictionary,
  Home,
  Intruder,
  Note,
  Output,
  Project,
  Settings,
  Tool,
} as const;

const SVGSizes = {
  xs: 20,
  sm: 24,
  md: 28,
  lg: 44,
  xl: 72,
} as const;

export type IconName = keyof typeof IconMap;
export type IconSize = keyof typeof SVGSizes;

type Props = {
  name: IconName;
  size: IconSize;
  color?: string;
};

const Icon: React.FC<Props> = ({ name, size, color = "#000" }: Props) => {
  const path = IconMap[name];
  const svgSize = SVGSizes[size];
  return (
    <div
      style={{
        width: svgSize,
        height: svgSize,
        overflow: "hidden",
        textIndent: -svgSize,
      }}
    >
      <img
        src={path}
        alt={name}
        width={svgSize}
        height={svgSize}
        style={{ filter: `drop-shadow(${svgSize}px 0px ${color})` }}
      />
    </div>
  );
};

export default Icon;
