import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC1RiiJbAp3ngl_K6tz7axPPcmG0FuS8Rk",
  authDomain: "hej-casamento.firebaseapp.com",
  projectId: "hej-casamento",
  storageBucket: "hej-casamento.appspot.com",
  messagingSenderId: "381705522151",
  appId: "1:381705522151:web:1d84bf83361fb8bfd04b42"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();