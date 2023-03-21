function populateRoadConditonList() {
    let roadConditionCardTemplate = document.getElementById("roadConditionCardTemplate");
    let roadConditionCardGroup = document.getElementById("roadConditionCardGroup");
    var userID = "";

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
                    // roadConditionCardImage.setAttribute('src', img);
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

}
populateRoadConditonList();