import { createContext, useContext, useEffect, useState } from "react";
import accountService from "~/services/account.service";
import { UserInfoType } from "~/types/api/UserInfoType";

import GetAuthToken from "~/utils/AuthToken/GetAuthToken";

type UserContextType = {
  user?: UserInfoType;
  setUser?: Function;
  getUserInfo: () => Promise<void>;
};

//------------- Criando Context ---------------//
const UserContext = createContext({} as UserContextType);

//------------- Expotando UseContext ---------------//
export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState<UserInfoType>(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const { token } = GetAuthToken();

    if (token) {
      let response = await accountService.getUserInfo();
      if (response.success) setUser(response.object);
    }
  }

  return (
    <UserContext.Provider value={{ getUserInfo, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
