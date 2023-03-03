//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyBgKnD197GPm-HuBri1bppIvLhsvRRmTKo",
authDomain: "comp1800-demo-use-54720.firebaseapp.com",
projectId: "comp1800-demo-use-54720",
storageBucket: "comp1800-demo-use-54720.appspot.com",
messagingSenderId: "984921563717",
appId: "1:984921563717:web:3d3c105ba841da4756b92c"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);

// Initialize the database (db)
const db = firebase.firestore();