
// 3. 在marker上添加事件

var map = ""

console.log(localStorage.getItem("uid"))
console.log(localStorage.getItem("userName"))
console.log(localStorage.getItem("loginStatus"))


var locations = {
    location1:"",
    location2:""
};
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
                    locations.location1 = res.results[0].geometry.location
                }else{
                    locations.location2 = res.results[0].geometry.location
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
    }

    console.log(currentAddress)

    let config = {
        minZoom: 7,
        maxZoom: 18
    };
    // magnification with which the map will start
    const zoom = 10;


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
    window.map = L.map("map", config).setView([
        currentAddress.latitude, currentAddress.longitude
    ], zoom);


    // Used to load and display tile layers on the map
    // Most tile servers require attribution, which you can set under `Layer`
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

    // add current location as primary marker
    marker = new L.marker([currentAddress.latitude, currentAddress.longitude]).addTo(map);
    // loop that adds many markers to the map
    // for (let i = 0; i < points.length; i++) {
    //     const [lat, lng, popupText] = points[i];

    //     marker = new L.marker([lat, lng]).bindPopup(popupText).addTo(map);
    // }

    // document.getElementsByClassName('map_container')[0].setAttribute("map", map)
    console.log(map)
    return map
}

function setMultiMap() {
    window.map = L.map('map');

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

    // L.Routing.control({
    //     waypoints: [
    //         L.latLng(49.282730, -123.120735),
    //         L.latLng(49.181540, -123.118980)
    //     ],
    //     routeWhileDragging: true

    // }).addTo(map);
    // map.getSize is not defined bug
    console.log(locations)

    L.Routing.control({
        waypoints: [
            L.latLng(locations.location1.lat, locations.location1.lng),
            L.latLng(locations.location2.lat, locations.location2.lng)
        ]
    }).addTo(map);
}

// False indicates that user denied to give the current address
setupGeneral()
map = setMap(false)


// $(".navigationMap-multiSearch-button").click(function (e, map) {
//     console.log(map)
// }).trigger('click', map);

$("body").on('click', ".navigationMap-multiSearch-button", function () {
    console.log(map)
    map.off()
    map.remove()
    location1 = $('#search1').val()
    location2 = $('#search2').val()
    locations.location1 = requestGaocoding(location1, 1)
    locations.location2 = requestGaocoding(location2, 2)
})

