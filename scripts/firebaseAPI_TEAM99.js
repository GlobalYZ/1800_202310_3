//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDo1HlTQD7FuDxjUKkClF_GhusBrqazvRg",
  authDomain: "comp1800-navi.firebaseapp.com",
  projectId: "comp1800-navi",
  storageBucket: "comp1800-navi.appspot.com",
  messagingSenderId: "11720730964",
  appId: "1:11720730964:web:2bfc4902968b5761c180c1"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);

// Initialize the database (db)
const db = firebase.firestore();