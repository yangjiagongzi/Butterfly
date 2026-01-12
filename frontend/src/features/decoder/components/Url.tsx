import React, { useState } from "react";
import Button from "~/components/Button";
import Radio from "~/components/Radio";
import Textarea from "~/components/Textarea";
import styles from "./styles.module.scss";

const URL: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [useEncodeURI, setUseEncodeURI] = useState(true);
  const [result, setResult] = useState<string>("");

  const encodeAndDecode = () => {
    const func = useEncodeURI ? encodeURI : encodeURIComponent;
    setResult(func(text));
  };

  const decodeAndDecode = () => {
    const func = useEncodeURI ? decodeURI : decodeURIComponent;
    setResult(func(text));
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
        <div className="title">转码规则:</div>
        <div className="items">
          <Radio
            title={"转码   ;   ,   /   ?   :   @   &   =   +   $   #"}
            checked={!useEncodeURI}
            onChange={() => {
              setUseEncodeURI(!useEncodeURI);
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

export default URL;
