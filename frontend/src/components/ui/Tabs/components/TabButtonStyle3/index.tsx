import React from "react";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Typography from "~/components/ui/Typography/Typography";

import style from "./tabButtonStyle3.module.scss";

interface TabButtonStyle3Props {
  active?: boolean;
  tabName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const TabButtonStyle3: React.FC<TabButtonStyle3Props> = ({
  active,
  tabName,
  onClick,
}) => {
  return (
    <button
      className={`${active ? `${style.tButton} ${style.active}` : `${style.tButton}`
        } ${style[`theme${'light'}`]}`}
      onClick={onClick}
    >
      <Flexbox flexDirection="column" align="center" justify="center">
        <Typography component="p">{tabName}</Typography>
        <hr />
      </Flexbox>
    </button>
  );
};

export default TabButtonStyle3;
