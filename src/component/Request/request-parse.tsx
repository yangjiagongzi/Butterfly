import React, { useCallback } from "react";
import Button from "~/component/Button";
import Modal from "~/component/Modal";
import Notification from "~/component/Notification";
import Textarea from "~/component/Textarea";
import { RequestOptions } from "~/constant/intruder";
import { parse } from "~/utils/HttpParse";
import uuid from "~/utils/UuidUtil";
import styles from "./request.module.scss";

type Props = {
  onUpdateRequest: (requestParams: RequestOptions) => void;
};

const RequestParse: React.FC<Props> = ({ onUpdateRequest }: Props) => {
  const [value, setValue] = React.useState("");
  const onParse = useCallback(() => {
    if (!value.trim()) {
      Notification.show({ message: "格式错误!", error: true });
      return;
    }
    try {
      const messageModel = parse(value);
      onUpdateRequest({
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
          { id: uuid(), key: "", value: "", enable: true },
        ],
        params: [
          ...messageModel.queryParams.map((param) => ({
            id: uuid(),
            key: param.name,
            value: param.value,
            enable: true,
          })),
          { id: uuid(), key: "", value: "", enable: true },
        ],
        body: messageModel.body?.text || "",
      });
      Modal.close();
    } catch (e) {
      console.error(e);
      Notification.show({ message: "格式错误!", error: true });
    }
  }, [value, onUpdateRequest]);

  return (
    <div className={styles.requestParse}>
      <div className="header">
        <Button className="curl-parse-btn" title="解析" onClick={onParse} />
      </div>
      <div className="content">
        <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
};

export default RequestParse;
