
var currentUser

function reportRoadCondition() {
    console.log("inside write review")
    let Title = document.getElementById("title").value;
    let RoadCondition = document.getElementById("roadCondition").value;
    let Image = document.getElementById("image").value;
    console.log(Title, RoadCondition, Image);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("reviews").add({
                        userID: userID,
                        title: Title,
                        roadConition: RoadCondition,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "thanks.html"; //new line added
                    })
                })
        } else {
            console.log("No user is signed in");
            window.location.href = 'review.html';
        }
    });
}