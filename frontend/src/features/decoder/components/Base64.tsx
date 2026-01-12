import React, { useState } from "react";
import Button from "~/components/Button";
import Textarea from "~/components/Textarea";
import styles from "./styles.module.scss";

const Base64: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const encodeAndDecode = () => {
    const encode = encodeURI(text);
    setResult(btoa(encode));
  };

  const decodeAndDecode = () => {
    const encode = atob(text);
    setResult(decodeURI(encode));
  };

  return (
    <div className={styles.container}>
      <div className={styles.paramGroup}>
        <div className="title">目标字符串:</div>
        <div className="items">
          <Textarea
            value={text}
            spellCheck={false}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.paramGroup}>
        <div className="title">结果:</div>
        <div className="items">
          <Textarea value={result} spellCheck={false} disabled />
        </div>
      </div>
      <div className={styles.paramGroup}>
        <Button onClick={encodeAndDecode} title="加密" />
        <Button onClick={decodeAndDecode} title="解密" />
      </div>
    </div>
  );
};

export default Base64;
