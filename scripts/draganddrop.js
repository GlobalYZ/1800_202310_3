
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var ref= firebase.database().ref("Uploads");
var storage = firebase.storage();
var pathReference = storage.ref('../images/car1.png');
    pathReference.getDownloadURL().then(function(url) {
        ref.push().set({
        imgurl: url
    });
});


upload.addEventListener('dragenter', function (e) {
    upload.parentNode.className = 'area dragging';
}, false);

upload.addEventListener('dragleave', function (e) {
    upload.parentNode.className = 'area';
}, false);

upload.addEventListener('dragdrop', function (e) {
    onFile();
}, false);

upload.addEventListener('change', function (e) {
    onFile();
}, false);
