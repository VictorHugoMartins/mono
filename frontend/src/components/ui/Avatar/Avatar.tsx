import React from "react";

import styles from "./avatar.module.scss";
import { AvatarProps } from "./avatar.interface";

const Avatar: React.FC<AvatarProps> = ({ alt, image, children }) => {
  return (
    <div className={`${styles.avatar} ${styles[`theme${'light'}`]}`}>
      {image ? <img src={image} width={40} height={40} /> : alt?.charAt(0)}
      {children}
    </div>
  );
};

export default Avatar;
