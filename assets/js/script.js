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
        console.log(data.expiry); //Logs the expiry date of the API key.
    } 
};




