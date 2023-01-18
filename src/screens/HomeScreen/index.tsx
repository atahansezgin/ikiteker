import { FlatList, StyleSheet, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import Container from '../../components/Container'
import ReservationCard from '../../components/cards/ReservationCard'
import { IReservation } from '../../models/Reservation'
import { ScreenProps } from '../../navigation'
import CInput from '../../components/CInput'
import { Incubator } from 'react-native-ui-lib'
import { responsiveVertical, screen_height, screen_width } from '../../constants/Dimensions'
import FilterContent from './contents/FilterContent'
import { IFilter } from '../../models/Filter'
import moment from 'moment'
import firestore from "@react-native-firebase/firestore"

const HomeScreen: FC<ScreenProps> = (props) => {

  const [data, setData] = useState<IReservation[]>([])
  const [filteredData, setFilteredData] = useState<IReservation[]>([])
  const [search, setSearch] = useState<string>("")
  const [isVisible, setVisible] = useState(false)

  const [filter, setFilter] = useState({
    Colors: "",
    Locations: "",
    Times: "",
    Rates: "",
  })

  useEffect(() => {
    const subscriber = firestore().collection("reservations")
      .onSnapshot((query) => {
        let reservations : any = query.docs.map(reservation => reservation.data())
        setData(reservations)
        setFilteredData(reservations)
      })
    return subscriber
  }, [])

  useEffect(() => {
    if (search.length > 2) {
      setFilteredData(data.filter(x => x.bike.model.toLowerCase().includes(search.toLowerCase())))
    } else {
      setFilteredData(data)
    }
  }, [search])

  const onValueChange = (key: string, value: string) => {
    switch (key) {
      case "Colors":
        setFilter({ Colors: value, Locations: "", Times: "", Rates: "" })
        break
      case "Locations":
        setFilter({ Locations: value, Colors: "", Times: "", Rates: "" })
        break
      case "Times":
        setFilter({ Times: value, Colors: "", Locations: "", Rates: "" })
        break
      case "Rates":
        setFilter({ Rates: value, Times: "", Colors: "", Locations: "" })
        break
      default:
        break
    }
  }

  const onPressItem = (item: IReservation) => props.navigation.navigate("Information", { item })

  const onFilter = (filter: IFilter) => {
    const { Colors, Locations, Times, Rates } = filter
    if (Colors !== "") {
      setFilteredData(data.filter(item => item.bike.color === Colors))
    } else if (Locations !== "") {
      setFilteredData(data.filter(item => item.bike.location === Locations))
    } else if (Times !== "") {
      if (Times === "increasing") {
        setFilteredData(data.slice().sort((a, b) => moment(a.date).diff(moment(b.date))))
      } else {
        setFilteredData(data.slice().sort((a, b) => moment(b.date).diff(moment(a.date))))
      }
    } else if (Rates !== "") {
      if (Rates === "increasing") {
        setFilteredData(data.slice().sort(
          (a, b) => a.bike.ratingList.reduce((partialSum, x) => partialSum + x, 0) / a.bike.ratingList.length - b.bike.ratingList.reduce((partialSum, x) => partialSum + x, 0) / b.bike.ratingList.length
        ))
      } else {
        setFilteredData(data.slice().sort(
          (a, b) => b.bike.ratingList.reduce((partialSum, x) => partialSum + x, 0) / b.bike.ratingList.length - a.bike.ratingList.reduce((partialSum, x) => partialSum + x, 0) / a.bike.ratingList.length
        ))
      }

    } else {
      setFilteredData(data)
    }

    setVisible(false)

  }

  const onClear = () => {
    setFilter({
      Colors: "",
      Locations: "",
      Times: "",
      Rates: "",
    })
    setFilteredData(data)
    setVisible(false)
  }

  const onSearch = (value: string) => setSearch(value)

  return (

    <Container title='Home' hideBack onFilter={() => setVisible(!isVisible)}>
      <FlatList
        ListHeaderComponent={
          <View>
            <CInput
              containerStyle={{ marginBottom: responsiveVertical(16) }}
              placeholder="Search"
              value={search}
              onChangeText={onSearch}
            />
          </View>
        }
        contentContainerStyle={styles.list}
        style={{ flex: 1 }}
        data={filteredData}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        renderItem={({ item }) => <ReservationCard onPress={onPressItem} item={item} />}
      />
      <Incubator.Dialog
        visible={isVisible}
        containerStyle={{
          marginBottom: 0,
          minHeight: screen_height * .90,
          borderBottomLeftRadius: 0, borderBottomRightRadius: 0,
          width: screen_width
        }}
        onDismiss={() => setVisible(false)}
        bottom
      >
        <FilterContent
          filter={filter}
          onValueChange={onValueChange}
          onClear={onClear}
          onSave={onFilter}
        />
      </Incubator.Dialog>
    </Container>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  list: {
    padding: responsiveVertical(16),
  },
  seperator: {
    height: responsiveVertical(8)
  }
})