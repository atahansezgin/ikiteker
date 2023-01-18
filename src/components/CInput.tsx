import { StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import CText from './CText'
import { Colors } from '../constants/Colors'

interface ICInput extends TextInputProps {
  containerStyle?: ViewStyle,
  inputStyle?: TextStyle
  title?:string
}

const CInput: FC<ICInput> = (props) => {
  return (
    <View style={[{marginBottom:8},props.style]}>
      {props.title && 
        <CText>
          {props.title}
        </CText>
      }
      <View style={[styles.container, props?.containerStyle]}>
        <TextInput
          {...props}
          placeholderTextColor={props.placeholderTextColor || "gray"}
          value={props?.value}
          onChangeText={props?.onChangeText}
          style={[styles.input, props?.inputStyle]}
        />
      </View>
    </View>
  )
}

export default CInput

const styles = StyleSheet.create({
  container: {
    borderWidth:1,
    borderColor:"ligthgray",
    borderRadius:8,
    padding:8,
    height:40
  },
  input: {
    paddingVertical:0,
    flex:1,
    color:Colors.textDark
  },
  title:{

  }
})