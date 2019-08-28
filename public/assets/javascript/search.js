document.addEventListener("DOMContentLoaded", ()=>{
    const userEmail = window.localStorage.getItem("user-email");
    let searchParams = {
        distance: 0,
        hasGarden: false,
        organic: false,
        pets: false,
    }
    console.log(userEmail);
document.addEventListener("click", function(event){
    if(event.target.matches("#search")){
        event.preventDefault();
        searchBarParams();
    } else {
        return false;
    }
})


//pulling in values from search bar
function searchBarParams(){
    let distance = document.getElementById("distance").value;
    let garden = document.getElementById("garden").value;
    let orgo = document.getElementById("orgo").checked;
    let pets = document.getElementById('pets').checked;
    if(orgo){
        orgo = 'true'
    } else {
        orgo='false'
    }
    if(garden){
        garden = 'true'
    } else {
        garden = 'false'
    }
    if (pets){
        pets ='true'
    } else {
        pets = 'false'
    }
searchParams.distance = distance;
searchParams.hasGarden = garden;
searchParams.organic = orgo;
searchParams.pets = pets;
console.log(searchParams);
apiSearch(searchParams);
}

//making the ajax request to the server
function apiSearch(searchObject){
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('success!', xhr);
            if (xhr.response !== "[]") {
                console.log(JSON.parse(xhr.response));
            } else {
                noMatches();
            }
        } else {
            console.log(xhr, xhr.status);
        }
    };
    xhr.open('GET', '/api/search/' + userEmail + '/' + searchObject.distance + '/' + searchObject.hasGarden + '/' + searchObject.organic + '/' + searchObject.pets );
    xhr.send();
}

function noMatches(){
    let wrap = document.getElementById('card-holder')
while(wrap.firstChild) wrap.removeChild(wrap.firstChild);
let noResults = document.createElement("h3").classList.add('no-results')
noResults.textContent = "No results found. Try broadening your search criteria?";
wrap.append(noResults);
}














})