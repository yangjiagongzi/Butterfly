import React, { useCallback, useMemo, useState } from "react";
import Tab from "~/components/Tab";
import { IntruderOptions } from "~/constant/intruder";
import { BaseGenerator } from "~/utils/PayloadGenerate";
import PayloadContent from "./PayloadContent";
import styles from "./styles.module.scss";

type Props = {
  intruderOptions: IntruderOptions;
  onUpdatePayloadGenerator: (id: string, generator: BaseGenerator) => void;
};

const Payload: React.FC<Props> = ({
  intruderOptions,
  onUpdatePayloadGenerator,
}: Props) => {
  const [choose, setChoose] = useState(intruderOptions.payloads[0]?.id || "");

  const generator = useMemo(() => {
    return intruderOptions.payloads.find((p) => p.id === choose)?.generator;
  }, [choose, intruderOptions.payloads]);

  const setGenerator = useCallback(
    (generator: BaseGenerator) => {
      onUpdatePayloadGenerator(choose, generator);
    },
    [choose, onUpdatePayloadGenerator]
  );

  if (!intruderOptions.payloads.length || !generator) {
    return null;
  }

  return (
    <div className={styles.payloadContainer}>
      <Tab
        size="small"
        data={intruderOptions.payloads}
        onChange={(value) => setChoose(value.id)}
      />
      <PayloadContent generator={generator} setGenerator={setGenerator} />
    </div>
  );
};

export default Payload;
