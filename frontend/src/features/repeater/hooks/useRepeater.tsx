import { useCallback, useMemo, useState } from "react";
import Notification from "~/components/Notification";
import {
  RequestOptions,
  RequestOptionsDefaultValue,
} from "~/constant/intruder";
import { fetchByServer } from "~/utils/Apis";
import { TabTypes } from "../lib/constants";

export const useRepeater = () => {
  const tabs = useMemo(() => Object.values(TabTypes), []);
  const [choose, setChoose] = useState<Values<typeof TabTypes>["id"]>(
    TabTypes.request.id
  );
  const [options, setOptions] = useState<RequestOptions>(
    RequestOptionsDefaultValue
  );
  const [response, setResponse] = useState("");

  const onUpdateRequest = useCallback((requestParams: RequestOptions) => {
    setOptions(requestParams);
  }, []);

  const fetchRes = useCallback(() => {
    const formatOptions = {
      ...options,
      headers: options.headers.filter((item) => item.enable && item.key),
      params: options.params.filter((item) => item.enable && item.key),
    };
    fetchByServer(formatOptions)
      .then((res) => {
        setChoose(TabTypes.response.id);
        setResponse(res);
      })
      .catch((err) => {
        console.log(err);
        setResponse("");
        Notification.show({ message: "请求发送失败!", error: true });
      });
  }, [options]);

  return useMemo(
    () => ({
      tabs,
      choose,
      setChoose,
      options,
      response,
      onUpdateRequest,
      fetchRes,
    }),
    [tabs, choose, setChoose, options, response, onUpdateRequest, fetchRes]
  );
};
