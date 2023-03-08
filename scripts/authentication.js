// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

function getUser() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            localStorage.setItem("uid", user.uid)
            localStorage.setItem("userName", user.displayName)
            console.log("I am localStorage" + localStorage.getItem("uid"))
        } else {
            alert("something is wrong, please sign in again!")
        }
    });
}

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            // ------------------------------------------------------------------------------------------
            // The code below is modified from default snippet provided by the FB documentation.
            //
            // If the user is a "brand new" user, then create a new "user" in your own database.
            // Assign this user with the name and email provided.
            // Before this works, you must enable "Firestore" from the firebase console.
            // The Firestore rules must allow the user to write.
            // ------------------------------------------------------------------------------------------
            var user = authResult.user; // get the user object from the Firebase authentication database
            localStorage.setItem("loginStatus", true)
            getUser()
            if (authResult.additionalUserInfo.isNewUser) { // if new user
                db.collection("users").doc(user.uid).set({ // write to firestore. We are using the UID for the ID in users collection
                    name: user.displayName, // "users" collection
                    email: user.email, // with authenticated user's ID (user.uid)
                }).then(function () {
                    console.log("New user added to firestore");
                    
                    //window.location.assign("./navigationMap.html"); // re-direct to main.html after signup
                    
                    getUser()
                }).catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
            } else {
                return true;
            }
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: './navigationMap.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);
