

// map needs to be accessed globally
var map;
var addressObj = new Object();
var markers = [];
var currentMarker;
var UpvoteActive;
var DownvoteActive;

console.log(localStorage.getItem("uid"))
console.log(localStorage.getItem("userName"))
console.log(localStorage.getItem("loginStatus"))


function getUrlParams() {
    var addressInput = $.Request("address")
    if (addressInput !== "null") {
        console.log(typeof (addressInput))
        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json",
            type: "get",
            data: {
                address: addressInput, // good enough do not need rearrange data
                key: "AIzaSyAkhygJBngZRdSBpNQQHkIf7OU99ioNjkg"
            },
            success: function (res) {
                if (res.status == "OK") {
                    $(".nav-searchbar-input").val(res.results[0].formatted_address)
                    let address = res.results[0].formatted_address
                    window.addressObj.address = res.results[0].formatted_address
                    window.addressObj.latitude = res.results[0].geometry.location.lat
                    window.addressObj.longitude = res.results[0].geometry.location.lng
                    window.addressObj.city = address.substring(address.indexOf(", ") + 1, address.indexOf(", BC")).replace(/\s*/g, "");
                    console.log(window.addressObj)
                    setMap(window.addressObj)
                }
            },
            error: function (err) {
                alert(err.message)
            }
        })
    } else {
        getCurrentAddress()
    }

}

function setupGeneral() {
    let h = window.innerHeight;
    let w = window.innerWidth;
    let elementContainer = document.getElementById('map')
    elementContainer.setAttribute('style', 'height:' + (
        h - 56
    ) + 'px;margin-top:55px;z-index:1;')
    document.getElementById('map_go').setAttribute('style', 'left:' + (
        w - 102
    ) / 2 + 'px;')
}

function getCurrentAddress() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        console.log('More or less ' + crd.accuracy + ' meters.');
        getAddressObj(crd.latitude, crd.longitude)

    };

    function err() {
        console.warn('denied to share your address!');
        // pass the default school address
        var crd = {
            latitude: 49.281849,
            longitude: -123.117149
        }
        getAddressObj(crd.latitude, crd.longitude)

    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, err, options);
    }
}

function getAddressObj(lat, lng) {
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        type: "get",
        data: {
            latlng: lat + ',' + lng, // good enough do not need rearrange data
            key: "AIzaSyAkhygJBngZRdSBpNQQHkIf7OU99ioNjkg",
            sensor: false
        },
        success: function (res) {
            if (res.status == "OK") {
                let address = res.results[0].formatted_address
                window.addressObj.address = res.results[0].formatted_address
                window.addressObj.latitude = res.results[0].geometry.location.lat
                window.addressObj.longitude = res.results[0].geometry.location.lng
                window.addressObj.city = address.substring(address.indexOf(", ") + 1, address.indexOf(", BC")).replace(/\s*/g, "");
                console.log(window.addressObj)
                setMap(window.addressObj)
            }
        },
        error: function (err) {
            alert(err.message)
        }
    })

}


function setMap(currentAddress) {
    let config = {
        minZoom: 7,
        maxZoom: 18
    };
    // magnification with which the map will start
    const zoom = 14;

    // coordinate array with popup text
    let points = [
        [
            52.230020586193795, 21.01083755493164, "point 1"
        ],
        [
            52.22924516170657, 21.011320352554325, "point 2"
        ],
        [
            52.229511304688444, 21.01270973682404, "point 3"
        ],
        [
            52.23040500771883, 21.012146472930908, "point 4"
        ],
    ];


    // calling map
    map = L.map("map", config).setView([
        currentAddress.latitude, currentAddress.longitude
    ], zoom);

    console.log(addressObj)



    db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).get().then(list => {
        list.forEach(doc => {
            console.log(doc.data().address)
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
        // Used to load and display tile layers on the map
        // Most tile servers require attribution, which you can set under `Layer`
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

        // add current location as primary marker
        marker = new L.marker([currentAddress.latitude, currentAddress.longitude]).addTo(map);
        // loop that adds many markers to the map
        // for (let i = 0; i < points.length; i++) {
        //     const [lat, lng, popupText] = points[i];

        //     marker = new L.marker([lat, lng]).bindPopup(popupText).addTo(map);
        // }

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
        console.log(doc.docs[0].data())
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
    let url = $.UrlUpdateParams("./roadConditionDetail", "postId", currentMarker.postId);
    window.location.href=url
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


setupGeneral();
getUrlParams();
