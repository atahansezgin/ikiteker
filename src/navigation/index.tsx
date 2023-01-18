import React from 'react'
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import InformationScreen from '../screens/InformationScreen';
import { IReservation } from '../models/Reservation';

type RootStackParamList = {
  Signin: undefined,
  Signup: undefined
  Home: undefined
  Information: {
    item:IReservation
  }
};

export type ScreenProps = StackScreenProps<RootStackParamList> & {}

const navigationRef:React.RefObject<NavigationContainerRef<RootStackParamList>> = React.createRef();
export const navigation = navigationRef?.current

const Navigation = () => {
  const Stack = createStackNavigator<RootStackParamList>()
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Information" component={InformationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation