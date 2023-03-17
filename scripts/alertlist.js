function readAlert(weatherAlert) { 
    db.collection("weatherAlerts").doc(weatherAlert)
        .onSnapshot(ePnIZ0zlCaYvsQV8CLR6 => { 
            console.log("current document data: " + ePnIZ0zlCaYvsQV8CLR6.data());
            document.getElementById("alert-goes-here").innerHTML = ePnIZ0zlCaYvsQV8CLR6.data().texts;
            document.getElementById("submissiontime").innerHTML = ePnIZ0zlCaYvsQV8CLR6.data().timestamp;
            document.getElementById("title").innerHTML = ePnIZ0zlCaYvsQV8CLR6.data().title;
        })
        }
        readAlert("ePnIZ0zlCaYvsQV8CLR6");