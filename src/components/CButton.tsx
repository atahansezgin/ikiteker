import React from "react";
import { StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Colors } from "../constants/Colors";
import CText from "./CText";

interface ICButton extends TouchableOpacityProps {
  text:string
  labelStyle?:TextStyle
}

export default function CButton(props:ICButton):React.ReactElement {
  return (
    <TouchableOpacity {...props} style={[styles.container,props.style,{opacity:props.disabled ? 0.6 : 1}]}>
      <CText style={[styles.label,props.labelStyle]}>
        {props.text}
      </CText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.orange,
    height:50,
    borderRadius:8,
    alignItems:"center",
    justifyContent:"center",
  },
  label:{
    fontWeight:"bold",
    fontSize:20,
    color:Colors.white,
  }
})