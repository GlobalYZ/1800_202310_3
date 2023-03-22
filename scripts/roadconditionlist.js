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
                var city = doc.data().city;
                var address = doc.data().address;
                var latitude = doc.data().latitude;
                var longitude = doc.data().longitude;
                var description = doc.data().description; //gets the description field
                // var time = doc.data().timestamp.toDate();
                console.log(title)

                let roadConditionCard = roadConditionCardTemplate.content.cloneNode(true);
                let roadConditionCardImage = roadConditionCard.querySelector('.photo');
                roadConditionCardImage.setAttribute('src', img[0]);
                roadConditionCard.querySelector('.titleHeading').innerHTML = title;     //equiv getElementByClassName
                roadConditionCard.querySelector('.type').innerHTML = `Type: ${type}`;
                roadConditionCard.querySelector('.upvotes').innerHTML = upvotes;
                roadConditionCard.querySelector('.upvoteIcon').onclick = () => upvote(doc.id, upvotes, homeCity, cardCounter);
                roadConditionCard.querySelector('.downvotes').innerHTML = downvotes;
                roadConditionCard.querySelector('.downvoteIcon').onclick = () => downvote(doc.id, downvotes, homeCity, cardCounter);
                roadConditionCard.querySelector('.city').innerHTML = city;
                roadConditionCard.querySelector('.address').innerHTML = address;
                roadConditionCard.querySelector('.latitude').innerHTML = `Latitude: ${latitude}`;
                roadConditionCard.querySelector('.longitude').innerHTML = `Longitude: ${longitude}`;
                roadConditionCard.querySelector('.description').innerHTML = `Description: ${description}`;
                // reviewCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName

                // checkVotable(doc.id)

                roadConditionCardGroup.appendChild(roadConditionCard);
                cardCounter++;
            })
        })
    })
}
populateRoadConditionList();

function checkVotable(docId) {
    var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection("Richmond").doc(docId).collection("voteRecords")
    checkUser.where("votedUser", "==", localStorage.getItem("uid")).get().then(doc => {
        console.log(doc.docs[0].data())
        if (doc.empty == false) {
            //The user has upvoted or downvoted before
            if (doc.docs[0].data().enableUpvote == false) {
                var elem = document.getElementsByClassName("voteIcon")[0]
                UpvoteActive = false
                elem.setAttribute("style", "color:#f8b943;")

            } else {
                UpvoteActive = true
            }
            if (doc.docs[0].data().enableDownvote == false) {
                console.log(1)
                var elem = document.getElementsByClassName("voteIcon")[1]
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

function countUpvote(docId, votes) {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection("Richmond").doc(docId).update({
        likes: votes + 1

    }).then(() => {
        document.getElementsByClassName("upvotes")[0].innerHTML = votes + 1
        votes = votes + 1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[0]
    elem.setAttribute("style", "color:#f8b943;")
}

function disableUpvote(docId, votes) {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(docId).doc(votes).update({
        likes: votes - 1

    }).then(() => {
        document.getElementsByClassName("upvotes")[0].innerHTML = votes - 1
        votes = votes - 1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[0]
    elem.setAttribute("style", "color:black;")
}

function disableDownVote(docId, votes) {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection("Richmond").doc(docId).update({
        dislikes: votes - 1

    }).then(() => {
        document.getElementsByClassName("downvotes")[0].innerHTML = votes - 1
        votes = votes - 1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[1]
    elem.setAttribute("style", "color:black;")
}

function countDownVote(docId, votes) {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection("Richmond").doc(docId).update({
        dislikes: votes + 1

    }).then(() => {
        document.getElementsByClassName("downvotes")[0].innerHTML = votes + 1
        votes = votes + 1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[1]
    // elem.removeEventListener("click", downvote)

    elem.setAttribute("style", "color:#f8b943;")
}


function upvote(docId, votes) {
    console.log(docId, votes)


    if (!localStorage.getItem("loginStatus")) {
        console.log($('#guardContainerHolder').load('../components/navigationGuards.html'));
        document.getElementById("popup-back").setAttribute("onclick", "")
        document.getElementById("popup-back").addEventListener("click", closeLogin)

    } else {
        //update Enability
        var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection("Richmond").doc(docId).collection("voteRecords")
        checkUser.where("votedUser", "==", localStorage.getItem("uid")).get().then(doc => {

            if (doc.docs.length == 0) {

                checkUser.add({
                    enableDownvote: true,
                    enableUpvote: false,
                    votedUser: localStorage.getItem("uid")
                }).then(() => {
                    countUpvote(docId, votes)
                    UpvoteActive = false
                })

            } else {
                var voteId = doc.docs[0].id
                if (UpvoteActive == true) {

                    checkUser.doc(voteId).update({
                        enableUpvote: false
                    }).then(() => {
                        countUpvote(docId, votes)
                        UpvoteActive = false
                    })
                } else {
                    checkUser.doc(voteId).update({
                        enableUpvote: true
                    }).then(() => {
                        disableUpvote(docId, votes)
                        UpvoteActive = true
                    })
                }
            }
        })
    }
}

function downvote(docId, votes) {
    if (!localStorage.getItem("loginStatus")) {
        console.log($('#guardContainerHolder').load('../components/navigationGuards.html'));
    } else {
        var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection("Richmond").doc(docId).collection("voteRecords")
        checkUser.where("votedUser", "==", localStorage.getItem("uid")).get().then(doc => {

            if (doc.docs.length == 0) {
                checkUser.add({
                    enableDownvote: false,
                    enableUpvote: true,
                    votedUser: localStorage.getItem("uid")
                }).then(() => {
                    countDownvote(docId, votes)
                    DownvoteActive = false
                })
            } else {
                var voteId = doc.docs[0].id

                if (DownvoteActive == true) {

                    checkUser.doc(voteId).update({
                        enableDownvote: false
                    }).then(() => {
                        countDownVote(docId, votes)
                        DownvoteActive = false

                    })
                } else {
                    checkUser.doc(voteId).update({
                        enableDownvote: true
                    }).then(() => {
                        disableDownVote(docId, votes)
                        DownvoteActive = true
                    })
                }
            }
        })
    }
}

