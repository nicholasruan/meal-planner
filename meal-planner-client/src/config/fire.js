import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDH_6w9MeL7HlXjOZLbl-klrzNA1ulnl4g",
    authDomain: "meal-planner-164c3.firebaseapp.com",
    databaseURL: "https://meal-planner-164c3.firebaseio.com",
    projectId: "meal-planner-164c3",
    storageBucket: "meal-planner-164c3.appspot.com",
    messagingSenderId: "807392550909",
    appId: "1:807392550909:web:6fb32cfd2a2c9529464394"
  };
  
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire
