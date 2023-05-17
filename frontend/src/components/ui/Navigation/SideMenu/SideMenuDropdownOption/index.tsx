import React, { useEffect, useRef, useState } from "react";

import Icon from "~/components/ui/Icon/Icon";
import { SideMenuDropdownOptionProps } from "../sideMenu.interface";
import SideMenuIcon from "../SideMenuIcon";

import styles from "../sideMenu.module.scss";
import { useSideMenuContext } from "../SideMenu";
import Typography from "~/components/ui/Typography/Typography";

const SideMenuDropdownOption: React.FC<SideMenuDropdownOptionProps> = ({
  icon,
  text,
  openAside,
  setOpenAside,
  children,
}) => {
  const { open, handleOpen } = useSideMenuContext();
  const [showOptions, setShowOptions] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  async function buttonHandler() {
    if (!showOptions && !open) {
      await handleOpen(true);
    }
    handleCollapse();
  }

  useEffect(() => {
    if (!openAside) {
      setShowOptions(false);
    }
  }, [openAside]);

  function handleCollapse() {
    setShowOptions((state) => !state);
    growDiv(showOptions);
  }

  function growDiv(boolean) {
    if (dropRef.current) {
      if (boolean) {
        dropRef.current.style.height = "0";
      } else {
        var wrapper = document.querySelector(
          ".measuringWrapper" + text.replaceAll(" ", "")
        );
        dropRef.current.style.height = wrapper.clientHeight + "px";
      }
    }
  }

  return (
    <>
      <div
        className={styles.option}
        onClick={(e) => {
          buttonHandler();
        }}
        title={text}
      >
        <SideMenuIcon icon={icon} />
        <p className={`${styles.sideMenuText} ${styles.optionWithDropdown}`}>
          <Typography component="caption">{text}</Typography>
          <button className={styles.dropdownButton}>
            {
              <>
                {!showOptions && openAside ? (
                  <Icon type="FaCaretDown" />
                ) : (
                  <Icon type="FaCaretUp" />
                )}
              </>
            }
          </button>
        </p>
      </div>

      {openAside && (
        <div ref={dropRef} className={styles.dropOptions}>
          <div className={"measuringWrapper" + text.replaceAll(" ", "")}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenuDropdownOption;
