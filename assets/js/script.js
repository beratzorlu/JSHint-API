const API_KEY = "brByyCTPTc21vOPArJuIPYAwNKQ";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const RESULTS_MODAL = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

function displayErrors(data) {
    /**
     * Add HTML and text content to modal.
     * Display modal with the newly added content.
     */
    let heading = `JSHint Results for ${data.file}`;
    
    if (data.total_errors === 0) {
        results = `<div class="no-errors">No errors found!</div>`;
    } else {
        results = `<div class="no-errors">Total Errors: <span class="error-count">${data.total_errors}</span></div>`;
    };

    for (let error of data.error_list) {
        results += `<div>At line <span class="line">${error.line}</span>, `;
        results += `column <span class="column">${error.col}</span></div>`;
        results += `<div class="error">${error.error}</div>`;

        document.getElementById("resultsModalTitle").innertext = heading;
        document.getElementById("results-content").innerHTML = results;
        RESULTS_MODAL.show();
    };
};

async function postForm(e) {
    /**
     * Make a POST request.
     * POST the retrieved data to the API.
     */
    const form = new FormData(document.getElementById("checksform"));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });

    const data = await response.json();

    if (response.ok) {
        displayErrors(data);
    } else {
        throw new Error(data.error);
    }
};

async function getStatus(e) {
    /** 
     * Make a GET request for information from API.
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
    /**
     * Push API key expiry data to the HTML text content.
     * Display this information on a modal.
     */
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    RESULTS_MODAL.show();
};