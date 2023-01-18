import { IReservation } from "./Reservation"

export interface IUser {
  id: string
  username: string
  password: string
  reservationList: IReservation[]
}