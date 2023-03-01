// 1. 获取用户当前地址并让地图显示当前地址
// 2. 导航
// 3. 在marker上添加事件

function setupGeneral(){
    $('.navigationMap-multiSearch-button').click(searchLocations)
    var h = window.innerHeight;
    var elementContainer = document.getElementById('map')
    elementContainer.setAttribute('style', 'height:' + (h-56) + 'px;margin-top:0;z-index:1;')
} 

function setMap(currentAddress) {
    if(currentAddress == false){
        currentAddress = {
            latitude: 49.282730,
            longitude:-123.120735
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
    const map = L.map("map", config).setView([
        currentAddress.latitude, currentAddress.longitude
    ], zoom);



    // Used to load and display tile layers on the map
    // Most tile servers require attribution, which you can set under `Layer`
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    
    //add current location as primary marker
    marker = new L.marker([currentAddress.latitude, currentAddress.longitude]).addTo(map);
    // loop that adds many markers to the map
    // for (let i = 0; i < points.length; i++) {
    //     const [lat, lng, popupText] = points[i];

    //     marker = new L.marker([lat, lng]).bindPopup(popupText).addTo(map);
    // }

}

function searchLocations(){
    var location1 = $("#search1").val()
    var location2 = $("#search2").val()
    console.log(location1, location2)
    L.Routing.control({
        waypoints: [
            L.latLng(49.282730, -123.120735),
            L.latLng(49.181540, -123.118980)
        ],
        routeWhileDragging: true,

    }).addTo(map);  //map.getSize is not defined bug

    // L.Routing.control({
    //     waypoints: [
    //       L.latLng(57.74, 11.94),
    //       L.latLng(57.6792, 11.949)
    //     ]
    //   }).addTo(map);
}

// False indicates that user denied to give the current address
setupGeneral()
setMap(false)

