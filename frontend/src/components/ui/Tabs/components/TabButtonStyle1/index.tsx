import React from "react";
import useTheme from "~/hooks/useTheme";

import style from "./tabButtonStyle1.module.scss";

interface TabButtonStyle1Props {
  active?: boolean;
  tabName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const TabButtonStyle1: React.FC<TabButtonStyle1Props> = ({
  active,
  tabName,
  onClick,
}) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={onClick}
      className={`
      ${style.tabButton}
        ${active ? style.tabButtonActive : ""}
        ${style[`theme${theme}`]}
      `}
    >
      {tabName}
    </button>
  );
};

export default TabButtonStyle1;
