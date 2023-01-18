import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import React from "react";
type AuthContext = {
  user:FirebaseAuthTypes.UserCredential | undefined
  setUser:React.Dispatch<any>
}
export const AuthContext = React.createContext<AuthContext>({
  user:undefined,
  setUser:() => {}
})