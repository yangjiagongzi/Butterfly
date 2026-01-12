import React, { useCallback, useRef } from "react";
import Button from "~/components/Button";
import Notification from "~/components/Notification";
import Textarea from "~/components/Textarea";
import { IntruderOptions } from "~/constant/intruder";
import { clearPointFlag, updatePointFlag } from "~/utils/StringPoint";
import styles from "./styles.module.scss";

type Props = {
  intruderOptions: IntruderOptions;
  onUpdateHttpMessage: (message: string) => void;
};

const Request: React.FC<Props> = ({
  intruderOptions,
  onUpdateHttpMessage,
}: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const onAdd = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const start = ref.current.selectionStart;
    const end = ref.current.selectionEnd;
    const text = ref.current.value;
    const middle = text.substring(start, end);

    if (middle.indexOf("\n") >= 0) {
      Notification.show({ message: "禁止跨行!", error: true });
      return;
    }

    const pre = text.substring(0, start);
    const next = text.substring(end);
    const result = updatePointFlag({
      pre,
      select: middle,
      next,
      add: true,
    });
    onUpdateHttpMessage(result);
  }, [onUpdateHttpMessage]);

  const onDelete = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const start = ref.current.selectionStart;
    const end = ref.current.selectionEnd;
    const text = ref.current.value;
    const middle = text.substring(start, end);

    const pre = text.substring(0, start);
    const next = text.substring(end);
    const result = updatePointFlag({
      pre,
      select: middle,
      next,
      add: false,
    });
    onUpdateHttpMessage(result);
  }, [onUpdateHttpMessage]);

  const onClear = useCallback(() => {
    onUpdateHttpMessage(clearPointFlag(intruderOptions.httpMessage));
  }, [intruderOptions.httpMessage, onUpdateHttpMessage]);

  return (
    <div className={styles.requestContainer}>
      <div className="buttonGroup" onMouseDown={(e) => e.preventDefault()}>
        <Button title="增加" onClick={onAdd} />
        <Button title="删除" onClick={onDelete} />
        <Button title="清空" onClick={onClear} />
      </div>
      <div id="requestContent">
        <Textarea
          ref={ref}
          spellCheck={false}
          value={intruderOptions.httpMessage}
          onChange={(e) => onUpdateHttpMessage(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Request;
