var currentdocId = "";
var currentCity = "";
startLoading()

function findImageUrl(type){
    console.log(type)
    if(type == "Road Closure" || type == "Construction"){
        return "../images/construction_icon.png"
    }else if(type == "Icy Road"){
        return "../images/snow_icon.png"
    }else if(type == "Bush Fire"){
        return "../images/bushfire_icon.png"
    }else if(type == "Accident"){
        return "../images/accident_icon.png"
    }else if(type == "Traffic Jam"){
        return "../images/traffic_icon.png"
    }
}

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

            // db.collection("users").doc(userId).get().then(doc => {
            //     homeCity = doc.data().homeCity;
            //     console.log(homeCity);


            db.collection("users").doc(userID).get().then(userInfo => {

                homeCity = userInfo.data().homeCity;
                enableIcon = userInfo.data().enableMapIcons;
                console.log(`This is mapIcons ${enableIcon}`);
                // Map icons enabled status
                if (enableIcon == true) {
                    $('.mapIcon').attr('checked', true);
                } else {
                    $('.mapIcon').attr('checked', false);
                }

                // Set home city
                let formSelected = $(`#${homeCity}`) //.setAttribute('selected', 'True');
                formSelected.attr('selected', 'True');



                roadConditions = userInfo.data().roadConditionIds;
                if (roadConditions == 0) {
                    finishLoading();
                }
                console.log(roadConditions);
                roadConditions.forEach(post => {

                    let allCities = ["Burnaby", "New Westminster", "North Vancouver", "Richmond", "Surrey", "Vancouver", "West Vancouver"];

                    allCities.forEach(city => {
                        db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(post).get().then(doc => {
                            if(doc.data()){
                                var img = doc.data().imageUrl; //gets the image field
                                var title = doc.data().title; //gets the name field
                                var type = doc.data().type; //gets the type field
                                var upvotes = doc.data().likes; //gets the amount of likes
                                var downvotes = doc.data().dislikes; //gets the amount of dislikes
                                var city = doc.data().city;
                                var address = doc.data().address;
                                var description = doc.data().description; //gets the description field

                                let roadConditionCard = roadConditionCardTemplate.content.cloneNode(true);
                                let roadConditionCardImage = roadConditionCard.querySelector('.photo');
                                roadConditionCardImage.setAttribute('src', img[0]);
                                roadConditionCard.querySelector('.titleHeading').innerHTML = title;     //equiv getElementByClassName
                                // roadConditionCard.querySelector('.type').innerHTML = `Type: ${type}`;
                                var icon = findImageUrl(type)
                                roadConditionCard.querySelector('.card_img').setAttribute("src", icon)                    
                                roadConditionCard.querySelector('.upvotes').innerHTML = upvotes;
                                roadConditionCard.querySelector('.downvotes').innerHTML = downvotes;
                                // roadConditionCard.querySelector('.city').innerHTML = city;
                                roadConditionCard.querySelector('.address').innerHTML = address;
                                roadConditionCard.querySelector('.description').innerHTML = `${description}`;
                                roadConditionCard.querySelector('.editPost').onclick = () => editPost(doc.id, city);
                                roadConditionCard.querySelector('.deletePost').onclick = () => deletePost(doc.id, city);
                                roadConditionCard.querySelector('.post').onclick = () => jumpToDetail(doc.id, city);

                                roadConditionCardGroup.appendChild(roadConditionCard);
                            }
                        })
                        if (city == "West Vancouver") {
                            finishLoading()
                        }
                    }
                    )

                })

            })


        };
    })

    document.getElementById("logout").onclick = () => { logout() };

};

populateRoadConditonList();

function logout() {
    $('#logOutModal').modal('toggle')

    document.getElementById('logOutConfirm').onclick = function () {
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
    }
}

function editPost(docId, city) {
    console.log("edit post clicked")
    $('#editModal').modal('toggle')

    currentdocId = docId;
    currentCity = city;

    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(docId).get().then(doc => {

        var title = doc.data().title; //gets the name field
        var description = doc.data().description; //gets the description field

        document.getElementById("titleForm").value = title;
        document.getElementById("descriptionForm").value = description;


    })
}

function submitEdit() {
    console.log("submit edit clicked")

    let docId = currentdocId;
    let city = currentCity;

    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(docId).get().then(doc => {
        new_title = document.getElementById("titleForm").value
        new_description = document.getElementById("descriptionForm").value

        console.log(new_title)
        console.log(new_description)

        db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(docId).update({
            title: new_title,
            description: new_description
        }).then(() => {
            //reload page
            window.location.reload();
        })
    })
}

function deletePost(docId, city) {
    console.log("delete post clicked")
    $('#deleteModal').modal('toggle')

    currentdocId = docId;
    currentCity = city;

}

function confirmDelete() {

    let docId = currentdocId;
    let city = currentCity;

    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(docId).collection("voteRecords").get().then(voteRecord => {
        voteRecord.docs.forEach(doc => {
            db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(docId).collection("voteRecords").doc(doc.id).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        })
    })
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(docId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

    window.location.reload();

}


function changeCities() {
    let type = $('#cities').val()
    const uid = localStorage.getItem("uid")

    db.collection("users").doc(uid).update({
        homeCity: type
    })
}

function mapIconSwitch() {
    const userId = localStorage.getItem("uid")

    db.collection("users").doc(userId).get().then(userInfo => {

        let enableIcon = userInfo.data().enableMapIcons;

        if (enableIcon == true) {
            db.collection("users").doc(userId).update({
                enableMapIcons: false
            })
        } else {
            db.collection("users").doc(userId).update({
                enableMapIcons: true
            })
        }
    })
}


function jumpToDetail(docId, city) {
    let url = $.UrlUpdateParams("./roadconditiondetail.html", "postId", docId);
    let new_url = $.UrlUpdateParams(url, "city", city);
    console.log(new_url)
    window.location.href = new_url
}

function startLoading() {
    var loadingElem = document.getElementById("loadingHolder");
    loadingElem.setAttribute("style", "display:flex;")
}

function finishLoading() {
    var loadingElem = document.getElementById("loadingHolder");
    loadingElem.setAttribute("style", "display:none;")
}