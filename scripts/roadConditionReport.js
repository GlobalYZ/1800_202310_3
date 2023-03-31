var imageFiles = []

console.log(localStorage.getItem("uid"))

var addressObj = new Object();
var submitted = false;

function preview() {
    console.log("before add image " + window.imageFiles)
    var imageUrl = URL.createObjectURL(event.target.files[0]);
    console.log(event.target.files[0])
    window.imageFiles.push(event.target.files[0])
    console.log("added image " + window.imageFiles)

    let element = document.createElement("div");
    $(element).addClass("reportImageContainer");
    $("#reportImagePreview").append(element);
    let index = window.imageFiles.length - 1
    window.clickId = index
    $(element).html(`<span class="material-symbols-outlined" id="reportImage${index}">close</span><img src="${imageUrl}" error="load failed"/>`)
    $(`#reportImage${index}`).click(clearImage)

    // })


}

function clearImage() {
    var index = this.id.slice(-1)
    var elems = document.getElementsByClassName("reportImageContainer")
    for (var i = 0; i < elems.length; i++) {
        if (i == index) {
            console.log("I am deleting", index)
            elems[i].remove()
            window.imageFiles.splice(index, 1)
            console.log("after clear image", window.imageFiles)
        }
    }
}

function getFullAddress() {
    var address = $("#address").val()
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        type: "get",
        data: {
            address: address, // good enough do not need rearrange data
            key: "AIzaSyAkhygJBngZRdSBpNQQHkIf7OU99ioNjkg"
        },
        success: function (res) {
            if (res.status == "OK") {
                console.log(res.results[0])
                $("#address").val(res.results[0].formatted_address)
                let address = res.results[0].formatted_address
                window.addressObj.address = res.results[0].formatted_address
                window.addressObj.latitude = res.results[0].geometry.location.lat
                window.addressObj.longitude = res.results[0].geometry.location.lng
                window.addressObj.city = address.substring(address.indexOf(", ") +1, address.indexOf(", BC")).replace(/\s*/g,"");
                console.log(window.addressObj)
            } else {
                if (res.status == "ZERO_RESULTS") {
                    alertMessage("Your input can not Match with any valid address! please try again")
                }

            }
        },
        error: function (err) {
            alert(err.message)
        }
    })
}

function fixAddress() {
    window.addressObj = {}
}


function fileToBase64(file) {
    return new Promise((resolve, reject) => { // 创建一个新的 FileReader 对象
        const reader = new FileReader();
        // 读取 File 对象
        reader.readAsDataURL(file);
        // 加载完成后
        reader.onload = function () { // 将读取的数据转换为 base64 编码的字符串
            const base64String = reader.result.split(",")[1];
            // 解析为 Promise 对象，并返回 base64 编码的字符串
            resolve(base64String);
        };

        // 加载失败时
        reader.onerror = function () {
            reject(new Error("Failed to load file"));
        };
    });
}



function submit() {
    
    var title = $("#title").val()
    var description = $("#description").val()
    var addressObj = window.addressObj
    var imageFiles = window.imageFiles
    if (title == "") {
        alertMessage("Please write title!")
    } else if (description == "") {
        alertMessage("Please write description!")
    } else if (addressObj.latitude == undefined) {
        alertMessage("Please press Match Address button before submission!")
    } else if (! imageFiles) {
        alertMessage("Please upload at least one image!")
    } else {
        var loadingElem = document.getElementById("loadingHolder");
        loadingElem.setAttribute("style", "display:flex;")
        console.log(addressObj.city)
        // db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).get().then(list => {
        //     list.forEach(doc => {
        //         console.log(doc.data().address)
        //     })
        // })
        if(window.submitted == false){
            setTimeout(uploadToServer, 3000);
        }
        for (var index = 0; index <= imageFiles.length-1; index++) {
            var storageRef = firebase.storage().ref("/images/" + imageFiles[index].name)
            console.log(index)


            storageRef.put(imageFiles[index]).then((res)=>{
                primaryMessage("images saved to server");
        })
        }
    }
}

function passURL(index){
    console.log("the index is " + index)
    var loadingElem = document.getElementById("loadingHolder");
    var title = $("#title").val()
    var description = $("#description").val()
    var type = $('#roadType').val()
    var addressObj = window.addressObj
    var imageFiles = window.imageFiles
    var uid = localStorage.getItem("uid")
    imageUrls = []
    var storageRef = firebase.storage().ref("/images/" + imageFiles[index].name)
    storageRef.getDownloadURL().then(function (url) {
        
        imageUrls.push(url)
        console.log(imageUrls)
        if(imageUrls.length == imageFiles.length && window.submitted == false){
            console.log("I am ready to submit images: " + imageUrls.length)
            console.log(imageUrls)
        }
        if (imageUrls.length == imageFiles.length && window.submitted == false) {
            console.log(1111)
            db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).add({
                uid: uid,
                imageUrl: imageUrls,
                address: addressObj.address,
                city: addressObj.city,
                description: description,
                latitude: addressObj.latitude,
                longitude: addressObj.longitude,
                type: type,
                likes: 0,
                dislikes: 0,
                title: title
            }).then((res) => {
                console.log(res.id)  //this is the id of the new post
                db.collection("users").doc(localStorage.getItem("uid")).set({
                    roadConditionIds: firebase.firestore.FieldValue.arrayUnion(res.id)
                },{
                    merge: true
                }).then(()=>{
                    window.submitted = true
                    loadingElem.setAttribute("style", "display:none;")
                    primaryMessage("The submission is successful! Thanks for your contribution")
                    setTimeout(function(){
                        window.history.go(-1)
                    },2000)
                })

            })
            
            
        }
    })

}

function uploadToServer(){
    var imageFiles = window.imageFiles
    
    for(var index=0; index<imageFiles.length;index++){
        console.log("pass+1")
        passURL(index)
        if(index == imageFiles.length -1){
            break;
        }

    }
}

function alertMessage(message) {
    var elem = document.getElementById("alertMessage");
    var alertText = document.getElementById("alertText")
    alertText.innerText = message
    elem.setAttribute("style", "top:70px;opacity:1;display:block;")
    setTimeout(function(){
        var elem = document.getElementById("alertMessage");
        elem.setAttribute("style", "top:120px;opacity:0;display:none;")
    }, 2000)
}

function primaryMessage(message){
    var elem = document.getElementById("alert-primary");
    var alertText = document.getElementById("alert-primary-text")
    alertText.innerText = message
    elem.setAttribute("style", "top:70px;opacity:1;display:block;")
    setTimeout(function(){
        var elem = document.getElementById("alert-primary");
        elem.setAttribute("style", "top:120px;opacity:0;display:none;")
    }, 2000)
}
