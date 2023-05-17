import React from "react";

import styles from "./avatar.module.scss";
import { AvatarProps } from "./avatar.interface";
import useTheme from "~/hooks/useTheme";

const Avatar: React.FC<AvatarProps> = ({ alt, image, children }) => {
  const { theme } = useTheme();

  return (
    <div className={`${styles.avatar} ${styles[`theme${theme}`]}`}>
      {image ? <img src={image} width={40} height={40} /> : alt?.charAt(0)}
      {children}
    </div>
  );
};

export default Avatar;
