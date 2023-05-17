import React from "react";
import Icon from "~/components/ui/Icon/Icon";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Link from "~/components/ui/Link/Link";
import Typography from "~/components/ui/Typography/Typography";
import { NotificationProps } from "~/context/global/NotificationsContext";

//Import style
import style from "./notificationButtonItem.module.scss";

const NotificationButtonItem: React.FC<NotificationProps> = ({message,createdAtStr, urlWeb,id,isVisualized}) => {
  return (
    <Link to={urlWeb??""}>
      <Flexbox
        className={style.notificationButtonItem}
        align="center"
        spacing="m"
      >
        <Icon type={isVisualized?"FaCheck":"FaCircle"} size={8} />
        <Flexbox flexDirection="column" align="center" justify="center">
          <Typography component="p" className={!isVisualized && style.notVisualized}>
            {message}
          </Typography>
          {
            createdAtStr&&
            <Flexbox className={style.dateStringContainer}>
              <Typography component="p" className={style.dateString}>
                {createdAtStr}
              </Typography>
            </Flexbox>
          }
        </Flexbox>
      </Flexbox>
    </Link>
  );
};

export default NotificationButtonItem;
