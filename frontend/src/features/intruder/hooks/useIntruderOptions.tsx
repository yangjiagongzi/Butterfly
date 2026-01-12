import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AttackType,
  IntruderOptions,
  IntruderOptionsDefaultValue,
} from "~/constant/intruder";
import {
  BaseGenerator,
  payloadGenerateForSimpleList,
} from "~/utils/PayloadGenerate";
import { getStringPointFormat } from "~/utils/StringPoint";

export const useIntruderOptions = () => {
  const [options, setOptions] = useState<IntruderOptions>(
    IntruderOptionsDefaultValue
  );

  const { pointCount, originalString, format } = useMemo(() => {
    return getStringPointFormat(options.httpMessage);
  }, [options.httpMessage]);

  useEffect(() => {
    let payloads: IntruderOptions["payloads"] = [];
    if (
      options.attackType === AttackType.Sniper.id ||
      options.attackType === AttackType.BatteringRam.id
    ) {
      payloads = [
        {
          id: "payload",
          name: "Payload",
          generator: payloadGenerateForSimpleList(""),
        },
      ];
    } else {
      payloads = new Array(pointCount).fill("").map((_, idx) => {
        return {
          id: `payload${idx + 1}`,
          name: `Payload${idx + 1}`,
          generator: payloadGenerateForSimpleList(""),
        };
      });
    }

    setOptions((prevState) => {
      return {
        ...prevState,
        payloads,
      };
    });
  }, [options.attackType, pointCount]);

  const onUpdateAttackType = useCallback(
    (type: IntruderOptions["attackType"]) => {
      setOptions((prevState) => {
        return { ...prevState, attackType: type };
      });
    },
    []
  );

  const onUpdateHttpMessage = useCallback((message: string) => {
    setOptions((prevState) => {
      return {
        ...prevState,
        httpMessage: message,
      };
    });
  }, []);

  const onUpdatePayloadGenerator = useCallback(
    (id: string, generator: BaseGenerator) => {
      setOptions((prevState) => {
        return {
          ...prevState,
          payloads: prevState.payloads.map((p) => {
            if (p.id === id) {
              return { ...p, generator };
            }
            return p;
          }),
        };
      });
    },
    []
  );

  const onUpdateSetting = useCallback(
    (settings: IntruderOptions["settings"]) => {
      setOptions((prevState) => {
        return {
          ...prevState,
          settings,
        };
      });
    },
    []
  );

  return useMemo(
    () => ({
      options,
      pointCount,
      originalString,
      format,
      onUpdateAttackType,
      onUpdateHttpMessage,
      onUpdatePayloadGenerator,
      onUpdateSetting,
    }),
    [
      options,
      pointCount,
      originalString,
      format,
      onUpdateAttackType,
      onUpdateHttpMessage,
      onUpdatePayloadGenerator,
      onUpdateSetting,
    ]
  );
};
