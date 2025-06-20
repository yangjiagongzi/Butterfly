"use client";
import React, { useCallback, useMemo } from "react";
import {
  BaseGenerator,
  payloadGenerateForSimpleList,
} from "~/utils/PayloadGenerate";
import Textarea from "../Textarea";
import styles from "./styles.module.scss";
import Button from "../Button";

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
    <div className={styles.resultContainer}>
      <Textarea
        value={formatValue}
        disabled={disabled}
        onChange={(e) => onUpdateValue(e.target.value)}
      />
      <div className="totalLength">{`总计: ${totalLength}个`}</div>
      <div className="buttonContainer">
        <Button
          onClick={() => onApply(payloadGenerateForSimpleList(""))}
          title="清空"
        />
      </div>
    </div>
  );
};

export default DictionaryInput;
