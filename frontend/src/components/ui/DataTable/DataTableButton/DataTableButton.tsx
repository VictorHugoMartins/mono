import React from "react";

import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";

import { IconTypes } from "../../Icon/icon.interface";

import style from "./dataTableButton.module.scss";

interface DataTableButtonProps {
  icon: IconTypes;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  backgroundColor?: string;
  iconColor?: string;
  href?: string;
}

const DataTableButton: React.FC<DataTableButtonProps> = ({
  icon,
  onClick,
  title,
  backgroundColor,
  iconColor,
  href,
}) => {
  return (
    <div className={style.dataTableButton}>
      <Button
        color="primary"
        onClick={onClick}
        href={href}
        radius="50%"
        noPadding
        title={title}
        backgroundColor={backgroundColor || undefined}
      >
        <div className={style.dataTableButtonIcon} style={{ color: iconColor || undefined}}>
          <Icon type={icon} size={15} />
        </div>
      </Button>
    </div>
  );
};

export default DataTableButton;
