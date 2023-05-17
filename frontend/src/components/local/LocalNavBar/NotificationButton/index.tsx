import React, { useEffect } from "react";

//Import components
import { DropdownButton } from "~/components/ui/Dropdown";
import Icon from "~/components/ui/Icon/Icon";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Typography from "~/components/ui/Typography/Typography";
import useTheme from "~/hooks/useTheme";

//Import style
import style from "./notificationButton.module.scss";
import NotificationButtonItem from "./NotificationButtonItem";
import InViewObserver from "~/components/ui/InViewObserver";
import { NotificationProps, useNotifications } from "~/context/global/NotificationsContext";

const NotificationButton: React.FC = () => {
  const { theme } = useTheme();
  const { notifications, notificationsNotVisualized, handleNotifications, handleVisibleMessages, getNotifications } = useNotifications();

  useEffect(() => {
    let _startdate = new Date(Date.now() - 24 * 7 * 3600 * 1000);
    let _enddate = new Date();
    getNotifications({ startDate: _startdate, endDate: _enddate, userId: null, isVisualized: null });
  }, [])

  return (
    <>
      <DropdownButton
        align="right"
        className={`${style[`theme${theme}`]}`}
        initialShow={false}
        clickableComponent={
          <Flexbox align="center" justify="center" className={style.notificationButtonContainer}>
            <Icon
              className={style.notificationButtonIcon}
              type="FaRegBell"
              size={23}
            />
            {
              notificationsNotVisualized > 0 &&
              <div title={`Você tem ${notificationsNotVisualized} notificações novas!`} className={style.notificationsCounterContainer}>
                <Typography className={style.notificationsCounterLabel} component="p">
                  {notificationsNotVisualized > 9 ? `9+` : notificationsNotVisualized}
                </Typography>
              </div>
            }
          </Flexbox>
        }
      >
        <div className={style.notificationsList}>
          <Flexbox align="flex-start" margin={{ top: "m", bottom: 'pp', left: 'm', right: 'm' }}>
            <Typography component="h4">Notificações</Typography>
          </Flexbox>
          {
            (!notifications || notifications?.length === 0) ?
              <NotificationButtonItem expoTokens={[]} urlWeb={""} usersIds={[]} id={"0"} isVisualized={false} message="Você não possui notificações !" />
              :
              <Flexbox flexDirection="column" className={style.flexbox}>
                {
                  notifications?.map((item, index) => {
                    return (
                      <InViewObserver
                        key={index}
                        threshold={1}
                        onChange={(inView, entry) => {
                          // console.log(inView, entry)
                          if (item.isVisualized === false && inView === true) {
                            handleVisibleMessages(item, index);
                          }
                        }}
                      >
                        <NotificationButtonItem createdAtStr={item.createdAtStr} urlWeb={item.urlWeb} usersIds={item.usersIds} id={item.id} isVisualized={item.isVisualized} message={item.message} />
                      </InViewObserver>
                    )
                  })
                }
              </Flexbox>
          }
        </div>
      </DropdownButton>
    </>
  );
};

export default NotificationButton;
