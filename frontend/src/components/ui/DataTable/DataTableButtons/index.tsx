import React from "react";

import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";

import { IconTypes } from "../../Icon/icon.interface";

import style from "./dataTableButtons.module.scss";

interface DataTableButtonsProps {
  icon: IconTypes;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
}

const DataTableButtons: React.FC<DataTableButtonsProps> = ({
  icon,
  onClick,
  title,
}) => {
  return (
    <div className={style.dataTableButton}>
      <Button
        color="primary"
        onClick={onClick}
        radius="50%"
        noPadding
        title={title}
      >
        <div className={style.dataTableButtonIcon}>
          <Icon type={icon} size={15} />
        </div>
      </Button>
    </div>
  );
};

export default DataTableButtons;
