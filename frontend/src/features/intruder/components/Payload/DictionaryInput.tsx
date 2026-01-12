"use client";
import React, { useCallback, useMemo } from "react";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import Textarea from "~/components/Textarea";
import {
  BaseGenerator,
  payloadGenerateForSimpleList,
} from "~/utils/PayloadGenerate";
import DictionarySelect from "./DictionarySelect";
import styles from "./styles.module.scss";

type Props = {
  generator: BaseGenerator;
  onApply: (generator: BaseGenerator) => void;
};

const DictionaryInput: React.FC<Props> = ({ generator, onApply }: Props) => {
  const formatValue = useMemo(() => {
    return generator.showList.join("\n");
  }, [generator.showList]);
  const totalLength = useMemo(() => generator.length, [generator.length]);
  const disabled = useMemo(
    () => generator.length !== generator.showList.length,
    [generator]
  );

  const onUpdateValue = useCallback(
    (value: string) => {
      onApply(payloadGenerateForSimpleList(value));
    },
    [onApply]
  );

  return (
    <div className={styles.dictionaryInput}>
      <Textarea
        value={formatValue}
        disabled={disabled}
        onChange={(e) => onUpdateValue(e.target.value)}
      />
      <div className="totalLength">{`总计: ${totalLength}个`}</div>
      <div className="buttonContainer">
        <Button
          onClick={() => {
            Modal.show(<DictionarySelect onSelect={onUpdateValue} />);
          }}
          title="导入"
        />
        <Button
          onClick={() => onApply(payloadGenerateForSimpleList(""))}
          title="清空"
        />
      </div>
    </div>
  );
};

export default DictionaryInput;
