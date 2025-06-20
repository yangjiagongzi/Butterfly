import { useMemo, useState } from "react";
import Textarea from "~/component/Textarea";
import { ProgressItemType, ProgressStatus } from "~/utils/IntruderQueue";
import styles from "../page.module.scss";

type Props = {
  progress: ProgressItemType[];
};

const Response = ({ progress }: Props) => {
  const [activeIdx, setActiveIdx] = useState<number | undefined>(undefined);
  const { totalLength, finishLength } = useMemo(() => {
    let finishLength = 0;
    let totalLength = 0;
    progress.forEach((item) => {
      if (item.finishLength > finishLength) {
        finishLength = item.finishLength;
      }
      if (item.totalLength > totalLength) {
        totalLength = item.totalLength;
      }
    });
    return { totalLength, finishLength };
  }, [progress]);

  const activeItem = useMemo(() => {
    if (activeIdx === undefined) {
      return null;
    }

    return progress[activeIdx] || null;
  }, [progress, activeIdx]);

  return (
    <div className={styles.responseContainer}>
      <div className="responseList">
        <ul>
          {progress.map((item, idx) => {
            const value =
              item.status === ProgressStatus.Failed
                ? `${item.errorMessage}`
                : item.status === ProgressStatus.Success
                ? `${item.response.split("\n")[0]}`
                : "";

            return (
              <li
                className={`resultItem ${
                  item.status === ProgressStatus.Failed ? "error" : ""
                } ${activeIdx === item.idx ? "active" : ""}`}
                key={`${item.idx}`}
                onClick={() => setActiveIdx(item.idx)}
              >
                <span>
                  {totalLength * 10}
                  <b>{idx}</b>
                </span>
                {value}
              </li>
            );
          })}
        </ul>
        <div className="totalLength">{`${finishLength}/${totalLength}`}</div>
      </div>
      {activeItem ? (
        <div className="responseDetail">
          <Textarea value={activeItem.request} disabled />
          {activeItem.status === ProgressStatus.Success ? (
            <Textarea value={activeItem.response} disabled />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Response;
