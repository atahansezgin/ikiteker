import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useContext } from 'react'
import CText from '../CText'
import { IReservation } from '../../models/Reservation'
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import FeatherIcon from "react-native-vector-icons/Feather"
import { Colors } from '../../constants/Colors'
import moment from 'moment'
import { AuthContext } from '../../context/AuthContext'
import { responsiveHorizontal, responsiveVertical } from '../../constants/Dimensions'

interface IReservationItem {
  item: IReservation
  onPress: (item: IReservation) => void
}

const ReservationCard: FC<IReservationItem> = (props) => {
  const { item,onPress } = props
  const {user} = useContext(AuthContext)
  const rating = item.bike.ratingList.reduce((partialSum, a) => partialSum + a, 0) / item.bike.ratingList.length
  return (
    <TouchableOpacity 
      disabled={item?.userId === user?.user.uid  ? false : !item.isAvailable}
      onPress={() => onPress(item)} style={[
        styles.container,
        {
          opacity:item?.userId === user?.user.uid ? 1 : !item.isAvailable ? 0.3 : 1,
          borderColor:item.userId === user?.user.uid ? Colors.orange : "lightgray"
        }]}
    >
      <View style={styles.labelContainer}>
        <CText style={styles.model}>
          {item.bike.model}
        </CText>
        <CText numberOfLines={1} style={styles.information}>
          {item.bike.information}
        </CText>
        <CText>
          {item.bike.location}
        </CText>
        <CText>
          {moment(item.date,"YYYY-MM-DDTHH:mm:ss").format("DD MMMM - HH:mm")}
        </CText>
      </View>
      <View>
        <MaterialIcon
          name='bicycle'
          color={item.bike.color}
          size={100}
        />
        <CText style={styles.rating}>
          <FeatherIcon name='star' size={styles.rating.fontSize} color={Colors.orange} /> {rating.toFixed(1)}
        </CText>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(ReservationCard)

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "lightgray",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: responsiveVertical(16)
  },
  labelContainer: {
    flex: 1,
    paddingRight: responsiveHorizontal(20),
  },
  model: {
    fontWeight: "600",
    fontSize: 18,
  },
  information: {
    fontSize: 12,
    flex: 1,
  },
  image: {
    width: responsiveVertical(100),
    height: responsiveVertical(100),
    borderRadius: 8,
  },
  rating: {
    textAlign: "right",
    fontSize: 17,
    fontWeight: "600"
  }
})