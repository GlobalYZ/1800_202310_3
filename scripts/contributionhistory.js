function populateRoadConditonList() {
    let roadConditionCardTemplate = document.getElementById("roadConditionCardTemplate");
    let roadConditionCardGroup = document.getElementById("roadConditionCardGroup");
    var userID = "";

    if (localStorage.getItem("uid") == null) {
        window.location.href = "../index.html";
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            userID = user.uid;
            console.log(userID);
            console.log(user.email);

            db.collection("users").doc(userID).collection("roadConditionList").get().then(allRoadConditions => {
                roadConditions = allRoadConditions.docs;
                console.log(roadConditions);
                roadConditions.forEach(doc => {

                    var img = doc.data().imgUrl; //gets the name field
                    console.log(img[0]);
                    var title = doc.data().title; //gets the name field
                    var type = doc.data().type; //gets the type field
                    var upvotes = doc.data().likes; //gets the amount of likes
                    var downvotes = doc.data().dislikes; //gets the amount of dislikes
                    var city = doc.data().city;
                    var address = doc.data().address;
                    var latitude = doc.data().latitude;
                    var longitude = doc.data().longitude;
                    var description = doc.data().description; //gets the description field
                    // var time = doc.data().timestamp.toDate();
                    console.log(title);

                    let roadConditionCard = roadConditionCardTemplate.content.cloneNode(true);
                    let roadConditionCardImage = roadConditionCard.querySelector('.photo');
                    roadConditionCardImage.setAttribute('src', img);
                    roadConditionCard.querySelector('.titleHeading').innerHTML = title;     //equiv getElementByClassName
                    roadConditionCard.querySelector('.type').innerHTML = `Type: ${type}`;
                    roadConditionCard.querySelector('.upvotes').innerHTML = upvotes;
                    roadConditionCard.querySelector('.downvotes').innerHTML = downvotes;
                    roadConditionCard.querySelector('.city').innerHTML = city;
                    roadConditionCard.querySelector('.address').innerHTML = address;
                    roadConditionCard.querySelector('.latitude').innerHTML = `Latitude: ${latitude}`;
                    roadConditionCard.querySelector('.longitude').innerHTML = `Longitude: ${longitude}`;
                    roadConditionCard.querySelector('.description').innerHTML = `Description: ${description}`;
                    // reviewCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName

                    roadConditionCardGroup.appendChild(roadConditionCard);
                })

            })


        };
    })

    document.getElementById("logout").onclick = () => { logout() };
    
};

populateRoadConditonList();

function logout() {
    $('#logOutModal').modal('toggle')

    document.getElementById('logOutConfirm').onclick = function() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Sign-out tried.");
            localStorage.removeItem("uid");
            localStorage.removeItem("userName");
            localStorage.removeItem("loginStatus");
            console.log(localStorage.getItem("uid"));
            console.log("Sign-out successful.");        
            window.location.href = "../index.html";
        }).catch(function (error) {
            // An error happened.
            console.log("An error happened.");
        });
}}

function changeCities() {
    let type = $('#cities').val()
    const uid = localStorage.getItem("uid")

    db.collection("users").doc(uid).update({
        homeCity: type
    })
}