document.addEventListener("DOMContentLoaded", ()=>{
postsPull();


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
        document.getElementById("post-dump").append(postWrapper);
    })
}



})