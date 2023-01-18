import { SafeAreaView, StyleSheet, TouchableOpacity, ViewProps, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { View } from 'react-native'
import Icon from "react-native-vector-icons/Feather"
import CText from './CText'
import { useNavigation } from '@react-navigation/native'

interface IContainer extends ViewProps {
  title?: string
  screenStyle?:ViewStyle
  hideBack?: boolean
  onFilter?: () => void
}

const Container: React.FC<IContainer> = (props) => {
  const navigation = useNavigation()
  const onBack = () => navigation.goBack()
  return (
    <SafeAreaView style={[styles.container, props.screenStyle]}>
      {
        props.title &&
        <View style={styles.header}>
          {!props.hideBack &&
            <TouchableOpacity style={styles.leftBtn} onPress={onBack}>
              <Icon name='chevron-left' size={24} color={Colors.textDark} />
            </TouchableOpacity>
          }
          <CText style={styles.title}>
            {props.title}
          </CText>
          {props.onFilter &&
            <TouchableOpacity style={styles.rightBtn} onPress={props.onFilter}>
              <Icon name='filter' size={24} color={Colors.textDark} />
            </TouchableOpacity>
          }
        </View>
      }
      <View style={[{flex:1},props.style]}>
        {props.children}
      </View>
    </SafeAreaView>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  leftBtn: {
    position: "absolute",
    left: 16
  },
  rightBtn: {
    position: "absolute",
    right: 16
  }
})