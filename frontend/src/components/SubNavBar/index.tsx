"use client";
import React, { useMemo, useState } from "react";
import styles from "./styles.module.scss";

type SubNavBarItem = {
  id: string;
  name: string;
  child: React.ReactNode;
};

type SubNavBarProps = {
  items: SubNavBarItem[];
};

const SubNavBar: React.FC<SubNavBarProps> = ({ items }: SubNavBarProps) => {
  const [active, setActive] = useState<string | null>(null);
  const activeChild = useMemo(() => {
    if (!active) {
      return null;
    }
    const activeChild = items.find((item) => item.id === active);
    if (!activeChild) {
      return null;
    }
    return activeChild.child;
  }, [active, items]);

  return (
    <div className={styles.subNavContainer}>
      <div className={styles.subNavBar}>
        {items.map((item) => (
          <div
            key={item.id}
            className={`${styles.subNavBarItem} ${
              item.id === active ? styles.active : ""
            }`}
            onClick={() => setActive(item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className={styles.subNavContent}>{activeChild}</div>
    </div>
  );
};

export default SubNavBar;
