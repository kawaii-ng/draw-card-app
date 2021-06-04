import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCET7EfYB-j-ueF6ha8Y8_1yzMf1AymEnE",
    authDomain: "draw-card-project.firebaseapp.com",
    projectId: "draw-card-project",
    storageBucket: "draw-card-project.appspot.com",
    messagingSenderId: "305803372926",
    appId: "1:305803372926:web:6dcb37eabfbfd16f1feb2f"
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;

