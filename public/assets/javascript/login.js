document.addEventListener("DOMContentLoaded", function () {
    fadeIn();
setTimeout(() => {
    storeUser();
}, 1000);

function fadeIn() {
    let element = document.getElementById("body");
    element.classList.remove("fade-out");
}
function fadeOut() {
    let element = document.getElementById("body");
    element.classList.add("faded-out");

}

window.addEventListener('click', function (event) {
    if (event.target.matches('#sign-in') || (event.target.matches('#register'))) {
        event.preventDefault();
        storageCheck();
    } else if (event.target.matches("#form-register")) {
        event.preventDefault();  
        userFormSubmit();

    } else {
        return false;
    }

}, false)

function userFormSubmit() {

    const form = document.forms.userform;
    const userName = form.elements.username.value.trim();
    const address = form.elements.address.value.trim();
    const contactEmail = form.elements.contactemail.value.trim();
    const imageUrl = form.elements.imageurl.value.trim();
    const summary = form.elements.summary.value.trim();
    const plants = form.elements.plants.value.trim();
    const hasGarden = form.elements.hasgarden.checked;
    const needsGarden = form.elements.needsgarden.checked;
    const organic = form.elements.organic.checked;
    const pets = form.elements.pets.checked;
    const age = form.elements.age.value;
    const hours = form.elements.hours.value;
    const avatar = form.elements.avatar.value;
    const email = window.localStorage.getItem("user-email");
    let newUser = {
        email: email,
        userName: userName,
        address: address,
        contactEmail: contactEmail,
        imageUrl: imageUrl,
        summary: summary,
        plants: plants,
        hasGarden: hasGarden,
        needsGarden: needsGarden,
        organic: organic,
        pets: pets,
        age: age,
        hours: hours,
        avatar: avatar
    }
    console.log(newUser);
    if (!userName) {
        alert('please complete the username field');
        return false;
    }
    if (!address) {
        alert('Please input a valid address so you can find others in your area.');
        return false;
    }
    if (!contactEmail) {
        alert('Please input a valid contact email address');
        return false;
    }
    if (!age) {
        alert('Please input your age');
        return false;
    }
    if (!hours) {
        alert('please estimate the number of hours you have/ would need for gardening each week');
        return false;
    }
    //code for ajax post request will start here

    postAjax('/api/new-user', newUser, function (data) {
        console.log(data);
        profileTransition();
       
    })

}


function profileTransition() {
    fadeOut();
    setTimeout(()=>{
        window.location.assign('/profile')}, 1000);
}

//ajax post request function
function postAjax(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
    ).join('&');

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState > 3 && xhr.status == 200) { success(xhr.responseText); }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
    return xhr;
}

let storageCheck = function () {
    if (window.localStorage.getItem('user-email')) {
        storeUser();
    } else {
        setTimeout(() => {
            storageCheck();
        }, 100);
    }
}
//checking on log in to see whether or not the firebase user is also in the database as a full-access user.
function storeUser() {
    let userEmail = window.localStorage.getItem('user-email');
    console.log(userEmail);
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('success!', xhr);
            if (xhr.response !== "[]") {
                console.log(xhr.response);
                console.log(xhr.response.length);
                userAlreadyRegistered();
            } else {
                console.log('response is empty' + xhr.response);
                userRegisterForm();
            }
        } else {
            console.log(xhr, xhr.status);
        }
    };
    xhr.open('GET', '/api/user-profiles/' + userEmail);
    xhr.send();
}
//after checking to see if the useremail is already in the system, either useralready registered or userregisterform will load. 
function userAlreadyRegistered() {
    console.log('user already registered');
    window.location.assign('/profile')
}

function userRegisterForm() {
    console.log('user needs to create an account');
    // document.getElementById('register-banner').style.display = 'block';

}
})