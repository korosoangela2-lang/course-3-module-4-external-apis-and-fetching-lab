// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
function fetchWeatherAlerts(stateAbbr) {
  fetch(https://api.weather.gov/alerts/active?area=${stateAbbr})
    .then((response) => {
      if (!response.ok) {
        throw new Error(Request failed with status: ${response.status});
      }
      return response.json(); // parse JSON response
    })
    .then((data) => {
      console.log("Weather Alerts Data:", data); 
      hideError()
      displayAlerts(data);
    })
    .catch((error) => {
      console.log("Network or API Error:", error); 
      showError(error.message); 

});
}

// fetchWeatherAlerts("CA");

function displayAlerts(data) {
  const container = document.getElementById("alerts-display");

  // Clear previous results
  container.innerHTML = "";

  const alerts = data.features || [];

  // :small_blue_diamond: Summary message
  const summary = document.createElement("h2");
  summary.textContent = ${data.title}: ${alerts.length};

  container.appendChild(summary);

  // :small_blue_diamond: If no alerts exist
  if (alerts.length === 0) {
    const msg = document.createElement("p");
    msg.textContent = "No active alerts at this time.";
    container.appendChild(msg);
    return;
  }

  // :small_blue_diamond: List of alert headlines
  const list = document.createElement("ul");

  alerts.forEach((alert) => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline || "No headline available";
    list.appendChild(li);
  });

  container.appendChild(list);
}

document.getElementById("fetch-alerts").addEventListener("click", () => {
  const input = document.getElementById("state-input");
  const state = input.value.trim().toUpperCase();

  if (!state) {
    console.log("Please enter a state abbreviation");
    return;
  }

  fetchWeatherAlerts(state);

  // :white_check_mark: clear input AFTER click
  input.value = "";
});

function showError(message) {
  const errorDiv = document.querySelector("#error-message");

  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden"); // :white_check_mark: IMPORTANT
}

function hideError() {
  const errorDiv = document.getElementById("error-message");

  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");
}
