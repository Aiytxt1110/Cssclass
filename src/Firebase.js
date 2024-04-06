import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
apiKey: "AIzaSyAmLLrZbK32CU67XlbUdPBZrgrC-3scWgc",
authDomain: "bingsuly.firebaseapp.com",
projectId: "bingsuly",
storageBucket: "bingsuly.appspot.com",
messagingSenderId: "554902627010",
appId: "1:554902627010:web:d0441d5a6de5a5b26d915b",
measurementId: "G-EZHLGEX8P5"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default database;