import { AttackType, IntruderOptions } from "~/constant/intruder";
import BatteringRamReplace from "./BatteringRamReplace";
import ClusterBombReplace from "./ClusterBombReplace";
import PitchforkReplace from "./PitchforkReplace";
import SniperReplace from "./SniperReplace";

export type PayloadReplaceParams = {
  pointCount: number;
  originalString: string;
  format: (
    paddingList: {
      value: string;
      replace: boolean;
    }[]
  ) => string;
} & Pick<IntruderOptions, "attackType" | "payloads">;

export const payloadReplace = (params: PayloadReplaceParams) => {
  // 狙击
  if (params.attackType === AttackType.Sniper.id) {
    const replace = new SniperReplace(params);
    return {
      length: replace.length,
      next: replace.next,
    };
  }
  // 横推
  if (params.attackType === AttackType.BatteringRam.id) {
    const replace = new BatteringRamReplace(params);
    return {
      length: replace.length,
      next: replace.next,
    };
  }
  // 多路并进
  if (params.attackType === AttackType.Pitchfork.id) {
    const replace = new PitchforkReplace(params);
    return {
      length: replace.length,
      next: replace.next,
    };
  }
  // 饱和攻击
  if (params.attackType === AttackType.ClusterBomb.id) {
    const replace = new ClusterBombReplace(params);
    return {
      length: replace.length,
      next: replace.next,
    };
  }
};
