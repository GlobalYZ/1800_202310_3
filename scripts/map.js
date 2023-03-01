// 1. 获取用户当前地址并让地图显示当前地址
// 2. 导航
// 3. 在marker上添加事件

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
        setMap(crd)
      };
      
      function err() {
        console.warn('denied to share your address!');
        //pass the default school address
        var crd = {
            latitude: 49.281849,
            longitude: -123.117149,
        }
        setMap(crd)
      };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, err, options);
    }
}


function setMap(currentAddress) {
    let config = {
        minZoom: 7,
        maxZoom: 18
    };
    // magnification with which the map will start
    const zoom = 16;
 

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


getCurrentAddress()