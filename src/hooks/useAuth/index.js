import { createContext, useState, useContext, useEffect } from "react";

const authContext = createContext();

function useAuth() {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    console.log(authed);
  }, [authed])

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function AuthConsumer() {
  return useContext(authContext);
}