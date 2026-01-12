import { useMemo, useState } from "react";
import { TabTypes } from "../lib/constants";

export const useIntruderTabs = () => {
  const tabs = useMemo(() => Object.values(TabTypes), []);
  const [choose, setChoose] = useState<Values<typeof TabTypes>["id"]>(
    TabTypes.type.id
  );

  return useMemo(
    () => ({ tabs, choose, setChoose }),
    [tabs, choose, setChoose]
  );
};
