import React, { useState } from "react";
import useTheme from "~/hooks/useTheme";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import Icon from "../Icon/Icon";

import styles from "./dropdown.module.scss";

interface LayoutProps {
  className?: string;
  maxContentHeight?: number;
  clickableComponent: React.ReactNode;
  children: React.ReactNode;
  align: "right" | "left";
  fixed?: boolean;
  initialShow?: boolean;
}

interface DropdownLinkOptionProps {
  href: string;
  text: string;
}

const DropdownButton: React.FC<LayoutProps> = ({
  className = "",
  clickableComponent,
  children,
  maxContentHeight,
  initialShow,
  align,
  fixed,
}) => {
  const [showOptions, setShowOptions] = useState(initialShow ?? false);
  const { theme } = useTheme();

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
          className={`${styles.dropdownContent} ${styles[`theme${theme}`]} ${styles[align]
            }`}
          style={{
            position: fixed ? "fixed" : "absolute",
            animation: showOptions ? "inAnimation 250ms ease-in" : "outAnimation 270ms ease-out",
            minWidth: "100%"
          }}
        >
          {
            maxContentHeight ?
              <div style={{ maxHeight: maxContentHeight, overflowY: 'scroll' }}>
                {children}
              </div>
              :
              children
          }
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

export { DropdownButton, DropdownLinkOption, DropdownLogoutOption };
