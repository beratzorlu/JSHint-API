const API_KEY = "brByyCTPTc21vOPArJuIPYAwNKQ";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const RESULTS_MODAL = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));



async function getStatus(e) {
    /** 
     * Get information from API.
     * Display information taken from the API for the user.
     */
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    const response = await fetch(queryString);
    const data = await response.json();

    if (response.ok) {
        displayStatus(data); //Logs the status of the API key fetch to the console.
    } else {
        throw new Error(data.error);
    }
};

function displayStatus(data) {
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    RESULTS_MODAL.show();
};