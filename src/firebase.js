import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var firebaseConfig = {
    apiKey: "AIzaSyCkBONhRptfzmtagfelPmb3X7SejGZ6zZY",
    authDomain: "react-slack-clone-52a6d.firebaseapp.com",
    databaseURL: "https://react-slack-clone-52a6d.firebaseio.com",
    projectId: "react-slack-clone-52a6d",
    storageBucket: "react-slack-clone-52a6d.appspot.com",
    messagingSenderId: "496709191918",
    appId: "1:496709191918:web:45127cce248f0036f7cbff"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;