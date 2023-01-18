import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import { RadioButton, RadioGroup } from 'react-native-ui-lib'
import CText from '../../../components/CText'
import { responsiveHorizontal, responsiveVertical, screen_height } from '../../../constants/Dimensions'
import { Colors } from '../../../constants/Colors'
import CButton from '../../../components/CButton'
import { ScrollView } from 'react-native'
import { IFilter } from '../../../models/Filter'



interface IFilterContent {
  filter: IFilter,
  onValueChange: (key: string, value: string) => void
  onClear: () => void
  onSave: (filter: IFilter) => void
}

const FilterContent: FC<IFilterContent> = (props) => {
  const { filter, onValueChange, onClear } = props
  const filters: any = {
    Colors: [
      { value: "#000000", label: "Black" },
      { value: "#0000FF", label: "Blue" },
      { value: "#FF0000", label: "Red" },
      { value: "#FFFF00", label: "Yellow" },
      { value: "#00FF00", label: "Green" },
    ],
    Locations: [
      { value: "Tuzla", label: "Tuzla" },
      { value: "Kadıköy", label: "Kadıköy" },
      { value: "Bağcılar", label: "Bağcılar" },
      { value: "Beşiktaş", label: "Beşiktaş" },
      { value: "Güngören", label: "Güngören" },
    ],
    Times: [
      { value: "increasing", label: "Increasing" },
      { value: "decreasing", label: "Decreasing" },
    ],
    Rates: [
      { value: "increasing", label: "Increasing" },
      { value: "decreasing", label: "Decreasing" },
    ]

  }

  const onSave = () => {
    props.onSave(filter)
  }
  return (
    <View style={{ paddingHorizontal: responsiveHorizontal(16), height: screen_height * .90, }}>
      <ScrollView>
        {Object.keys(filters).map((key) => {
          return (
            <RadioGroup initialValue={filter[key]} onValueChange={(value: string) => onValueChange(key, value)}>
              <CText style={{ marginVertical: responsiveVertical(10), fontWeight: "600" }}>
                {key}:
              </CText>
              <View>
                {Object.values(filters[key]).map((item: any) => {
                  return (
                    <RadioButton
                      key={item.value}
                      value={item.value}
                      label={item.label}
                      containerStyle={{ marginBottom: responsiveVertical(5) }}
                      color={Colors.orange}
                    />
                  )
                })}
              </View>
            </RadioGroup>
          )
        })}
      </ScrollView>
      <View style={{ marginTop: "auto", marginBottom: responsiveVertical(34), flexDirection: "row", justifyContent: "space-between" }}>
        <CButton onPress={onClear} style={{ flex: 1, height: responsiveVertical(30) }} labelStyle={{ fontSize: 15 }} text='Clear' />
        <View style={{ width: responsiveHorizontal(20) }} />
        <CButton onPress={onSave} style={{ flex: 1, height: responsiveVertical(30) }} labelStyle={{ fontSize: 15 }} text='Save' />
      </View>
    </View>
  )
}

export default FilterContent

const styles = StyleSheet.create({})