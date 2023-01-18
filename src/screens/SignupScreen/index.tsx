import { Alert, StyleSheet, View } from 'react-native'
import React, { FC, useContext, useState } from 'react'
import Container from '../../components/Container'
import CText from '../../components/CText'
import CInput from '../../components/CInput'
import CButton from '../../components/CButton'
import { TouchableOpacity } from 'react-native'
import { ScreenProps } from '../../navigation'
import authentication from '@react-native-firebase/auth';
import { AuthContext } from '../../context/AuthContext'
import { responsiveVertical } from '../../constants/Dimensions'

const SignUpScreen: FC<ScreenProps> = (props) => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })
  const { email, password, confirmPassword } = auth
  const {setUser} = useContext(AuthContext)

  const submitDisabled =  email === "" || password === "" || password !== confirmPassword

  const onChangeEmail = (text: string) => setAuth({ ...auth, email: text })
  const onChangePassword = (text: string) => setAuth({ ...auth, password: text })
  const onChangeConfirmPassword = (text: string) => setAuth({ ...auth, confirmPassword: text })

  const onLogin = () => props.navigation.goBack()
  const onSubmit = () => {
    authentication()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user)
        props.navigation.reset({
          index: 0,
          routes: [{name:"Home"}]
        })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error','That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error','That email address is invalid!');
        }

        console.error(error);
      });
  }
  return (
    <Container>
      <View style={styles.header}>
        <CText style={styles.headerTag}>
          Register
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
        <CInput
          title='ConfirmPassword'
          value={confirmPassword}
          onChangeText={onChangeConfirmPassword}
          secureTextEntry
          autoCapitalize={"none"}
        />
        <TouchableOpacity onPress={onLogin} style={styles.registerBtn}>
          <CText style={styles.registerTxt}>
            Login
          </CText>
        </TouchableOpacity>
        <CButton
          disabled={submitDisabled}
          style={styles.bottom}
          text='Register'
          onPress={onSubmit}
        />
      </View>

    </Container>
  )
}

export default SignUpScreen

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