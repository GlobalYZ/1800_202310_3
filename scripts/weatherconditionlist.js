function populateWeatherConditionList() {
    let weatherAlertCardTemplate = document.getElementById("weatherAlertCardTemplate");
    let weatherAlertCardGroup = document.getElementById("weatherAlertCardGroup");

    let params = new URL(window.location.href) //get the url from the searbar
    let weatherAlertCardID = params.searchParams.get("uid")
    console.log(weatherAlertCardID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("alerts").doc("rVGEZw5EuzKfoQEtBQec").collection("weatherAlerts").get().then(allWeatherAlerts => {
        alerts = allWeatherAlerts.docs;
        console.log(alerts);
        alerts.forEach(doc => {

            var img = doc.data().imgUrl;
            var title = doc.data().title;
            var texts = doc.data().texts;
            var submissiontime = doc.data().timestamp;
            console.log(title);

            let weatherAlertCard = weatherAlertCardTemplate.content.cloneNode(true);
            let weatherAlertCardImage = weatherAlertCard.querySelector('.photo');
            weatherAlertCardImage.setAttribute('src', img);
            weatherAlertCard.querySelector('.title').innerHTML = title;     //equiv getElementByClassName
            weatherAlertCard.querySelector('.texts').innerHTML = texts;
            weatherAlertCard.querySelector('.submissiontime').innerHTML = submissiontime;

            weatherAlertCardGroup.appendChild(weatherAlertCard);
        })
    })
}
populateWeatherConditionList();

