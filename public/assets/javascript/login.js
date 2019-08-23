 console.log('log in connected');

 window.addEventListener('click', function(event){
     event.preventDefault();
storageCheck();
     
 })


let storageCheck = function(){
    if(window.localStorage.getItem('user-email')){
        storeUser();
    } else {
    setTimeout(() => {
        storageCheck();
    }, 100);
}
}

function storeUser(){
    let userEmail = window.localStorage.getItem('user-email');
    console.log(userEmail);
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('success!', xhr);
        } else {
            console.log(xhr, xhr.status);
        }
    };
    xhr.open('GET', '/api/user-profiles/' + userEmail );
    xhr.send();
}