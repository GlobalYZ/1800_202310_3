var base64List = []


var addressObj = new Object();

function preview() {
    // var imageUrl = URL.createObjectURL(event.target.files[0]);

    
    fileToBase64(event.target.files[0]).then((result)=>{
        
        
        var base64 = "data:image/png;base64," + result;
        window.base64List.push(base64)
        // frame.src = base64
        let element = document.createElement("div");
        $(element).addClass("reportImageContainer");
        $("#reportImagePreview").append(element);
        let index = window.base64List.length -1
        window.clickId = index
        $(element).html(`<span class="material-symbols-outlined" id="reportImage${index}">close</span><img src="${base64}" error="load failed"/>`)
        $(`#reportImage${index}`).click(clearImage)
    })

}

function clearImage() {
    var index = this.id.slice(-1)
    var elems = document.getElementsByClassName("reportImageContainer")
    for (var i=0; i<elems.length;i++){
        if(i == index){
            elems[i].remove()
            window.base64List.splice(index, index+1)
            console.log(window.base64List)
        }
    }
}

function getFullAddress(){
    var address = $("#address").val()
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        type: "get",
        data: {
            address: address, // good enough do not need rearrange data
            key: "AIzaSyAkhygJBngZRdSBpNQQHkIf7OU99ioNjkg"
        },
        success: function (res) {
            if(res.status == "OK"){
                console.log(res.results[0])
                $("#address").val(res.results[0].formatted_address)
                window.addressObj.address = res.results[0].formatted_address
                window.addressObj.latitude = res.results[0].geometry.location.lat
                window.addressObj.longtitude = res.results[0].geometry.location.lng
                window.addressObj.city = res.results[0].address_components[2].long_name
                console.log(window.addressObj)
            }
        }
    })

}

function fixAddress(){
    window.addressObj = {}
}


function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      // 创建一个新的 FileReader 对象
      const reader = new FileReader();
      // 读取 File 对象
      reader.readAsDataURL(file);
      // 加载完成后
      reader.onload = function () {
        // 将读取的数据转换为 base64 编码的字符串
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


db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection("Richmond").get().then(list =>{
    list.forEach(doc=>{
        console.log(doc.data().address)
    })
})
// console.log(data)


function submit(){
    var title = $("#title").val()
    var description = $("#description").val()
    var type = $('#roadType').val()
    var addressObj = window.addressObj
    if(title == ""){
        alertMessage("Please write title!")
    }else if(description == ""){
        alertMessage("Please write description!")
    }else if(addressObj.latitude == undefined){
        alertMessage("Please press Match Address button before submission!")
    }else{
        db.collection("roadConditions").doc("SfAsSuFAr88IIAPo2edz").collection(addressObj.city).add({
            uid: "XfleyL6KPXbxpeCRZSli5VdWk9C2",
            imageUrl:"base64List",
            address:addressObj.address,
            city:addressObj.city,
            description:description,
            latitude: addressObj.latitude,
            longtitude: addressObj.longtitude,
            type:type,
            likes:0,
            dislikes:0
        })
    }
}

function alertMessage(message){
    var elem = document.getElementById("alertMessage");
    var alertText = document.getElementById("alertText")
    alertText.innerText = message
    elem.setAttribute("style", "top:70px;opacity:1;")
}

function closeAlert(){
    var elem = document.getElementById("alertMessage");
    elem.setAttribute("style", "top:120px;opacity:0;")
}


