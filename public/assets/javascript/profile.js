document.addEventListener("DOMContentLoaded", () => {
    let userEmail = window.localStorage.getItem('user-email');
    var userObject;
    console.log(userEmail);
    profileCall();

    //pulling the user's information from the database
    function profileCall(email) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                if (xhr.response !== "[]") {
                    let userArray = JSON.parse(xhr.response);
                    console.log(userArray);
                    console.log(userArray.length);
                    userObject = userArray[0];
                    profilePopulate(userArray[0]);
                } else {
                    errorLoadingProfile();
                }
            } else {
                console.log(xhr, xhr.status);
            }
        };
        xhr.open('GET', '/api/user-profiles/' + userEmail);
        xhr.send();
    }

    function errorLoadingProfile() {
        alert("There was an error loading your profile. Try logging out and back in.");
    }

    //putting the pulled data from profilecall function onto the page for the user to see
    function profilePopulate(obj) {
        if (obj.hasGarden) {
            obj.hasGarden = 'Yes';
        } else {
            obj.hasGarden = 'No';
        }
        if (obj.needsGarden) {
            obj.needsGarden = 'Yes';
        } else {
            obj.needsGarden = 'No';
        }
        if (obj.organic) {
            obj.organic = 'Yes';
        } else {
            obj.organic = 'No';
        }
        if (obj.pets) {
            obj.pets = 'Yes';
        } else {
            obj.pets = 'No';
        }
        console.log(obj);
        divEmpty();

        let userName = document.createElement("p");
        userName.textContent = 'UserName: ' + obj.userName;
        document.getElementById('user-name').append(userName);


        let address = document.createElement("p");
        address.textContent = 'Address: ' + obj.address;
        document.getElementById('address').append(address);


        let contactEmail = document.createElement("p");
        contactEmail.textContent = 'Contact email: ' + obj.contactEmail;
        document.getElementById('contact-email').append(contactEmail);


        let imageUrl = document.createElement("p");
        imageUrl.textContent = 'image Url: ' + obj.imageUrl;
        document.getElementById('img-url').append(imageUrl);

        let summary = document.createElement("p");
        summary.textContent = obj.summary;
        summary.classList.add("profile-text");
        document.getElementById("summary").append(summary);

        let plants = document.createElement("p");
        plants.textContent = obj.plants;
        plants.classList.add("profile-text");
        document.getElementById("plants").append(plants);

        let hasGarden = document.createElement("p");
        hasGarden.textContent = "has a garden: " + obj.hasGarden;
        document.getElementById("has-garden").append(hasGarden);

        let needsGarden = document.createElement("p");
        needsGarden.textContent = "Needs a garden: " + obj.needsGarden;
        document.getElementById("needs-garden").append(needsGarden);

        let organic = document.createElement("p");
        organic.textContent = "organic only: " + obj.organic;
        document.getElementById("organic").append(organic);

        let pets = document.createElement("p");
        pets.textContent = "Pet friendly: " + obj.pets;
        document.getElementById("pets").append(pets);

        let age = document.createElement("p");
        age.textContent = "Age: " + obj.age;
        document.getElementById("age").append(age);

        let hours = document.createElement("p");
        hours.textContent = "Hours/week: " + obj.hours;
        document.getElementById("hours").append(hours);

        if (obj.avatar == 'spade') {
            document.getElementById("display-avatar").setAttribute("src", "/assets/images/trowel.png");
        } else if (obj.avatar == 'rake') {
            document.getElementById("display-avatar").setAttribute("src", "/assets/images/rake.png");
        } else if (obj.avatar == 'pail') {
            document.getElementById("display-avatar").setAttribute("src", "/assets/images/garden_pail.png");
        } else if (obj.avatar == 'pot') {
            document.getElementById("display-avatar").setAttribute("src", "/assets/images/pot.png");
        }

    }
    function divEmpty() {
        let userNameWrap = document.getElementById('user-name');
        while (userNameWrap.firstChild) userNameWrap.removeChild(userNameWrap.firstChild);
        let addressWrap = document.getElementById('address');
        while (addressWrap.firstChild) addressWrap.removeChild(addressWrap.firstChild);
        let contactEmailWrap = document.getElementById('contact-email');
        while (contactEmailWrap.firstChild) contactEmailWrap.removeChild(contactEmailWrap.firstChild);
        let imageUrlWrap = document.getElementById('img-url');
        while (imageUrlWrap.firstChild) imageUrlWrap.removeChild(imageUrlWrap.firstChild);
        let summaryWrap = document.getElementById('summary');
        while (summaryWrap.firstChild) summaryWrap.removeChild(summaryWrap.firstChild);
        let plantsWrap = document.getElementById('plants');
        while (plantsWrap.firstChild) plantsWrap.removeChild(plantsWrap.firstChild);
        let hasGardenWrapper = document.getElementById('has-garden');
        while (hasGardenWrapper.firstChild) hasGardenWrapper.removeChild(hasGardenWrapper.firstChild);
        let needsGardenWrapper = document.getElementById('needs-garden');
        while (needsGardenWrapper.firstChild) needsGardenWrapper.removeChild(needsGardenWrapper.firstChild);
        let organicWrapper = document.getElementById('organic');
        while (organicWrapper.firstChild) organicWrapper.removeChild(organicWrapper.firstChild);
        let petsWrapper = document.getElementById('pets');
        while (petsWrapper.firstChild) petsWrapper.removeChild(petsWrapper.firstChild);
        let ageWrapper = document.getElementById('age');
        while (ageWrapper.firstChild) ageWrapper.removeChild(ageWrapper.firstChild);
        let hoursWrapper = document.getElementById('hours');
        while (hoursWrapper.firstChild) hoursWrapper.removeChild(hoursWrapper.firstChild);
    }

    //adding event listeners to click events
    document.addEventListener("click", (event) => {
        if (event.target.matches("#edit")) {
            event.preventDefault();
            enableEditing(userObject);
        } else if (event.target.matches("#cancel")) {
            event.preventDefault();
            cancelEditing();

        } else if (event.target.matches("#confirm")) {
            event.preventDefault();
            confirmEdits();
        } else {
            return false;
        }
    })
    function enableEditing(obj) {
        console.log(obj);
        divEmpty();
        let userNameContext = document.createElement('p');
        userNameContext.textContent = 'Username: ';
        let userNameInput = document.createElement("input");
        userNameInput.setAttribute("value", obj.userName);
        userNameInput.setAttribute("name", "username");
        userNameInput.classList.add('user-input');
        document.getElementById("user-name").append(userNameContext, userNameInput);

        let addressContext = document.createElement('p');
        addressContext.textContent = 'Address: ';
        let addressInput = document.createElement("input");
        addressInput.setAttribute("value", obj.address);
        addressInput.setAttribute("name", "address");
        addressInput.classList.add('user-input');
        document.getElementById("address").append(addressContext, addressInput);

        let emailContext = document.createElement('p');
        emailContext.textContent = 'contact Email: ';
        let emailInput = document.createElement("input");
        emailInput.setAttribute("value", obj.contactEmail);
        emailInput.setAttribute("name", "contactEmail");
        emailInput.classList.add('user-input');
        document.getElementById("contact-email").append(emailContext, emailInput);

        let imgContext = document.createElement('p');
        imgContext.textContent = 'image Url: ';
        let imgUrlInput = document.createElement("input");
        imgUrlInput.setAttribute("value", obj.imageUrl);
        imgUrlInput.setAttribute("name", "imgUrl");
        imgUrlInput.classList.add('user-input');
        document.getElementById("img-url").append(imgContext, imgUrlInput);

        let summaryContext = document.createElement("p");
        summaryContext.textContent = 'Summary: ';
        let summaryInput = document.createElement("textarea");
        summaryInput.setAttribute('name', 'summary');
        summaryInput.setAttribute('maxlength', '500');
        summaryInput.classList.add('user-input');
        summaryInput.textContent = obj.summary;
        document.getElementById('summary').append(summaryContext, summaryInput);

        let plantContext = document.createElement("p");
        plantContext.textContent = 'plant preferences: ';
        let plantInput = document.createElement("textarea");
        plantInput.setAttribute('name', 'plants');
        plantInput.setAttribute('maxlength', '500');
        plantInput.classList.add('user-input');
        plantInput.textContent = obj.plants;
        document.getElementById('plants').append(plantContext, plantInput);


        let gardenLabel = document.createElement("label");
        let gardenContext = document.createElement("span");
        gardenContext.textContent = "I have a garden";
        let gardenInput = document.createElement("input");
        gardenInput.setAttribute("type", "checkbox");
        gardenInput.setAttribute("name", "hasgarden");
        gardenInput.classList.add("filled-in");
        gardenLabel.append(gardenInput, gardenContext);
        document.getElementById("has-garden").append(gardenLabel);

        let needsGardenLabel = document.createElement("label");
        let needsGardenContext = document.createElement("span");
        needsGardenContext.textContent = "I need a garden";
        let needsGardenInput = document.createElement("input");
        needsGardenInput.setAttribute("type", "checkbox");
        needsGardenInput.setAttribute("name", "needsgarden");
        needsGardenInput.classList.add("filled-in");
        needsGardenLabel.append(needsGardenInput, needsGardenContext);
        document.getElementById("needs-garden").append(needsGardenLabel);

        let organicLabel = document.createElement("label");
        let organicContext = document.createElement("span");
        organicContext.textContent = "Organic produce only";
        let organicInput = document.createElement("input");
        organicInput.setAttribute("type", "checkbox");
        organicInput.setAttribute("name", "organic");
        organicInput.classList.add("filled-in");
        organicLabel.append(organicInput, organicContext);
        document.getElementById("organic").append(organicLabel);

        let petsLabel = document.createElement("label");
        let petsContext = document.createElement("span");
        petsContext.textContent = "pet friendly";
        let petsInput = document.createElement("input");
        petsInput.setAttribute("type", "checkbox");
        petsInput.setAttribute("name", "pets");
        petsInput.classList.add("filled-in");
        petsLabel.append(petsInput, petsContext);
        document.getElementById("pets").append(petsLabel);

        let ageContext = document.createElement('p');
        ageContext.textContent = 'Age: ';
        let ageInput = document.createElement("input");
        ageInput.setAttribute("value", obj.age);
        ageInput.setAttribute("name", "age");
        ageInput.classList.add('user-input');
        document.getElementById("age").append(ageContext, ageInput);

        let hoursContext = document.createElement('p');
        hoursContext.textContent = 'Hours available/needed: ';
        let hoursInput = document.createElement("input");
        hoursInput.setAttribute("value", obj.hours);
        hoursInput.setAttribute("type", "number");
        hoursInput.setAttribute("name", "hours");
        hoursInput.classList.add('user-input');
        document.getElementById("hours").append(hoursContext, hoursInput);

        let avatarDisplayWrapper = document.getElementById('user-display-row');
        avatarDisplayWrapper.style.display = "none";
        // while (avatarDisplayWrapper.firstChild) avatarDisplayWrapper.removeChild(avatarDisplayWrapper.firstChild);
        let avatarRow = document.getElementById("avatar-options-row");
        avatarRow.style.display = "inline-block";
        let cancelButton = document.getElementById("cancel");
        let confirmButton = document.getElementById("confirm");
        let editButton = document.getElementById('edit');
        editButton.style.display = "none";
        cancelButton.style.display = "inline-block";
        confirmButton.style.display = "inline-block";
    }
    function cancelEditing() {
        let avatarDisplayWrapper = document.getElementById('user-display-row');
        avatarDisplayWrapper.style.display = "inline-block";
        // while (avatarDisplayWrapper.firstChild) avatarDisplayWrapper.removeChild(avatarDisplayWrapper.firstChild);
        let avatarRow = document.getElementById("avatar-options-row");
        avatarRow.style.display = "none";
        let cancelButton = document.getElementById("cancel");
        let confirmButton = document.getElementById("confirm");
        let editButton = document.getElementById('edit');
        editButton.style.display = "inline-block";
        cancelButton.style.display = "none";
        confirmButton.style.display = "none";
        profileCall();
    }

    function confirmEdits() {
        console.log(userObject);
        let userName = document.getElementById('user-name').lastChild.value;
        let address = document.getElementById('address').lastChild.value;
        let contactEmail = document.getElementById('contact-email').lastChild.value;
        let imgUrl = document.getElementById('img-url').lastChild.value;
        let summary = document.getElementById('summary').lastChild.value;
        let plants = document.getElementById('plants').lastChild.value;
        let hasGarden = document.getElementById("has-garden").firstChild.firstChild.checked;
        let needsGarden = document.getElementById("needs-garden").firstChild.firstChild.checked;
        let organic = document.getElementById("organic").firstChild.firstChild.checked;
        let pets = document.getElementById("pets").firstChild.firstChild.checked;
        let age = document.getElementById('age').lastChild.value;
        let hours = document.getElementById('hours').lastChild.value;
        let avatar = document.querySelector('input[name="avatar"]:checked').value;
        if (userName && address && contactEmail && imgUrl && summary && plants && age && hours) {

            userObject.userName = userName;
            userObject.address = address;
            userObject.contactEmail = contactEmail;
            userObject.imgUrl = imgUrl;
            userObject.summary = summary;
            userObject.plants = plants;
            userObject.hasGarden = hasGarden;
            userObject.needsGarden = needsGarden;
            userObject.organic = organic;
            userObject.pets = pets;
            userObject.age = age;
            userObject.hours = hours;
            userObject.avatar = avatar;

            console.log(userObject);
            putAjax('/api/update-user/' + userObject.id, userObject, function (data) {
                console.log(data);
                window.location.assign('/profile');


            })
        } else {
            alert('please put something for every option.');
        }
    }


    function putAjax(url, data, success) {
        var params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');

        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('PUT', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 3 && xhr.status == 200) { success(xhr.responseText); }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
        return xhr;
    }



})