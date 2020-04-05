import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCknOcuEsP8GrztvLoDqO0f8XpEpS9c9hU",
    authDomain: "react-ant-managment.firebaseapp.com",
    databaseURL: "https://react-ant-managment.firebaseio.com",
    projectId: "react-ant-managment",
    storageBucket: "react-ant-managment.appspot.com",
    messagingSenderId: "982515784001",
    appId: "1:982515784001:web:11008e60bc89b5f59669c0",
    measurementId: "G-NRJH6P410P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();

export {
    storage, firebase
}