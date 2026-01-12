"use client";
import Button from "~/components/Button";
import Tab from "~/components/Tab";
import Request from "./components/Request";
import Response from "./components/Response";
import { useRepeater } from "./hooks/useRepeater";
import { TabTypes } from "./lib/constants";
import styles from "./page.module.scss";

export default function Repeater() {
  const {
    tabs,
    choose,
    setChoose,
    options,
    response,
    onUpdateRequest,
    fetchRes,
  } = useRepeater();

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
