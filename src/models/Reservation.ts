import { IBike } from "./Bike"

export interface IReservation {
  id: string
  bike: IBike
  date: string
  isAvailable: boolean
  userId?:string
}