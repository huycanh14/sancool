import React, { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../useLocalStorage";
import { UserRepository } from "@/repository/UserRepository";
import { usePathname, useRouter } from "next/navigation";
interface AuthContextInterface {
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  authKey: string;
  setAuthKey: (value: string) => void;
}

export const AuthContext = createContext({} as AuthContextInterface);

type AuthProviderProps = {
  children?: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const userRepository = new UserRepository();
  const [authKey, setAuthKey] = useLocalStorage<string>("authkey", "");
  const pathname = usePathname();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    return await userRepository.signInWithEmailAndPassAsync({
      email: email,
      password: password,
    });
  };

  const handleLogout = async () => {
    await userRepository.singOutAsync();
  };

  useEffect(() => {
    if (pathname !== "/admin/login" && !authKey) {
      router.replace("/admin/login");
    }
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        authKey,
        setAuthKey,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
