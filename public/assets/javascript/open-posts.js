document.addEventListener("DOMContentLoaded", ()=>{
postsPull();

document.addEventListener("click", function(event){
if (event.target.matches('#new-post')){
    event.preventDefault();
    showPostForm();
} else if (event.target.matches("#submit-post")){
    event.preventDefault();
    submitPostForm();
} else {
    return false;
}
})

function showPostForm(){
    let form = document.getElementById("postform");
    form.style.display = 'block';
    let button = document.getElementById("new-post");
    button.style.display='none';
}

function submitPostForm(){
    let form = document.forms.postform;
    let title = form.elements.title.value.trim();
    let message = form.elements.body.value.trim();
    if(title && message ){
        postRequest(title, message);
    }

}
function postRequest(title, message){
    let userObject = {
        title: title,
        message: message,
        user: window.localStorage.getItem("username")
    }

    postAjax('/api/posts', userObject, function (data) {
        console.log(data);
        if(data){
            window.location.assign('/open-posts');
        }
       
    })

}

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



function postsPull(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log('success!', xhr);
            if (xhr.response !== "[]") {
                postsPopulate(JSON.parse(xhr.response));
            } else {
                console.log('response is empty' + xhr.response);
            }
        } else {
            console.log(xhr, xhr.status);
        }
    };
    xhr.open('GET', '/api/posts');
    xhr.send();
}    
function postsPopulate(array){
    console.log(array);
    array.map((obj)=>{
        let postWrapper = document.createElement("div");
        postWrapper.classList.add("post-wrapper");
        let title = document.createElement('h3');
        title.textContent = obj.title;
        let userName = document.createElement("p");
        userName.textContent = obj.user;
        let postBody = document.createElement("div");
        postBody.textContent = obj.message;
        postWrapper.append(title, userName, postBody);
        document.getElementById("post-dump").prepend(postWrapper);
    })
}



})