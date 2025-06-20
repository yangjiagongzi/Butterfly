import React, { useEffect, useState } from "react";
import Icon, { IconName } from "~/component/Icon";
import { Pages } from "~/constant/page";
import variables from "~/styles/variables.module.scss";
import styles from "./styles.module.scss";

type NavBarItemProps = {
  active: boolean;
  icon: IconName;
  title: string;
  onClick: () => void;
};

const NavBarItem: React.FC<NavBarItemProps> = ({
  active,
  icon,
  title,
  onClick,
}: NavBarItemProps) => {
  const iconColor = active
    ? variables.colorBackground
    : variables.colorTextDark;

  return (
    <div
      className={`${styles.navBarItem} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      <Icon name={icon} size={"md"} color={iconColor} />
      <div className="note">{title}</div>
    </div>
  );
};

type NavBarProps = {
  onActiveChange: (id: (typeof Pages)[number]["id"]) => void;
};

const NavBar: React.FC<NavBarProps> = ({ onActiveChange }: NavBarProps) => {
  const [active, setActive] = useState<(typeof Pages)[number]["id"]>(
    Pages[0].id
  );

  useEffect(() => {
    onActiveChange(active);
  }, [active, onActiveChange]);

  return (
    <div className={styles.navBar}>
      {Pages.map(({ id, icon, title }) => (
        <NavBarItem
          key={id}
          active={active === id}
          icon={icon}
          title={title}
          onClick={() => {
            setActive(id);
          }}
        />
      ))}
    </div>
  );
};

export default NavBar;
