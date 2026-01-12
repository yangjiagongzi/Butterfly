import React from "react";
import Textarea from "~/components/Textarea";
import styles from "./styles.module.scss";

type Props = {
  value: string;
};

const Response: React.FC<Props> = ({ value }: Props) => {
  return (
    <div className={styles.response}>
      <Textarea value={value} disabled />
    </div>
  );
};

export default Response;
