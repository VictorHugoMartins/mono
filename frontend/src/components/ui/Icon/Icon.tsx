import React from "react";

import styles from "./icon.module.scss";
import * as FontAwesome from "react-icons/fa";
import { IconTypes } from "./icon.interface";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

interface IconProps {
  className?: string;
  mr?: number;
  size?: number;
  src?: string;
  type?: IconTypes;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({
  className = "",
  mr,
  size,
  src,
  type,
  style = {},
}) => {
  return (
    <div
      className={ClassJoin([styles.icon, className])}
      style={{ height: size, width: size, marginRight: mr, ...style }}
    >
      {type ? (
        <SwitchIcon size={size} type={type} />
      ) : (
        type && <img src={src} />
      )}
    </div>
  );
};

function SwitchIcon({ size, type }: IconProps) {
  const ComponentTag = FontAwesome[type];

  return <ComponentTag size={size} />;
}

export default Icon;
