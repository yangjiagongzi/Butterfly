"use client";
import Button from "~/components/Button";
import Tab from "~/components/Tab";
import AttachType from "./components/AttachType";
import Payload from "./components/Payload";
import Request from "./components/Request";
import Response from "./components/Response";
import Settings from "./components/Settings";
import { useIntruderOptions } from "./hooks/useIntruderOptions";
import { useIntruderProgress } from "./hooks/useIntruderProgress";
import { useIntruderTabs } from "./hooks/useIntruderTabs";
import { TabTypes } from "./lib/constants";
import styles from "./page.module.scss";

export default function Intruder() {
  const { tabs, choose, setChoose } = useIntruderTabs();
  const {
    options,
    pointCount,
    originalString,
    format,
    onUpdateAttackType,
    onUpdateHttpMessage,
    onUpdatePayloadGenerator,
    onUpdateSetting,
  } = useIntruderOptions();
  const {
    version,
    progress,
    isInProgress,
    suspend,
    onStart,
    onStop,
    onSuspend,
  } = useIntruderProgress({
    options,
    pointCount,
    originalString,
    format,
    onStart: () => setChoose(TabTypes.response.id),
  });

  return (
    <div className={styles.container}>
      <div className={styles.startBtn}>
        <Button title={"开始"} onClick={onStart} />
        {isInProgress ? (
          <Button title={suspend ? "继续" : "暂停"} onClick={onSuspend} />
        ) : null}
        {isInProgress ? <Button title={"停止"} onClick={onStop} /> : null}
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
          <Response key={version} progress={progress} />
        ) : null}
      </div>
    </div>
  );
}
