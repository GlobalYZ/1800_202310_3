function populateRoadConditonList() {
    let roadConditionCardTemplate = document.getElementById("roadConditionCardTemplate");
    let roadConditionCardGroup = document.getElementById("roadConditionCardGroup");

    let params = new URL(window.location.href) //get the url from the searbar
    let roadConditionCardID = params.searchParams.get("uid")
    console.log(roadConditionCardID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("user").doc().collection("Richmond").doc().where("hikeDocID", "==", hikeID).get()
        .then(allReviews => {
            reviews = allReviews.docs;
            console.log(reviews);
            reviews.forEach(doc => {
                var title = doc.data().title; //gets the name field
                var level = doc.data().level; //gets the unique ID field
                var season = doc.data().season;
                var description = doc.data().description; //gets the length field
                var flooded = doc.data().flooded;
                var scrambled = doc.data().scrambled;
                var time = doc.data().timestamp.toDate();
                console.log(time)

                let reviewCard = hikeCardTemplate.content.cloneNode(true);
                reviewCard.querySelector('.title').innerHTML = title;     //equiv getElementByClassName
                reviewCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName
                reviewCard.querySelector('.level').innerHTML = `level: ${level}`;
                reviewCard.querySelector('.season').innerHTML = `season: ${season}`;
                reviewCard.querySelector('.scrambled').innerHTML = `scrambled: ${scrambled}`;  //equiv getElementByClassName
                reviewCard.querySelector('.flooded').innerHTML = `flooded: ${flooded}`;  //equiv getElementByClassName
                reviewCard.querySelector('.description').innerHTML = `Description: ${description}`;
                hikeCardGroup.appendChild(reviewCard);
            })
        })
}
populateRoadConditonList();