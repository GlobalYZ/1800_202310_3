var upload = document.getElementById('upload');

function onFile() {
    var me = this,
        file = upload.files[0],
        name = file.name.replace(/.[^/.]+$/, '');
    console.log('upload code goes here', file, name);
}

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


if (file.type === 'audio/mp3' || file.type === 'audio/mpeg') {
    if (file.size < (3000 * 1024)) {
        upload.parentNode.className = 'area uploading';
    } else {
        window.alert('File size is too large, please ensure you are uploading a file of less than 3MB');
    }
} else {
    window.alert('File type ' + file.type + ' not supported');
}