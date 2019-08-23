var test = document.getElementById('test');
test.onmousedown = ()=>{
    let secondTest = document.createElement("p");
    secondTest.textContent ='endless tests'
    test.append(secondTest);
}