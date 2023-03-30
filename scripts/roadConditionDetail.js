var city;
var postId;
var dislikes;
var likes;
var UpvoteActive;
var DownvoteActive;
function getScroll(){
    var item = document.getElementsByClassName('detail-image-container')[0];
    window.addEventListener('wheel', function (e) {

        if (e.deltaY > 0){
            item.scrollLeft += 30
        }else{
            item.scrollLeft -= 30;
        }
    });
}

function setup(){
    city = $.Request("city")
    postId = $.Request("postId")
    console.log(city + " " + postId)
    document.getElementsByClassName("voteIcon")[0].addEventListener("click", upvote)
    document.getElementsByClassName("voteIcon")[1].addEventListener("click", downvote)
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(postId).get().then(doc =>{
        console.log(doc.data())
        document.getElementsByClassName("detail-title")[0].innerHTML = doc.data().title
        document.getElementsByClassName("detail-description")[0].innerHTML = doc.data().description
        document.getElementsByClassName("detail-address")[0].innerHTML = '<span class="material-symbols-outlined" style="margin-right:3px;font-size:20px;">distance</span>' +doc.data().address
        document.getElementsByClassName("detail-likes")[0].innerHTML = doc.data().likes
        likes =  doc.data().likes
        document.getElementsByClassName("detail-dislikes")[0].innerHTML = doc.data().dislikes
        dislikes = doc.data().dislikes
        var images = doc.data().imageUrl
        for(var i=0; i<images.length;i++){
            var html = '<img class="detail-image" src="' + images[i] + '" alt="road conditions"/>'
            var htmlContent = document.getElementsByClassName("detail-image-container")[0].innerHTML
            console.log(htmlContent)
            $(".detail-image-container").html(htmlContent + html)

        }
    })
    checkVotable()

}

function checkVotable() {
    var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(postId).collection("voteRecords")
    checkUser.where("votedUser", "==", localStorage.getItem("uid")).get().then(doc => {
        if (doc.empty == false) {
            if (doc.docs[0].data().enableUpvote == false) {
                var elem = document.getElementsByClassName("voteIcon")[0]
                UpvoteActive = false
                elem.setAttribute("style", "color:#f8b943;")
            } else {
                var elem = document.getElementsByClassName("voteIcon")[0]
                UpvoteActive = true
                elem.setAttribute("style", "color:black;")
            }
            if (doc.docs[0].data().enableDownvote == false) {
                console.log(1)
                var elem = document.getElementsByClassName("voteIcon")[1]
                elem.setAttribute("style", "color:#f8b943;")
                DownvoteActive = false
            } else {
                var elem = document.getElementsByClassName("voteIcon")[1]
                DownvoteActive = true
                elem.setAttribute("style", "color:black;")
            }
        } else {
            //The user never upvote or downvotes
            console.log("no data found")
        }
        console.log("UpvoteActive" + UpvoteActive)
        console.log("DownvoteActive" + DownvoteActive)
    })
}


function countUpvote() {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(postId).update({
        likes: likes + 1

    }).then(() => {
        document.getElementsByClassName("upvotes")[0].innerHTML = likes + 1
        likes = likes + 1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[0]
    elem.setAttribute("style", "color:#f8b943;")
}

function disableUpvote() {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(postId).update({
        likes: likes - 1

    }).then(() => {
        document.getElementsByClassName("upvotes")[0].innerHTML = likes - 1
        likes = likes -1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[0]
    elem.setAttribute("style", "color:black;")
}

function disableDownVote() {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(postId).update({
        dislikes: dislikes - 1

    }).then(() => {
        document.getElementsByClassName("downvotes")[0].innerHTML = dislikes - 1
        dislikes = dislikes - 1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[1]
    elem.setAttribute("style", "color:black;")
}

function countDownVote() {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(postId).update({
        dislikes: dislikes + 1

    }).then(() => {
        document.getElementsByClassName("downvotes")[0].innerHTML = dislikes + 1
        dislikes = dislikes + 1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[1]
    // elem.removeEventListener("click", downvote)

    elem.setAttribute("style", "color:#f8b943;")
}



function upvote() {
    console.log(1)

    if(!localStorage.getItem("loginStatus")){
        console.log($('#guardContainerHolder').load('../components/navigationGuards.html'));
        document.getElementById("popup-back").setAttribute("onclick", "")
        document.getElementById("popup-back").addEventListener("click", closeLogin)
        
    }else{
         //update Enability
    var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(postId).collection("voteRecords")
    checkUser.where("votedUser", "==", localStorage.getItem("uid")).get().then(doc => {

        if (doc.docs.length == 0) {

            checkUser.add({
                enableDownvote: true,
                enableUpvote: false,
                votedUser: localStorage.getItem("uid")
            }).then(() => {
                countUpvote()
                UpvoteActive = false
            })

        } else {
            var voteId = doc.docs[0].id
            if (UpvoteActive == true) {

                checkUser.doc(voteId).update({
                    enableUpvote: false
                }).then(() => {
                    countUpvote()
                    UpvoteActive = false
                })
            } else {
                checkUser.doc(voteId).update({
                    enableUpvote: true
                }).then(() => {
                    disableUpvote()
                    UpvoteActive = true
                })

            }

        }
    })
    }
}

function downvote() {
    if(!localStorage.getItem("loginStatus")){
        console.log($('#guardContainerHolder').load('../components/navigationGuards.html'));
    }else{
        var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(city).doc(postId).collection("voteRecords")
    checkUser.where("votedUser", "==", localStorage.getItem("uid")).get().then(doc => {

        if (doc.docs.length == 0) {
            checkUser.add({
                enableDownvote: false,
                enableUpvote: true,
                votedUser: localStorage.getItem("uid")
            }).then(() => {
                countDownvote()
                DownvoteActive = false
            })
        } else {
            var voteId = doc.docs[0].id
           
            if (DownvoteActive == true) {

                checkUser.doc(voteId).update({
                    enableDownvote: false
                }).then(() => {
                    countDownVote()
                DownvoteActive = false

                })
            } else {
                checkUser.doc(voteId).update({
                    enableDownvote: true
                }).then(() => {
                    disableDownVote()
                    DownvoteActive = true
                })

            }

        }
    })
    }
}

getScroll()
setup()