import React from "react";

//Import assets
import Icon from "~/components/ui/Icon/Icon";
import SideMenuLogo from '~/assets/images/navBarIconWhite.png';

import styles from "../sideMenu.module.scss";

interface SideMenuCollapseButtonProps {
  handleOpen: (value: boolean) => void;
  open: boolean;
  id?: string;
}

const SideMenuCollapseButton: React.FC<SideMenuCollapseButtonProps> = ({
  handleOpen,
  open,
  id
}) => {
  return (
    <div
      className={styles.sideMenuCollapseButton}
      onClick={() => {
        handleOpen(!open);
      }}
      id={id || "primary"}
    >
      {open &&
        <div className={styles.sideMenuLogo}>
          <img src={SideMenuLogo} />
        </div>
      }

      {open ? (
        <Icon type="FaAngleDoubleLeft" size={24} />
      ) : (
        <Icon type="FaAngleDoubleRight" size={24} />
      )}
    </div>
  );
};

export default SideMenuCollapseButton;
