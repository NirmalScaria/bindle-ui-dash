import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  "projectId": "bindle-ui",
  "appId": "1:111468518027:web:abb12a36ce0895bf86528e",
  "storageBucket": "bindle-ui.appspot.com",
  "apiKey": "AIzaSyCuyEHMSbWmUmj15wQw61o-uBXOSreVVmA",
  "authDomain": "bindle-ui.firebaseapp.com",
  "messagingSenderId": "111468518027"
}

export const firebaseApp = initializeApp(firebaseConfig);