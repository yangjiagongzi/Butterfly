import React from "react";
import styles from "./styles.module.scss";
import Textarea from "../Textarea";

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
