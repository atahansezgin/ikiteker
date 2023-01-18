import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import { Colors } from "../constants/Colors";

export default function CText(props: TextProps): React.ReactElement {
  return (
    <Text {...props} style={[styles.text,props.style]}>
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text:{
    fontSize:14,
    color:Colors.textDark
  }
})