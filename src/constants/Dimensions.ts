import { Dimensions } from "react-native";

const guidelineWidth = 375
const guidelineHeight = 812
export const { width: screen_width, height: screen_height } = Dimensions.get("window")

export function responsiveVertical(size: number) {
  return (screen_height / guidelineHeight) * size
}
export function responsiveHorizontal(size:number){
  return (screen_width / guidelineWidth) * size
}