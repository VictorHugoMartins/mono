import React from "react";

import Button from "~/components/ui/Button/Button";
import Icon from "~/components/ui/Icon/Icon";

import { IconTypes } from "~/components/ui/Icon/icon.interface";

import style from "./dataTableHeaderButton.module.scss";

interface DataTableButtonProps {
  icon?: IconTypes;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  title?: string;
}

const DataTableHeaderButton: React.FC<DataTableButtonProps> = ({
  icon,
  href,
  onClick,
  text,
  title,
}) => {
  return (
    <Button color="primary" href={href} onClick={onClick} title={title}>
      {icon && <Icon type={icon} mr={8} />} {text}
    </Button>
  );
};

export default DataTableHeaderButton;
