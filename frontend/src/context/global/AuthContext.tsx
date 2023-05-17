import { createContext, useContext, useEffect, useState } from "react";
import { FormExternalResponseType } from "~/components/ui/Form/form.interface";

import authService from "~/services/auth.service";
import GetAuthToken from "~/utils/AuthToken/GetAuthToken";
import RedirectTo from "~/utils/Redirect/Redirect";

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  requesting: boolean;
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<FormExternalResponseType>;
};

//------------- Criando Context ---------------//
const AuthContext = createContext({} as AuthContextType);

//------------- Expotando UseContext ---------------//
export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [requesting, setRequesting] = useState<boolean>(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { token } = GetAuthToken();

    if (token) {
      // recoverUserInformation().then(response => {
      //   setUser(response.user)
      // })
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    setRequesting(true);
    const response = await authService
      .signIn({ email, password })
      .then((response) => {
        if (response.success) {
          window.location.assign("/dashboard");
          return null;
        }
        return { message: response.message, errors: response.errors };
      });

    setRequesting(false);
    return response;
    // setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, requesting }}>
      {children}
    </AuthContext.Provider>
  );
}
