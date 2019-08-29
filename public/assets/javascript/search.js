document.addEventListener("DOMContentLoaded", () => {
    const userEmail = window.localStorage.getItem("user-email");
    let searchParams = {
        distance: 0,
        hasGarden: false,
        organic: false,
        pets: false,
    }
    console.log(userEmail);
    document.addEventListener("click", function (event) {
        if (event.target.matches("#search")) {
            event.preventDefault();
            searchBarParams();
        } else if (event.target.matches(".card-wrapper")){
            event.preventDefault();
            console.log(event.target);
            let id = event.target.getAttribute("data-id");
            profilePull(id);
        } else {
            return false;
        }
    })


    function profilePull(id){
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('success!', xhr);
                let userArray = JSON.parse(xhr.response);
                 cardModal(userArray[0]);
            
            } else {
               return console.log(xhr, xhr.status);
            }
        };
        xhr.open('GET', '/api/user-ids/' + id);
        xhr.send();
    }  
    function cardModal(userObject){
        console.log(userObject);
    }


    //pulling in values from search bar
    function searchBarParams() {
        let distance = document.getElementById("distance").value;
        let garden = document.getElementById("garden").value;
        let orgo = document.getElementById("orgo").checked;
        let pets = document.getElementById('pets').checked;
        if (orgo) {
            orgo = 'true'
        } else {
            orgo = 'false'
        }
        if (garden) {
            garden = 'true'
        } else {
            garden = 'false'
        }
        if (pets) {
            pets = 'true'
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
    function apiSearch(searchObject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('success!', xhr);
                if (xhr.response !== "[]") {
                    let resultsArray = JSON.parse(xhr.response);
                    console.log(resultsArray);
                    cardPopulate(resultsArray);
                } else {
                    noMatches();
                }
            } else {
                console.log(xhr, xhr.status);
            }
        };
        xhr.open('GET', '/api/search/' + userEmail + '/' + searchObject.distance + '/' + searchObject.hasGarden + '/' + searchObject.organic + '/' + searchObject.pets);
        xhr.send();
    }
    //in the case of no matches, clear the cards and display a no results found message
    function noMatches() {
        let wrap = document.getElementById('card-holder');
        while (wrap.firstChild) wrap.removeChild(wrap.firstChild);
        let noResults = document.createElement("h4");
        noResults.classList.add('no-results');
        noResults.textContent = "No results found. Try broadening your search criteria";
        wrap.append(noResults);
    }

    //function for taking results array and displaying the data to the user
    function cardPopulate(array) {
        let wrap = document.getElementById('card-holder');
        while (wrap.firstChild) wrap.removeChild(wrap.firstChild);
        array.map((obj) => {
            let tempCardWrapper = document.createElement("div");
            tempCardWrapper.classList.add('card-wrapper');
            tempCardWrapper.setAttribute("data-id", obj.id);
            let userName = document.createElement("div");
            userName.classList.add('user-name');
            userName.textContent = obj.userName;
            let imgWrapper = document.createElement('div');
            imgWrapper.classList.add('img-wrapper');
            let avatar = document.createElement("img");
            avatar.classList.add('card-img')
            let plants = document.createElement("div");
            plants.classList.add("plant");
            plants.textContent = obj.plants;
            let summary = document.createElement("div");
            summary.classList.add("summary");
            summary.textContent = obj.summary;

            if (obj.avatar == 'rake') {
                avatar.setAttribute("src", "/assets/images/rake.png");

            } else if (obj.avatar = 'pot') {
                avatar.setAttribute("src", "/assets/images/pot.png");
            } else if (obj.avatar = 'pail') {
                avatar.setAttribute("src", "/assets/images/garden_pail.png");
            } else if (obj.avatar = 'spade') {
                avatar.setAttribute("src", "/assets/images/trowel.png");
            }
            imgWrapper.append(avatar);
            tempCardWrapper.append(userName, plants, summary, imgWrapper);
            wrap.append(tempCardWrapper);


        })

    }












})