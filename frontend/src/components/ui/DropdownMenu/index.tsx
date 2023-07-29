import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import useWindowDimensions from "~/context/global/useWindowDimensions";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import Icon from "../Icon/Icon";

import styles from "./dropdown.module.scss";

interface LayoutProps {
  className?: string;
  clickableComponent: React.ReactNode;
  children: React.ReactNode;
  align: "right" | "left";
  fixed?: boolean;
}

interface DropdownLinkOptionProps {
  href: string;
  text: string;
}

const mountedStyle = {
  animation: "inAnimation 250ms ease-in"
};
const unmountedStyle = {
  animation: "outAnimation 270ms ease-out",
  animationFillMode: "forwards"
};

const DropdownMenu: React.FC<LayoutProps> = ({
  className = "",
  clickableComponent,
  children,
  align,
  fixed
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const { isDesktop } = useWindowDimensions();

  function handleOnBlur(e: React.FocusEvent<HTMLDivElement, Element>) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowOptions(false);
    }
  }

  let classList = [styles.dropdown, className];

  return (
    <div
      className={ClassJoin(classList)}
      tabIndex={0}
      onBlur={(e) => handleOnBlur(e)}
    >
      <div
        onClick={() => {
          setShowOptions(!showOptions);
        }}
        style={{ cursor: "pointer" }}
      >
        {clickableComponent}
      </div>
      {showOptions && (
        <div
          className={`${styles.dropdownContent} ${styles[`theme${'light'}`]} ${styles[align]}`}
          style={showOptions ?
            {
              position: (isDesktop && fixed) ? "fixed" : "unset",
              animation: "inAnimation 250ms ease-in"
            } :
            {
              position: (isDesktop && fixed) ? "fixed" : "unset", animation: "outAnimation 270ms ease-out",
              animationFillMode: "forwards"
            }
          }
        >
          {children}
        </div>
      )
      }
    </div >
  );
};

const DropdownLinkOption: React.FC<DropdownLinkOptionProps> = (props) => {
  return <a href={props.href}>{props.text}</a>;
};

interface DropdownLogoutOptionProps extends DropdownLinkOptionProps {
  onClick?: () => void;
}

const DropdownLogoutOption: React.FC<DropdownLogoutOptionProps> = ({
  href,
  onClick,
  text,
}) => {
  return (
    <a href={href} className={styles.dropdownLogout} onClick={onClick}>
      <Icon type="FaSignOutAlt" />
      {text}{" "}
    </a>
  );
};

export { DropdownMenu, DropdownLinkOption, DropdownLogoutOption };
