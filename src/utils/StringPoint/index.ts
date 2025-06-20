const PointFlag = {
  left: " ◀︎❗️",
  right: "❗️▶︎ ",
} as const;

export const clearPointFlag = (str: string) => {
  return str.replace(
    new RegExp(`(${PointFlag.left})|(${PointFlag.right})`, "g"),
    ""
  );
};

export const updatePointFlag = ({
  pre,
  next,
  select,
  add,
}: {
  pre: string;
  select: string;
  next: string;
  add: boolean;
}) => {
  let preFormat = pre;
  let nextFormat = next;

  const preLastLeft = pre.lastIndexOf(PointFlag.left);
  const preLastRight = pre.lastIndexOf(PointFlag.right);
  if (preLastLeft >= 0 && (preLastRight === -1 || preLastLeft > preLastRight)) {
    preFormat =
      pre.substring(0, preLastLeft) +
      clearPointFlag(pre.substring(preLastLeft));
  }

  const nextFirstLeft = next.indexOf(PointFlag.left);
  const nextFirstRight = next.indexOf(PointFlag.right);

  if (
    nextFirstRight >= 0 &&
    (nextFirstLeft === -1 || nextFirstRight < nextFirstLeft)
  ) {
    nextFormat =
      next.substring(0, nextFirstRight) +
      next.substring(nextFirstRight + PointFlag.right.length);
  }

  const formatSelect = add
    ? `${PointFlag.left}${clearPointFlag(select)}${PointFlag.right}`
    : clearPointFlag(select);

  return `${preFormat}${formatSelect}${nextFormat}`;
};

export const getStringPointFormat = (str: string) => {
  const strList: Array<{ value: string; point: boolean }> = [];

  let pointCount = 0;
  let strTmp = str;
  while (strTmp.indexOf(PointFlag.left) >= 0) {
    const nextFirstLeft = strTmp.indexOf(PointFlag.left);
    const nextFirstRight = strTmp.indexOf(PointFlag.right);
    strList.push(
      { value: strTmp.substring(0, nextFirstLeft), point: false },
      {
        value: clearPointFlag(
          strTmp.substring(
            nextFirstLeft,
            nextFirstRight + PointFlag.right.length
          )
        ),
        point: true,
      }
    );
    strTmp = strTmp.substring(nextFirstRight + PointFlag.right.length);
    pointCount++;
  }

  if (strTmp) {
    strList.push({ value: strTmp, point: false });
  }

  return {
    pointCount,
    originalString: clearPointFlag(str),
    format: (paddingList: { value: string; replace: boolean }[]) => {
      if (paddingList.length !== pointCount) {
        throw new Error("error count for padding");
      }
      let str = "";
      let paddingIdx = 0;
      strList.forEach((item) => {
        if (item.point) {
          const paddingItem = paddingList[paddingIdx];
          if (paddingItem.replace) {
            str = str + paddingItem.value;
          } else {
            str = str + item.value;
          }
          paddingIdx = paddingIdx + 1;
        } else {
          str = str + item.value;
        }
      });

      return str;
    },
  };
};
