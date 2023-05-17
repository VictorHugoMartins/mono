import React, { useState, useEffect, useContext, createContext } from "react";
import { API_NOTIFICATION } from "~/config/apiRoutes/notification";
import { getNotificationAPIClient } from "~/services/axios";
import notificationService from "~/services/notification";
import { APIResponseType } from "~/types/global/RequestTypes";
import { PostRequest } from "~/utils/Requests/Requests";
import Toast from "~/utils/Toast/Toast";

interface KeyValue {
  key: string;
  value?: string | number | null;
}
export interface NotificationProps {
  id: string,
  isVisualized: boolean,
  message: string,
  urlWeb: string,
  linkApp?: {
    screen: string,
    param: KeyValue[]
  },
  usersIds: string[],
  expoTokens?: string[],
  createdAtStr?: string,
}

type NotificationContextType = {
  notifications: NotificationProps[];
  handleVisibleMessages: (notification: NotificationProps, index: number) => void;
  handleNotifications: (notifications: NotificationProps[]) => void;
  notificationsNotVisualized: number;
  getNotifications: Function;
};

//------------- Criando Context ---------------//
const NotificationContext = createContext({} as NotificationContextType);

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [notificationsNotVisualized, setNotificationsNotVisualized] = useState<number>(0);

  async function handleVisibleMessages(notification: NotificationProps, index: number) {
    if (!notification.isVisualized) {
      let response = await notificationService.setVisualized(notification.id);
      if (response.success) {
        setNotifications(prevstate => {
          return prevstate.map((it, ind) => {
            if (ind !== index) {
              return it;
            } else {
              return {
                ...it,
                isVisualized: true,
              }
            }
          })
        })
        // Toast.success(response.message);
      }
      else Toast.error(response.message);
    }
    return null;
  }

  const handleNotifications = (notifications: NotificationProps[]) => {
    setNotifications(notifications);
  }

  async function getNotifications(obj: {}) {
    let response = {} as APIResponseType<any>;

    // console.log("o obj p notificacao", obj)
    const responseApi = await PostRequest<NotificationProps[]>(API_NOTIFICATION.GETALL(), obj, null, null, getNotificationAPIClient());

    if (responseApi.success) {
      setNotifications(responseApi.object);
    } else {
      console.error(response);
    }

    return response;
  }

  // useEffect(() => {
  //   getNotifications({startDate: new Date(), endDate: new Date(), userId: null, isVisualized: true});
  // }, [])

  useEffect(() => {
    // console.log('notifications', notifications);
    setNotificationsNotVisualized(notifications?.filter((item) => { return item.isVisualized === false })?.length ?? 0)
  }, [notifications])

  return (
    <NotificationContext.Provider value={{ notifications, handleNotifications, handleVisibleMessages, notificationsNotVisualized, getNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications(): NotificationContextType {
  const notification = useContext(NotificationContext);
  return notification;
}