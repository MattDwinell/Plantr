 console.log('log in connected');

 window.addEventListener('click', function(event){
     event.preventDefault();
     if(event.target.matches('#sign-in') || (event.target.matches('#register'))){
        storageCheck();
     } else {
         return false;
     }
     
 }, false)


let storageCheck = function(){
    if(window.localStorage.getItem('user-email')){
        storeUser();
    } else {
    setTimeout(() => {
        storageCheck();
    }, 100);
}
}
//checking on log in to see whether or not the firebase user is also in the database as a full-access user.
function storeUser(){
    let userEmail = window.localStorage.getItem('user-email');
    console.log(userEmail);
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('success!', xhr);
            if (xhr.response[0]){
                userAlreadyRegistered();
            } else {
                userRegisterForm();
            }
        } else {
            console.log(xhr, xhr.status);
        }
    };
    xhr.open('GET', '/api/user-profiles/' + userEmail );
    xhr.send();
//after checking to see if the useremail is already in the system, either useralready registered or userregisterform will load. 
function userAlreadyRegistered(){
    console.log('user already registered');
}

function userRegisterForm(){
    console.log('user needs to create an account');

}