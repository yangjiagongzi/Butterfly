import React, { useCallback } from "react";
import Modal from "~/components/Modal";
import { SimpleListDict } from "~/constant/dictionary";
import styles from "./styles.module.scss";

type Props = {
  onSelect: (value: string) => void;
};

const DictionarySelect: React.FC<Props> = ({ onSelect }: Props) => {
  const onClick = useCallback(
    (value: string) => {
      onSelect(value);
      Modal.close();
    },
    [onSelect]
  );

  return (
    <div className={styles.dictionarySelect}>
      <ul>
        {SimpleListDict.map((item) => {
          return (
            <li
              className={styles.dictionarySelectItem}
              key={`${item.name}`}
              onClick={() => onClick(item.value)}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DictionarySelect;
