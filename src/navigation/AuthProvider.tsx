import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export type AuthContextType = {
  aUser: any;
  setAuser: any;
  login: any;
  register: any;
  logout: any;
};

export const AuthContext = createContext<Partial<AuthContextType>>({});

export const AuthProvider = ({ children }: any) => {
  const [aUser, setAuser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        aUser: aUser,
        setAuser,
        login: async (email: string, password: string) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email: string, password: string) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
