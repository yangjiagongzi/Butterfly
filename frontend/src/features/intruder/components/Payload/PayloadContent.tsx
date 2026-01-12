import React, { useCallback, useState } from "react";
import Select from "~/components/Select";
import { PayloadType, PayloadTypeList } from "~/constant/intruder";
import { BaseGenerator } from "~/utils/PayloadGenerate";
import DictionaryInput from "./DictionaryInput";
import GenerateBruteForcer from "./GenerateBruteForcer";
import GenerateDate from "./GenerateDate";
import GenerateDirectoryTraversal from "./GenerateDirectoryTraversal";
import GenerateNumber from "./GenerateNumber";
import styles from "./styles.module.scss";

type Props = {
  generator: BaseGenerator;
  setGenerator: (generator: BaseGenerator) => void;
};

const PayloadContent: React.FC<Props> = ({
  generator,
  setGenerator,
}: Props) => {
  const [payloadType, setPayloadType] = useState<
    (typeof PayloadTypeList)[number]
  >(PayloadType.SimpleList);

  const onUpdatePayloadType = useCallback((id: string) => {
    const selected = PayloadTypeList.find((item) => item.id === id);
    if (selected) {
      setPayloadType(selected);
    }
  }, []);

  const onApply = useCallback(
    (generator: BaseGenerator) => {
      setPayloadType(PayloadType.SimpleList);
      setGenerator(generator);
    },
    [setGenerator]
  );

  return (
    <div className={styles.payload}>
      <Select
        className="payload-select"
        title={"Payload Type"}
        data={PayloadTypeList}
        value={payloadType}
        onChange={({ id }) => {
          onUpdatePayloadType(id);
        }}
      />
      {payloadType.id === PayloadType.SimpleList.id ? (
        <DictionaryInput
          generator={generator}
          onApply={(generator: BaseGenerator) => {
            setGenerator(generator);
          }}
        />
      ) : null}
      {payloadType.id === PayloadType.Numbers.id ? (
        <GenerateNumber onApply={onApply} />
      ) : null}
      {payloadType.id === PayloadType.Dates.id ? (
        <GenerateDate onApply={onApply} />
      ) : null}
      {payloadType.id === PayloadType.BruteForcer.id ? (
        <GenerateBruteForcer onApply={onApply} />
      ) : null}
      {payloadType.id === PayloadType.DirectoryTraversal.id ? (
        <GenerateDirectoryTraversal onApply={onApply} />
      ) : null}
    </div>
  );
};

export default PayloadContent;
