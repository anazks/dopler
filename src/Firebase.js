import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
const firebaseConfig = {
  apiKey: "AIzaSyBAvB6YFspJSOUExXnUQYNpIoEez1FlXz4",
  authDomain: "dopler-d300a.firebaseapp.com",
  databaseURL: "https://dopler-d300a-default-rtdb.firebaseio.com",
  projectId: "dopler-d300a",
  storageBucket: "dopler-d300a.appspot.com",
  messagingSenderId: "191461933764",
  appId: "1:191461933764:web:30d0f25780f7df832f3f91",
  measurementId: "G-WMVPJPD8E5"
};

  firebase.initializeApp(firebaseConfig);
  export const dataRef = firebase.database();
  export default firebase;