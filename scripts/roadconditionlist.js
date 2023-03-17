function populateRoadConditionList() {
    let roadConditionCardTemplate = document.getElementById("roadConditionCardTemplate");
    let roadConditionCardGroup = document.getElementById("roadConditionCardGroup");

    let params = new URL(window.location.href) //get the url from the searbar
    let roadConditionCardID = params.searchParams.get("uid")
    console.log(roadConditionCardID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection("Richmond").get().then(allRoadConditions => {
        roadConditions = allRoadConditions.docs;
        console.log(roadConditions);
        roadConditions.forEach(doc => {

            // <p class="city"></p>
            // <p class="address"></p>
            // <p class="latitude"></p>
            // <p class="longitude"></p>
            // <p class="type"></p>
            // <p class="description"></p>

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
            console.log(title)

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
}
populateRoadConditionList();