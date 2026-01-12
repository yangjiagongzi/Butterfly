import React from "react";
import Textarea from "~/components/Textarea";
import { RequestOptions } from "~/constant/intruder";
import styles from "./request.module.scss";

type Props = {
  requestOptions: RequestOptions;
  onUpdateBody: (body: string) => void;
};

const RequestBody: React.FC<Props> = ({
  requestOptions,
  onUpdateBody,
}: Props) => {
  return (
    <div className={styles.requestBody}>
      <Textarea
        value={requestOptions.body}
        onChange={(e) => onUpdateBody(e.target.value)}
      />
    </div>
  );
};

export default RequestBody;
