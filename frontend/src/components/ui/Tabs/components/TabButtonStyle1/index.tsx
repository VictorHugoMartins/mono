import React from "react";

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
  return (
    <button
      onClick={onClick}
      className={`
      ${style.tabButton}
        ${active ? style.tabButtonActive : ""}
        ${style[`theme${'light'}`]}
      `}
    >
      {tabName}
    </button>
  );
};

export default TabButtonStyle1;
