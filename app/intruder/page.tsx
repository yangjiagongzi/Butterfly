"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "~/component/Button";
import Tab from "~/component/Tab";
import {
  AttackType,
  IntruderOptions,
  IntruderOptionsDefaultValue,
  RequestOptions,
} from "~/constant/intruder";
import { fetchByServer } from "~/utils/Apis";
import { parse } from "~/utils/HttpParse";
import IntruderQueue, { ProgressItemType } from "~/utils/IntruderQueue";
import {
  BaseGenerator,
  payloadGenerateForSimpleList,
} from "~/utils/PayloadGenerate";
import { payloadReplace } from "~/utils/PayloadReplace";
import { getStringPointFormat } from "~/utils/StringPoint";
import uuid from "~/utils/UuidUtil";
import AttachType from "./components/attack-type";
import Payload from "./components/payload";
import Request from "./components/request";
import Response from "./components/response";
import Settings from "./components/settings";
import styles from "./page.module.scss";

const TabTypes = {
  type: { id: "type", name: "攻击类型" },
  request: { id: "request", name: "请求" },
  payload: { id: "payload", name: "载荷" },
  options: { id: "options", name: "设置" },
  response: { id: "response", name: "结果" },
} as const;

export default function Intruder() {
  const [options, setOptions] = useState<IntruderOptions>(
    IntruderOptionsDefaultValue
  );
  const [choose, setChoose] = useState<Values<typeof TabTypes>["id"]>(
    TabTypes.type.id
  );
  const tabs = useMemo(() => Object.values(TabTypes), []);
  const [suspend, setSuspend] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const [progress, setProgress] = useState<ProgressItemType[]>([]);
  const queueRef = useRef<IntruderQueue | null>(null);

  const { pointCount, originalString, format } = useMemo(() => {
    return getStringPointFormat(options.httpMessage);
  }, [options.httpMessage]);

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

  const onProgress = useCallback(
    (p: ProgressItemType) => {
      let hasUpdate = false;

      setProgress((pre) => {
        const newProgress = pre.map((item) => {
          if (item.idx === p.idx) {
            hasUpdate = true;
            return p;
          }
          return item;
        });
        if (!hasUpdate) {
          newProgress.push(p);
        }
        return newProgress;
      });

      if (p.finishLength === p.totalLength) {
        setIsInProgress(false);
      }
    },
    [setProgress, setIsInProgress]
  );

  const handleFunc = useCallback(async (value: string) => {
    let options: RequestOptions;
    try {
      const messageModel = parse(value);
      options = {
        id: uuid(),
        url: messageModel.target.replace(/\?.*/g, ""),
        method: messageModel.method,
        headers: [
          ...messageModel.headers.map((header) => ({
            id: uuid(),
            key: header.name,
            value: header.value,
            enable: true,
          })),
        ],
        params: [
          ...messageModel.queryParams.map((param) => ({
            id: uuid(),
            key: param.name,
            value: param.value,
            enable: true,
          })),
        ],
        body: messageModel.body?.text || "",
      };
    } catch (err) {
      console.log(err);
      throw new Error("Http Message 解析失败!");
    }

    try {
      const result = await fetchByServer(options);
      return result;
    } catch (err) {
      console.log(err);
      throw new Error("Http Message 发送到服务端失败!");
    }
  }, []);

  const onSuspend = useCallback(() => {
    setSuspend((pre) => {
      if (pre) {
        queueRef.current?.start();
      } else {
        queueRef.current?.suspend();
      }
      return !pre;
    });
  }, []);

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

  useEffect(() => {
    return () => {
      if (queueRef.current) {
        queueRef.current.suspend();
      }
    };
  }, []);

  const onStart = useCallback(() => {
    setProgress([]);
    setIsInProgress(true);
    try {
      const replace = payloadReplace({
        pointCount,
        originalString,
        format,
        attackType: options.attackType,
        payloads: options.payloads,
      });
      if (queueRef.current) {
        queueRef.current.suspend();
      }
      if (!replace?.length || !replace?.next) {
        return;
      }
      queueRef.current = new IntruderQueue({
        ...options.settings,
        length: replace.length,
        next: replace.next,
        onProgress,
        handleFunc,
      });

      setChoose(TabTypes.response.id);
      queueRef.current.start();
    } catch (err) {
      console.log(err);
    }
  }, [options, pointCount, originalString, format, onProgress, handleFunc]);

  return (
    <div className={styles.container}>
      <div className={styles.startBtn}>
        <Button title={"开始"} onClick={onStart} />
        {isInProgress ? (
          <Button title={suspend ? "继续" : "暂停"} onClick={onSuspend} />
        ) : null}
      </div>
      <Tab
        size="large"
        value={choose}
        data={tabs}
        onChange={(value) =>
          setChoose(value.id as Values<typeof TabTypes>["id"])
        }
      />
      <div className={styles.content}>
        {choose === TabTypes.type.id ? (
          <AttachType
            intruderOptions={options}
            onUpdateAttackType={onUpdateAttackType}
          />
        ) : null}
        {choose === TabTypes.request.id ? (
          <Request
            intruderOptions={options}
            onUpdateHttpMessage={onUpdateHttpMessage}
          />
        ) : null}
        {choose === TabTypes.payload.id ? (
          <Payload
            intruderOptions={options}
            onUpdatePayloadGenerator={onUpdatePayloadGenerator}
          />
        ) : null}
        {choose === TabTypes.options.id ? (
          <Settings
            intruderOptions={options}
            onUpdateSetting={onUpdateSetting}
          />
        ) : null}
        {choose === TabTypes.response.id ? (
          <Response progress={progress} />
        ) : null}
      </div>
    </div>
  );
}
