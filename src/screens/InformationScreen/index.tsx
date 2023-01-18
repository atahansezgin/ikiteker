import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useContext, useMemo, useState } from 'react'
import Container from '../../components/Container'
import { ScreenProps } from '../../navigation'
import CButton from '../../components/CButton'
import CInput from '../../components/CInput'
import controller from '../../firebase/controller'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Colors } from '../../constants/Colors'
import { AuthContext } from '../../context/AuthContext'
import { responsiveVertical } from '../../constants/Dimensions'

const InformationScreen: FC<ScreenProps> = (props) => {
  const item = useMemo(() => props.route.params?.item, [props.route.params?.item])
  const [information, setInformation] = useState(item?.bike.information || "")
  const [rates, setRates] = useState([
    {
      value: 1.0,
      selected: false,
    },
    {
      value: 2.0,
      selected: false,
    },
    {
      value: 3.0,
      selected: false,
    },
    {
      value: 4.0,
      selected: false,
    },
    {
      value: 5.0,
      selected: false,
    }
  ])
  const {user} = useContext(AuthContext)
  const onChangeInformation = (text: string) => setInformation(text)
  const onSelectRate = (rateIndex:number) => {
    let newRates = rates.slice()
    newRates.map((rate,index) => {
      if(index <= rateIndex){
        rate.selected = true
      }else{
        rate.selected = false
      }
    })
    setRates(newRates)
  }

  const onSaveBikeInformation = async() => {
    await controller.editBikeInformation(item?.id!, information)
    .then(() => props.navigation.goBack())
  }
  const onRatingBike = async() => {
    await controller.ratingBike(item?.id!, rates.filter(rate => rate.selected).length)
    .then(() => props.navigation.goBack())
  }
  const onRentBike = async() => {
    await controller.rentBike(item?.id!,user?.user.uid!)
    .then(() => props.navigation.goBack())
  }
  const onCancel = async() => {
    await controller.cancelRent(item?.id!)
    .then(() => props.navigation.goBack())
  }

  return (
    <Container style={{ padding: responsiveVertical(16) }} title={item?.bike.model}>
      <CInput
        containerStyle={{
          height: responsiveVertical(200)
        }}
        multiline
        placeholder='Change bike information'
        value={information}
        onChangeText={onChangeInformation}
      />
      <CButton
          onPress={onSaveBikeInformation}
          style={{ marginLeft: "auto", width: "40%" }}
          text='Save'
        />
      <View style={{marginTop:responsiveVertical(24)}}>
        <View style={{flexDirection:"row",marginBottom:responsiveVertical(12)}}>
          {rates.map((rate,index) => {
            return (
              <TouchableOpacity style={{flex:1,alignItems:"center"}} key={index} onPress={() => onSelectRate(index)}>
                <Ionicons size={30} color={Colors.orange} name={rate.selected ? "star" : "star-outline"} />
              </TouchableOpacity>
            )
          })}
        </View>
        <CButton
          disabled={rates.filter(x => x.selected).length === 0}
          text='Rate'
          onPress={onRatingBike}
        />
        
      </View>
      <CButton
        style={styles.bottom}
        onPress={item?.userId === user?.user.uid ? onCancel : onRentBike}
        text={item?.userId === user?.user.uid  ? "Cancel Rent" : "Rent"}
      />
    </Container>
  )
}

export default InformationScreen

const styles = StyleSheet.create({
  bottom: {
    marginTop: "auto",
    marginBottom: responsiveVertical(34)
  }
})