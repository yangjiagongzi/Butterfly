import { useCallback, useMemo, useState } from "react";
import Button from "~/component/Button";
import Notification from "~/component/Notification";
import Request from "~/component/Request";
import Response from "~/component/Response";
import Tab from "~/component/Tab";
import {
  RequestOptionsDefaultValue,
  RequestOptions,
} from "~/constant/intruder";
import { fetchByServer } from "~/utils/Apis";
import styles from "./page.module.scss";

const TabTypes = {
  request: { id: "request", name: "请求" },
  response: { id: "response", name: "结果" },
} as const;

export default function Intruder() {
  const [options, setOptions] = useState<RequestOptions>(
    RequestOptionsDefaultValue
  );
  const [choose, setChoose] = useState<Values<typeof TabTypes>["id"]>(
    TabTypes.request.id
  );
  const tabs = useMemo(() => Object.values(TabTypes), []);
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

  return (
    <div className={styles.container}>
      <Button className={styles.startBtn} title={"发送"} onClick={fetchRes} />
      <Tab
        size="large"
        value={choose}
        data={tabs}
        onChange={(value) =>
          setChoose(value.id as Values<typeof TabTypes>["id"])
        }
      />
      <div className={styles.content}>
        {choose === TabTypes.request.id ? (
          <Request requestOptions={options} onUpdateRequest={onUpdateRequest} />
        ) : null}
        {choose === TabTypes.response.id ? <Response value={response} /> : null}
      </div>
    </div>
  );
}
