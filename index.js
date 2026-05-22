// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
//Create function to make GET request to the API
function fetchWeatherAlerts(state) {
// Clear and Reset the UI
    document.getElementById("state-input").value = "";
    document.getElementById("alerts-display").innerHTML = ""
    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    // Parse the JSON response
    .then(function (response) {
           if (!response.ok) {
                throw new Error("Invalid state code or no data found.");
    }
    return response.json();
})
//Log the data
.then(function (data) {
    console.log("Weather alerts:", data)
    //Hide Error on success
    const errorDiv = document.getElementById("error-message");
            errorDiv.textContent = "";
            errorDiv.classList.add("hidden");
    displayAlerts(data);
})
// Handle API errors using catch()
.catch(function(errorObject) {
    console.log(errorObject.message);
    displayError(errorObject.message);
   });
}
//Display the Alerts on the Page
function displayAlerts(data) {
    const container = document.getElementById("alerts-display");
// Summary Message
    const summary = document.createElement("h2");
    summary.textContent = data.title + ": " + data.features.length
    container.appendChild(summary);
// Create list of alert headlines
    const list = document.createElement("ul")
    data.features.forEach((alert) => {
        const item = document.createElement("li")
        item.textContent = alert.properties.headline;
        list.appendChild(item);
    })
    container.appendChild(list);
}
// Error Handling
function displayError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
}
//Button-Click Event
document.getElementById("fetch-alerts")
.addEventListener("click", function() {
    const state = document.getElementById("state-input").value
    //Call the function
    fetchWeatherAlerts(state);
});
