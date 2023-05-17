import React from "react";

import { ButtonProps } from "./button.interface";

import styles from "./button.module.scss";

import Loading from "~/components/ui/Loading/Loading";

import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import RedirectTo from "~/utils/Redirect/Redirect";
import { HandlePadding } from "~/utils/Styles/HandlePadding";
import Icon from "../Icon/Icon";

const Button: React.FC<ButtonProps> = ({
  backgroundColor,
  children,
  color,
  href,
  icon,
  noPadding,
  padding,
  text,
  title,
  type = "button",
  loading,
  radius,
  onClick,
}) => {
  let classList = [styles.button, styles[color], noPadding && styles.noPadding];

  return (
    <button
      className={ClassJoin(classList)}
      type={type}
      onClick={(e) => {
        if (href) RedirectTo(href, e.ctrlKey ? "_blank" : "");
        else if (onClick) onClick(e);
      }}
      disabled={loading}
      title={title}
      style={{ ...HandlePadding(padding), borderRadius: radius, backgroundColor: backgroundColor || undefined }}
    >

      {loading && <Loading type="spin" theme="secondary" size={16} mr={8} />}
      {icon && <Icon type={icon} mr={8} />}
      {text}
      {children}
    </button>
  );
};

export default Button;
