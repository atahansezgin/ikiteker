import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navigation from './navigation'
import { AuthContext } from './context/AuthContext'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

const App = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.UserCredential | undefined>()
  
  return (
    <AuthContext.Provider value={{user,setUser}}>
      <Navigation />
    </AuthContext.Provider>
  )
}

export default App

const styles = StyleSheet.create({})