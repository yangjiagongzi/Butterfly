"use client";
import React, { HTMLAttributes, useMemo } from "react";
import Button from "~/components/Button";
import { BaseGenerator } from "~/utils/PayloadGenerate";
import styles from "./styles.module.scss";

type Props = HTMLAttributes<HTMLUListElement> & {
  generator: BaseGenerator;
  onApply: (generator: BaseGenerator) => void;
};

const DictionaryList: React.FC<Props> = ({
  generator,
  onApply,
  ...otherProps
}: Props) => {
  const formatList = useMemo(() => {
    if (generator.showList.length < 1001) {
      return generator.showList;
    }
    return [
      ...generator.showList.slice(0, 500),
      ...generator.showList.slice(generator.showList.length - 500),
    ];
  }, [generator.showList]);
  const totalLength = useMemo(() => generator.length, [generator.length]);

  return (
    <div className={styles.dictionaryList}>
      <ul {...otherProps}>
        {formatList.map((key, idx) => (
          <li className={styles.dictionaryListItem} key={`${idx}${key}`}>
            {key}
          </li>
        ))}
      </ul>
      <div className="totalLength">{`总计: ${totalLength}个`}</div>
      <div className="buttonContainer">
        <Button onClick={() => onApply(generator)} title="Apply" />
      </div>
    </div>
  );
};

export default DictionaryList;
