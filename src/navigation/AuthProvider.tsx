import React, { createContext, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type AuserType = FirebaseAuthTypes.User | null;
// type AuserType = FirebaseAuthTypes.UserCredential | null;

export type AuthContextType = {
  aUser: AuserType;
  setAuser: (aUser: AuserType) => void;
  login: (email: string, password: string) => void;
  register: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<Partial<AuthContextType>>({});

export const AuthProvider = ({ children }: any) => {
  const [aUser, setAuser] = useState<AuserType>(null);

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
