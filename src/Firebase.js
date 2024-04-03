import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyBQVprtPEF3qdfB5y7bAFzzJbQ4nM4RoZ8",
  authDomain: "dopler-c98d3.firebaseapp.com",
  databaseURL: "https://dopler-c98d3-default-rtdb.firebaseio.com",
  projectId: "dopler-c98d3",
  storageBucket: "dopler-c98d3.appspot.com",
  messagingSenderId: "1073151772426",
  appId: "1:1073151772426:web:cc2f52b5c4d9ca9f3d1cf3",
  measurementId: "G-Z1EPKSMYSQ"
};

  firebase.initializeApp(firebaseConfig);
  export const dataRef = firebase.database();
  export default firebase;