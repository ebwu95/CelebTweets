console.log("hello world")

const counter = document.querySelector('#scoreCount')
counter.innerText = localStorage.score
console.log(localStorage.score)

function gamepage(){
    localStorage.score = 0
    location.replace("index.html");
  }