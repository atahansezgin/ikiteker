import firestore from '@react-native-firebase/firestore';

const reservationsCollection = firestore().collection("reservations")

const getAllReservation = () => {
  return reservationsCollection.get()
    .then(query => {
      return query.docs.map(x => x.data())
    })
}

const rentBike = (id: string, userId: string) => {
  return reservationsCollection
    .where("id", "==", id)
    .get()
    .then(query => {
      firestore().collection("reservations")
        .doc(query.docs[0].id)
        .set({
          ...query.docs[0].data(),
          isAvailable: false,
          userId
        })
    })
}

const cancelRent = (id: string) => {
  return reservationsCollection
    .where("id", "==", id)
    .get()
    .then(query => {
      let reservation = query.docs[0].data()
      reservationsCollection
        .doc(query.docs[0].id)
        .set({
          id: reservation.id,
          bike: reservation.bike,
          date: reservation.date,
          isAvailable: true
        })
    })
}

const ratingBike = (id: string, newRating: number) => {
  return reservationsCollection
    .where("id", "==", id)
    .get()
    .then(query => {
      let item = query.docs[0].data()
      let newRatingList = item.bike.ratingList
      newRatingList.push(newRating)

      reservationsCollection.doc(query.docs[0].id).set({
        ...item,
        bike: {
          ...item.bike,
          ratingList: newRatingList
        }
      })
    })
}

const editBikeInformation = (id: string, information: string) => {
  return reservationsCollection
    .where("id", "==", id)
    .get()
    .then(query => {
      let item = query.docs[0].data()
      reservationsCollection.doc(query.docs[0].id)
        .set({
          ...item,
          bike: {
            ...item.bike,
            information
          }
        })
    })
}

const resetDatabase = () => {
  reservationsCollection.get()
    .then(query => {
      query.forEach((doc, index) => {
        reservationsCollection.doc(doc.id).set({
          ...initialData[index]
        })
      })
    })
}

const initialData = [
  {
    id: "reservation1",
    date: "2022-01-23T12:00:00Z",
    bike: { "color": "#000000", "id": "bike8", "information": "Corelli Bisiklet", "isAvailable": true, "location": "Tuzla", "model": "Corelli", "ratingList": [5] },
    isAvailable: true
  },
  {
    id: "reservation2",
    date: "2022-01-24T12:00:00Z",
    bike: { "color": "#FFFF00", "id": "bike2", "information": "Bianchi Bisiklet", "isAvailable": true, "location": "Kadıköy", "model": "Bianchi", "ratingList": [4] },
    isAvailable: true
  },
  {
    id: "reservation3",
    date: "2022-01-24T14:00:00Z",
    bike: { "color": "#FF0000", "id": "bike1", "information": "Salcano bisiklet", "isAvailable": true, "location": "Bağcılar", "model": "Salcano", "ratingList": [5] },
    isAvailable: true
  },
  {
    id: "reservation4",
    date: "2022-01-25T12:00:00Z",
    bike: { "color": "#0000FF", "id": "bike5", "information": "Bisan Bisiklet", "isAvailable": true, "location": "Beşiktaş", "model": "Bisan", "ratingList": [3] },
    isAvailable: true
  },
  {
    id: "reservation5",
    date: "2022-01-26T12:00:00Z",
    bike: { "color": "#000000", "id": "bike7", "information": "Mosso Bisiklet", "isAvailable": true, "location": "Tuzla", "model": "Mosso", "ratingList": [1] },
    isAvailable: true
  },
  {
    id: "reservation6",
    date: "2022-01-26T15:00:00Z",
    bike: { "color": "#0000FF", "id": "bike6", "information": "Ümit Bisiklet", "isAvailable": true, "location": "Tuzla", "model": "Ümit", "ratingList": [1] },
    isAvailable: true
  },
  {
    id: "reservation7",
    date: "2022-01-27T12:00:00Z",
    bike: { "color": "#00FF00", "id": "bike3", "information": "Kron Bisiklet", "isAvailable": true, "location": "Güngören", "model": "Kron", "ratingList": [4] },
    isAvailable: true
  },
  {
    id: "reservation8",
    date: "2022-01-28T12:00:00Z",
    bike: { "color": "#0000FF", "id": "bike4", "information": "Carraro Bisiklet", "isAvailable": true, "location": "Beşiktaş", "model": "Carraro", "ratingList": [5] },
    isAvailable: true
  },
]


const controller = {
  getAllReservation,
  rentBike,
  cancelRent,
  ratingBike,
  editBikeInformation,
  resetDatabase
}

export default controller