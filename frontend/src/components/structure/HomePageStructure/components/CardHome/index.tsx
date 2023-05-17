import React from "react";

import Avatar from "~/components/ui/Avatar/Avatar";
import Card from "~/components/ui/Card";
import Icon from "~/components/ui/Icon/Icon";
import { IconTypes } from "~/components/ui/Icon/icon.interface";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Link from "~/components/ui/Link/Link";
import Typography from "~/components/ui/Typography/Typography";

import style from "./cardHome.module.scss";

interface CardHome {
  icon?: IconTypes;
  title: string;
  value: string;
  className: string;
}

const CardHome: React.FC<CardHome> = ({ className, title, value, icon }) => {
  return (
    <Link to="/usuario/horastrabalhadas">
      <Card padding="m">
        <Flexbox flexDirection="column" spacing={"p"}>
          {icon && (
            <Avatar>
              <Icon type={icon} size={20} className={className} />
            </Avatar>
          )}
          <Typography component={"h2"} className={style.cardHomeTitle}>
            {value}
          </Typography>
          <Typography component={"p"} className={style.cardHomeSubTitle}>
            {title}
          </Typography>
        </Flexbox>
      </Card>
    </Link>
  );
};

export default CardHome;
