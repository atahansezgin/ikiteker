import { Alert, StyleSheet, View } from 'react-native'
import React, { FC, useContext, useEffect, useState } from 'react'
import Container from '../../components/Container'
import CText from '../../components/CText'
import CInput from '../../components/CInput'
import CButton from '../../components/CButton'
import { ScreenProps } from '../../navigation'
import { TouchableOpacity } from 'react-native'
import authentication from '@react-native-firebase/auth';
import { AuthContext } from '../../context/AuthContext'
import { responsiveVertical } from '../../constants/Dimensions'

const SignInScreen: FC<ScreenProps> = (props) => {
  const [auth, setAuth] = useState({
    email: "",
    password: ""
  })
  const { email, password } = auth
  const {setUser} = useContext(AuthContext)

  useEffect(() => {
    if(__DEV__){
      setAuth({
        email:"atahansezgin@mail.com",
        password:"ikiteker"
      })
    }
  }, [])
  

  const submitDisabled = email == "" || password == ""

  const onChangeEmail = (text: string) => setAuth({ ...auth, email: text })
  const onChangePassword = (text: string) => setAuth({ ...auth, password: text })

  const onRegister = () => props.navigation.navigate("Signup")
  const onSubmit = () => {
    authentication()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        setUser(user)
        props.navigation.reset({
          index: 0,
          routes: [{name:"Home"}]
        })
      })
      .catch(err => {
        Alert.alert("Error","Try again")
        setAuth({
          email:"",
          password:""
        })
      })
  }
  return (
    <Container>
      <View style={styles.header}>
        <CText style={styles.headerTag}>
          Login
        </CText>
      </View>

      <View style={styles.body}>
        <CInput
          title='Email'
          value={email}
          onChangeText={onChangeEmail}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
        />
        <CInput
          title='Password'
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry
          autoCapitalize={"none"}
        />
        <TouchableOpacity onPress={onRegister} style={styles.registerBtn}>
          <CText style={styles.registerTxt}>
            Register
          </CText>
        </TouchableOpacity>
        <CButton
          disabled={submitDisabled}
          style={styles.bottom}
          text='Login'
          onPress={onSubmit}
        />
      </View>

    </Container>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {

  },
  header: {
    padding: responsiveVertical(50),
    alignItems: "center",
  },
  headerTag: {
    fontSize: 40,
  },
  body: {
    padding: responsiveVertical(16)
  },
  bottom: {
    marginTop: responsiveVertical(50)
  },
  registerBtn: {
    marginLeft: "auto",
  },
  registerTxt: {

  }
})