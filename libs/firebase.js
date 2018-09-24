import * as firebase from "firebase"

const config = {
  apiKey: "AIzaSyAU7bBuxxiPQD7e_ZDQSzy50kLocZjQ2Fg",
  authDomain: "papaparking-c73dd.firebaseapp.com",
  databaseURL: "https://papaparking-c73dd.firebaseio.com",
  projectId: "papaparking-c73dd",
  storageBucket: "papaparking-c73dd.appspot.com",
  messagingSenderId: "667123949860"
}

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();