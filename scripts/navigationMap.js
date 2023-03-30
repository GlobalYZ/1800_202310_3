
// 1. before the research, show default location markers

var map;
var addressObj = new Object();
var markers = [];
var currentMarker;
var UpvoteActive;
var DownvoteActive;
var location_1 = new Object();
var location_2 = new Object();

console.log(localStorage.getItem("uid"))
console.log(localStorage.getItem("userName"))
console.log(localStorage.getItem("loginStatus"))


// var locations = {
//     location1:{
//         address:"",
//         latitude:"",
//         longitude:"",
//         city:""
//     },
//     location2:{
//         address:"",
//         latitude:"",
//         longitude:"",
//         city:""
//     }
// };
var num = 111;

function setupGeneral() {
    var h = window.innerHeight;
    var elementContainer = document.getElementById('map')
    elementContainer.setAttribute('style', 'height:' + (
        h - 56
    ) + 'px;margin-top:0;z-index:1;')
    num = 222
}





function requestGaocoding(address, identifier) {
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        type: "get",
        data: {
            address: address, // good enough do not need rearrange data
            key: "AIzaSyAkhygJBngZRdSBpNQQHkIf7OU99ioNjkg"
        },
        success: function (res) {
            console.log(res)
            if (res.status == "OK") {
                console.log(res.results[0])
                if(identifier == 1){
                    console.log(res.results[0].formatted_address)
                    let address = res.results[0].formatted_address
                    console.log(window.location1)
                    window.location_1.address = res.results[0].formatted_address
                    window.location_1.latitude = res.results[0].geometry.location.lat
                    window.location_1.longitude = res.results[0].geometry.location.lng
                    window.location_1.city = address.substring(address.indexOf(", ") + 1, address.indexOf(", BC")).replace(/\s*/g, "");
                }else{
                    let address = res.results[0].formatted_address
                    window.location_2.address = res.results[0].formatted_address
                    window.location_2.latitude = res.results[0].geometry.location.lat
                    window.location_2.longitude = res.results[0].geometry.location.lng
                    window.location_2.city = address.substring(address.indexOf(", ") + 1, address.indexOf(", BC")).replace(/\s*/g, "");
                    setMultiMap()
                }
                
            } else {
                alert("Address is not matched, please edit your input!")
            }
        },
        error: function (err) {
            alert(err)
        }
    })
}

function setMap(currentAddress) {
    if (currentAddress == false) {
        currentAddress = {
            latitude: 49.282730,
            longitude: -123.120735
        }
        addressObj.city = 'Vancouver'
    }

    let config = {
        minZoom: 7,
        maxZoom: 18
    };
    const zoom = 15;

    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection('Vancouver').get().then(list => {
        list.forEach(doc => {
            var marker = new Object();
            marker.title = doc.data().title
            marker.address = doc.data().address
            marker.description = doc.data().description
            marker.likes = doc.data().likes
            marker.dislikes = doc.data().dislikes
            marker.type = doc.data().type
            marker.latitude = doc.data().latitude
            marker.longitude = doc.data().longitude
            marker.postId = doc.id
            markers.push(marker)
        })
        window.map = L.map("map", config).setView([
            currentAddress.latitude, currentAddress.longitude
        ], zoom);
    
    

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    
        // add current location as primary marker
        marker = new L.marker([currentAddress.latitude, currentAddress.longitude]).addTo(map);
        addMarkers(markers)

    })

}


function addMarkers(markers) {
    console.log(markers)

    for (var i = 0; i < markers.length; i++) {
        var iconUrl = ""
        switch (markers[i].type) {
            case "Road Closure": iconUrl = "../images/construction&road_closure.png"
                break;
            case "Icy Road": iconUrl = "../images/ice_road.png"
                break;
            case "Bush Fire": iconUrl = "../images/bushfire.png"
                break;
            case "Accident":
                iconUrl = "../images/car_accident.png"
                break;
            case "Traffic Jam":
                iconUrl = "../images/traffic.png";
                break;
            case "Construction":
                iconUrl = "../images/construction&road_closure.png";
                break;
            case "Landslide":
                iconUrl = "../images/landslide.png"

        }

        var Icon = new L.Icon({
            iconUrl: iconUrl,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [
                50, 50
            ],
            iconAnchor: [
                12, 41
            ],
            popupAnchor: [
                1, -34
            ],
            shadowSize: [41, 41]
        });
        console.log(Icon)

        var marker = L.marker(new L.LatLng(markers[i].latitude, markers[i].longitude), { icon: Icon }).addTo(map).on('click', popup);

    }

}





function setMultiMap() {
    console.log(location_1)
    console.log(location_2)
    window.map = L.map('map');

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);


    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(location_1.city).get().then(list => {
        list.forEach(doc => {
            var marker = new Object();
            marker.title = doc.data().title
            marker.address = doc.data().address
            marker.description = doc.data().description
            marker.likes = doc.data().likes
            marker.dislikes = doc.data().dislikes
            marker.type = doc.data().type
            marker.latitude = doc.data().latitude
            marker.longitude = doc.data().longitude
            marker.postId = doc.id
            markers.push(marker)
        })
        db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(location_2.city).get().then(list => {
            list.forEach(doc => {
                var marker = new Object();
                marker.title = doc.data().title
                marker.address = doc.data().address
                marker.description = doc.data().description
                marker.likes = doc.data().likes
                marker.dislikes = doc.data().dislikes
                marker.type = doc.data().type
                marker.latitude = doc.data().latitude
                marker.longitude = doc.data().longitude
                marker.postId = doc.id
                markers.push(marker)
            })
            console.log(markers)

            L.Routing.control({
                waypoints: [
                    L.latLng(location_1.latitude, location_1.longitude),
                    L.latLng(location_2.latitude, location_2.longitude)
                ]
            }).addTo(map);
            addMarkers(markers)
        })
    })

    
}

// False indicates that user denied to give the current address
setupGeneral()
map = setMap(false)


// $(".navigationMap-multiSearch-button").click(function (e, map) {
//     console.log(map)
// }).trigger('click', map);

$("body").on('click', ".navigationMap-multiSearch-button", function () {
    map.off()
    map.remove()
    location1 = $('#search1').val()
    location2 = $('#search2').val()
    requestGaocoding(location1, 1)
    markers = []
    setTimeout(function(){
        requestGaocoding(location2, 2)
    }, 500)
    
})

function popup(e) {
    var elem = document.getElementsByClassName("popupBox")[0]
    elem.setAttribute("style", "opacity:0;dispay:none;");


    setTimeout(function () {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].latitude == e.latlng.lat && markers[i].longitude == e.latlng.lng) {
                currentMarker = markers[i]
                document.getElementsByClassName("voteIcon")[0].addEventListener("click", upvote)
                document.getElementsByClassName("voteIcon")[1].addEventListener("click", downvote)
                checkVotable()
                document.getElementsByClassName("popup-title")[0].innerHTML = markers[i].title
                document.getElementsByClassName("popup-addressInput")[0].innerHTML = markers[i].address.substring(0, markers[i].address.indexOf(", BC"))
                document.getElementsByClassName("popup-description")[0].innerHTML = markers[i].description
                // var checkVotes = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).doc(currentMarker.postId)
                document.getElementsByClassName("upvotes")[0].innerHTML = markers[i].likes
                document.getElementsByClassName("downvotes")[0].innerHTML = markers[i].dislikes
                



            }
        }
        elem.setAttribute("style", "opacity:1;dispay:block;")

    }, 300)
}


function checkVotable() {
    var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).doc(currentMarker.postId).collection("voteRecords")
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

        // console.log(doc.data().enableDownvote)
    })


}



function jumpToDetail() {
    console.log("go to detail")
}

function closePopUp(event) {
    var elem = document.getElementsByClassName("popupBox")[0];
    elem.setAttribute("style", "opacity:0;dispay:none;");
    event.stopPropagation(); // prevent jumpToDetail from triger
    var up = document.getElementsByClassName("voteIcon")[0];
    var down = document.getElementsByClassName("voteIcon")[0];
    up.setAttribute("style", "color:black;cursor:pointer;");
    down.setAttribute("style", "color:black;cursor:pointer;");
}

function countUpvote() {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).doc(currentMarker.postId).update({
        likes: currentMarker.likes + 1

    }).then(() => {
        document.getElementsByClassName("upvotes")[0].innerHTML = currentMarker.likes + 1
        currentMarker.likes = currentMarker.likes + 1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[0]
    elem.setAttribute("style", "color:#f8b943;")
}

function disableUpvote() {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).doc(currentMarker.postId).update({
        likes: currentMarker.likes - 1

    }).then(() => {
        document.getElementsByClassName("upvotes")[0].innerHTML = currentMarker.likes - 1
        currentMarker.likes = currentMarker.likes -1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[0]
    elem.setAttribute("style", "color:black;")
}

function disableDownVote() {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).doc(currentMarker.postId).update({
        dislikes: currentMarker.dislikes - 1

    }).then(() => {
        document.getElementsByClassName("downvotes")[0].innerHTML = currentMarker.dislikes - 1
        currentMarker.dislikes = currentMarker.dislikes - 1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[1]
    elem.setAttribute("style", "color:black;")
}

function countDownVote() {
    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).doc(currentMarker.postId).update({
        dislikes: currentMarker.dislikes + 1

    }).then(() => {
        document.getElementsByClassName("downvotes")[0].innerHTML = currentMarker.dislikes + 1
        currentMarker.dislikes = currentMarker.dislikes + 1

    })

    // render html
    var elem = document.getElementsByClassName("voteIcon")[1]
    // elem.removeEventListener("click", downvote)

    elem.setAttribute("style", "color:#f8b943;")
}

function closeLogin(){
    document.getElementById("guardContainerHolder").innerHTML = ""
}


function upvote() {

    if(!localStorage.getItem("loginStatus")){
        console.log($('#guardContainerHolder').load('../components/navigationGuards.html'));
        document.getElementById("popup-back").setAttribute("onclick", "")
        document.getElementById("popup-back").addEventListener("click", closeLogin)
        
    }else{
         //update Enability
    var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).doc(currentMarker.postId).collection("voteRecords")
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
        var checkUser = db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).doc(currentMarker.postId).collection("voteRecords")
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

