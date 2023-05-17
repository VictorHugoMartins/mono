import React, { useEffect } from "react";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Typography from "~/components/ui/Typography/Typography";
import useTheme from "~/hooks/useTheme";
import scrollIntoView from "~/utils/ScrollIntoView";

import style from "./tabButtonStyle2.module.scss";

interface TabButtonStyle2Props {
  active?: boolean;
  tabName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const TabButtonStyle2: React.FC<TabButtonStyle2Props> = ({
  active,
  tabName,
  onClick,
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (active) scrollIntoView(`tab-${tabName}`)
  }, [active])

  return (
    <button
      id={`tab-${tabName}`}
      onClick={(e) => { onClick(e); }}
      className={`${active ? `${style.tButton} ${style.active}` : `${style.tButton}`
        } ${style[`theme${theme}`]}`}
    >
      <Flexbox flexDirection="column" align="center" justify="center">
        <button>{tabName.charAt(0)}</button>
        <Typography component="p">{tabName}</Typography>
        <hr />
      </Flexbox>
    </button>
  );
};

export default TabButtonStyle2;
