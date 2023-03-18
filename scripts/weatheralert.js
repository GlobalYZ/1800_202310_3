function populateWeatherAlert() {
    let params = new URL(window.location.href) //get the url from the searbar
    let weatherAlertCardID = params.searchParams.get("uid")
    console.log(weatherAlertCardID);

    db.collection("alerts").doc("rVGEZw5EuzKfoQEtBQec").collection("weatherAlerts").get().then(allWeatherAlerts => {
        alerts = allWeatherAlerts.docs;
        console.log(alerts);
        alerts.forEach(doc => {

            var title = doc.data().title;
            var texts = doc.data().texts;
            console.log(title);

            let weatherContainer = document.querySelector(".weather-container");

            let alertTitle = document.createElement("h2");
            alertTitle.textContent = title;
            weatherContainer.appendChild(alertTitle);

            let alertText = document.createElement("p");
            alertText.textContent = texts;
            weatherContainer.appendChild(alertText);

    });
});
}
populateWeatherAlert();