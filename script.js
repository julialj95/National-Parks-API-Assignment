'use strict'
function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
  }
function formatStates(){
   const stateString = $("#js-search-state").val()
   console.log(stateString)
//    const stateArray = stateString.split(',')
   return stateString
}

function getParks(){
let apiKey = 'oMN8Mi6vCpVhhPqgZeJ38NJbZ3Y93c1n8w9eou3f'
let searchUrl = 'https://developer.nps.gov/api/v1/parks'
const numberToDisplay = $("#js-max-results").val()
const query = $("#js-search-city").val()

    const params = {
        api_key: apiKey,
        limit: numberToDisplay,
        stateCode: formatStates()
    }

const queryString = formatQueryParams(params);
const url = searchUrl + '?' + queryString;
console.log(queryString)

fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => displayParksInfo(responseJson))
    .catch(err => {
        $("#js-error-message").text(`Something went wrong: ${err.message}`)
    });
    
}

function watchForm(){
    $("#js-form").submit(event => {
        event.preventDefault();
        getParks()
    })

}

function displayParksInfo(responseJson){
    $("#results-list").empty()
    $("#js-error-message").empty()
    for (let i = 0; i < responseJson.data.length; i++){
        console.log(responseJson)
        $("#results-list").append(`<li>
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].addresses[0].line1}, ${responseJson.data[i].addresses[0].city}, ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p>
        <p>${responseJson.data[i].description}</p>
        <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
        
        </li>`)};
    $('#results').removeClass('hidden')
}
    
$(watchForm)