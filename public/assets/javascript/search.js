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



function searchBarParams(){
    let distance = document.getElementById("distance").value;
    let garden = document.getElementById("garden").value;
    let orgo = document.getElementById("orgo").checked;
    let pets = document.getElementById('pets').checked;
searchParams.distance = distance;
searchParams.hasGarden = garden;
searchParams.organic = orgo;
searchParams.pets = pets;

console.log(searchParams);

}














})