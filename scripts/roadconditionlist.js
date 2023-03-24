// var UpvoteActive;
// var DownvoteActive;

function populateRoadConditionList() {
    let roadConditionCardTemplate = document.getElementById("roadConditionCardTemplate");
    let roadConditionCardGroup = document.getElementById("roadConditionCardGroup");

    let userId = localStorage.getItem("uid");
    console.log(userId);
    db.collection("users").doc(userId).get().then(doc => {
        homeCity = doc.data().homeCity;
        console.log(homeCity);

        db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(homeCity).get().then(allRoadConditions => {
            roadConditions = allRoadConditions.docs;
            console.log(roadConditions);
            let cardCounter = 0;

            roadConditions.forEach(doc => {

                console.log(doc.id);
                console.log(cardCounter);

                var img = doc.data().imageUrl; //gets the name field
                var title = doc.data().title; //gets the name field
                var type = doc.data().type; //gets the type field
                var upvotes = doc.data().likes; //gets the amount of likes
                var downvotes = doc.data().dislikes; //gets the amount of dislikes
                // var city = doc.data().city;
                var address = doc.data().address;
                // var latitude = doc.data().latitude;
                // var longitude = doc.data().longitude;
                var description = doc.data().description; //gets the description field
                // var time = doc.data().timestamp.toDate();
                console.log(title)

                let roadConditionCard = roadConditionCardTemplate.content.cloneNode(true);
                let roadConditionCardImage = roadConditionCard.querySelector('.photo');
                roadConditionCardImage.setAttribute('src', img[0]);
                roadConditionCard.querySelector('.titleHeading').innerHTML = title;     //equiv getElementByClassName
                roadConditionCard.querySelector('.type').innerHTML = `Type: ${type}`;
                roadConditionCard.querySelector('.upvotes').innerHTML = upvotes;
                roadConditionCard.querySelector('.upvoteIcon').setAttribute("type", `${cardCounter}`)
                roadConditionCard.querySelector('.upvoteIcon').onclick = () => upvote(doc.id, homeCity);
                roadConditionCard.querySelector('.downvotes').innerHTML = downvotes;
                roadConditionCard.querySelector('.downvoteIcon').setAttribute("type", `${cardCounter}`)
                roadConditionCard.querySelector('.downvoteIcon').onclick = () => downvote(doc.id, homeCity);
                // roadConditionCard.querySelector('.city').innerHTML = city;
                roadConditionCard.querySelector('.address').innerHTML = address;
                // roadConditionCard.querySelector('.latitude').innerHTML = `Latitude: ${latitude}`;
                // roadConditionCard.querySelector('.longitude').innerHTML = `Longitude: ${longitude}`;
                roadConditionCard.querySelector('.description').innerHTML = `Description: ${description}`;
                // reviewCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName

                checkVotable(doc.id, homeCity, cardCounter);

                roadConditionCardGroup.appendChild(roadConditionCard);
                cardCounter++;
            })
        })
    })
}
populateRoadConditionList();

function checkVotable(docId, homeCity, cardCounter) {
    var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(homeCity).doc(docId).collection("voteRecords")
    checkUser.where("votedUser", "==", localStorage.getItem("uid")).get().then(doc => {
        // console.log(doc.docs[0].data())
        if (doc.empty == false) {
            //The user has upvoted or downvoted before
            if (doc.docs[0].data().enableUpvote == false) {
                var elem = document.getElementsByClassName("upvoteIcon")[cardCounter]
                UpvoteActive = false
                elem.setAttribute("style", "color:#f8b943;")

            } else {
                UpvoteActive = true
            }
            if (doc.docs[0].data().enableDownvote == false) {
                var elem = document.getElementsByClassName("downvoteIcon")[cardCounter]
                elem.setAttribute("style", "color:#f8b943;")
                DownvoteActive = false
            } else {
                DownvoteActive = true
            }
        } else {
            //The user never upvote or downvotes
            console.log("no data found")
        }
        console.log("UpvoteActive" + UpvoteActive)
        console.log("DownvoteActive" + DownvoteActive)

        // console.log(doc.data().enableDownvote)
    })
    // if(checkUser){
    //     checkUser.get().then(doc => {
    //         console.log(doc.data())
    //         // console.log(doc.data().enableDownvote)
    //     })
    // }


}

function countUpvote(docId, votes, homeCity, cardCounter) {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(homeCity).doc(docId).update({
        likes: votes

    }).then(() => {
        document.getElementsByClassName("upvotes")[cardCounter].innerHTML = votes
        // votes = votes + 1

    })

    // render html
    var elem = document.getElementsByClassName("upvoteIcon")[cardCounter]
    elem.setAttribute("style", "color:#f8b943;")
}

function disableUpvote(docId, votes, homeCity, cardCounter) {
    console.log("you disable the upvote with", votes)
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(homeCity).doc(docId).update({
        likes: votes

    }).then(() => {
        document.getElementsByClassName("upvotes")[cardCounter].innerHTML = votes - 1
        console.log("you disable the upvote and passed data to firebase with", votes)

    })

    // render html
    var elem = document.getElementsByClassName("upvoteIcon")[cardCounter]
    console.log(elem)
    elem.setAttribute("style", "color:black;")
}

function disableDownVote(docId, votes, homeCity, cardCounter) {
    console.log("you disabled the downvote")
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(homeCity).doc(docId).update({
        dislikes: votes

    }).then(() => {
        document.getElementsByClassName("downvotes")[cardCounter].innerHTML = votes - 1

    })

    // render html
    var elem = document.getElementsByClassName("downvoteIcon")[cardCounter]
    elem.setAttribute("style", "color:black;")
}

function countDownVote(docId, votes, homeCity, cardCounter) {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(homeCity).doc(docId).update({
        dislikes: votes + 1

    }).then(() => {
        document.getElementsByClassName("downvotes")[cardCounter].innerHTML = votes + 1
        // votes = votes + 1

    })

    // render html
    var elem = document.getElementsByClassName("downvoteIcon")[cardCounter]
    elem.setAttribute("style", "color:#f8b943;")
}


function upvote(docId, homeCity) {
    // console.log(docId, votes, homeCity)
    cardCounter = event.target.getAttribute("type")
    console.log(cardCounter)


    if (!localStorage.getItem("loginStatus")) {
        console.log($('#guardContainerHolder').load('../components/navigationGuards.html'));
        document.getElementById("popup-back").setAttribute("onclick", "")
        document.getElementById("popup-back").addEventListener("click", closeLogin)

    } else {
        //update Enability
        var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(homeCity).doc(docId)
        // .collection("voteRecords")
        checkUser.get().then(doc => {
            var votes = doc.data().likes

            checkUser.collection("voteRecords").where("votedUser", "==", localStorage.getItem("uid")).get().then(doc => {

                if (doc.docs.length == 0) {

                    checkUser.collection("voteRecords").add({
                        enableDownvote: true,
                        enableUpvote: false,
                        votedUser: localStorage.getItem("uid")
                    }).then(() => {
                        countUpvote(docId, votes + 1, homeCity, cardCounter)
                        UpvoteActive = false
                    })

                } else {
                    var voteId = doc.docs[0].id
                    var UpvoteActive = doc.docs[0].data().enableUpvote
                    if (UpvoteActive == true) {

                        checkUser.collection("voteRecords").doc(voteId).update({
                            enableUpvote: false
                        }).then(() => {
                            countUpvote(docId, votes, homeCity, cardCounter)
                            UpvoteActive = false
                        })
                    } else {
                        checkUser.collection("voteRecords").doc(voteId).update({
                            enableUpvote: true
                        }).then(() => {
                            disableUpvote(docId, votes, homeCity, cardCounter)
                            UpvoteActive = true
                        })
                    }
                }
            })
        })

    }
}

function downvote(docId, homeCity) {
    // console.log(docId, votes, homeCity)
    cardCounter = event.target.getAttribute("type")
    console.log(cardCounter)

    if (!localStorage.getItem("loginStatus")) {
        console.log($('#guardContainerHolder').load('../components/navigationGuards.html'));
    } else {
        var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(homeCity).doc(docId)
        checkUser.get().then(doc => {
            var votes = doc.data().dislikes

            checkUser.collection("voteRecords").where("votedUser", "==", localStorage.getItem("uid")).get().then(doc => {

                if (doc.docs.length == 0) {
                    checkUser.collection("voteRecords").add({
                        enableDownvote: false,
                        enableUpvote: true,
                        votedUser: localStorage.getItem("uid")
                    }).then(() => {
                        countDownvote(docId, votes, homeCity, cardCounter)
                        DownvoteActive = false
                    })
                } else {
                    var voteId = doc.docs[0].id
                    var DownvoteActive = doc.docs[0].data().enableDownvote
    
                    if (DownvoteActive == true) {
    
                        checkUser.collection("voteRecords").doc(voteId).update({
                            enableDownvote: false
                        }).then(() => {
                            countDownVote(docId, votes, homeCity, cardCounter)
                            DownvoteActive = false
    
                        })
                    } else {
                        checkUser.collection("voteRecords").doc(voteId).update({
                            enableDownvote: true
                        }).then(() => {
                            disableDownVote(docId, votes, homeCity, cardCounter)
                            DownvoteActive = true
                        })
                    }
                }
            })
        })
        
    }
}

