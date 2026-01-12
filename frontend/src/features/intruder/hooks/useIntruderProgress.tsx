import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IntruderOptions, RequestOptions } from "~/constant/intruder";
import { fetchByServer } from "~/utils/Apis";
import { parse } from "~/utils/HttpParse";
import IntruderQueue, { ProgressItemType } from "~/utils/IntruderQueue";
import { payloadReplace } from "~/utils/PayloadReplace";
import uuid from "~/utils/UuidUtil";

type UseIntruderProgressProps = {
  options: IntruderOptions;
  pointCount: number;
  originalString: string;
  format: (
    paddingList: {
      value: string;
      replace: boolean;
    }[]
  ) => string;
  onStart: () => void;
};

export const useIntruderProgress = ({
  options,
  pointCount,
  originalString,
  format,
  onStart: onStartCallback,
}: UseIntruderProgressProps) => {
  const [suspend, setSuspend] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const isInProgressFlagRef = useRef(false);
  const [progress, setProgress] = useState<ProgressItemType[]>([]);

  const queueRef = useRef<IntruderQueue | null>(null);

  const onProgress = useCallback((p: ProgressItemType) => {
    if (!isInProgressFlagRef.current) {
      return;
    }
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
      isInProgressFlagRef.current = false;
    }
  }, []);

  const [version, setVersion] = useState("");

  const onStart = useCallback(() => {
    setVersion(uuid());
    setProgress([]);
    setIsInProgress(true);
    isInProgressFlagRef.current = true;
    setSuspend(false);
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

      onStartCallback();
      queueRef.current.start();
    } catch (err) {
      console.log(err);
    }
  }, [
    options,
    pointCount,
    originalString,
    format,
    onProgress,
    onStartCallback,
  ]);

  const onStop = useCallback(() => {
    setProgress([]);
    setIsInProgress(false);
    isInProgressFlagRef.current = false;
    setSuspend(false);
    if (queueRef.current) {
      queueRef.current.suspend();
      queueRef.current = null;
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
    return () => {
      if (queueRef.current) {
        queueRef.current.suspend();
      }
    };
  }, []);

  return useMemo(
    () => ({
      version,
      progress,
      isInProgress,
      suspend,
      onStart,
      onStop,
      onSuspend,
    }),
    [version, progress, isInProgress, suspend, onStart, onStop, onSuspend]
  );
};

const handleFunc = async (value: string) => {
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
      body: messageModel.body || "",
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
};
