const fullButtons = document.querySelectorAll('.answer-container')
for(let fullButton of fullButtons){
  fullButton.classList.toggle('fade')
}
console.log(fullButtons)

function executeScriptElements(containerElement) {
    const scriptElements = containerElement.querySelectorAll("script");
  
    Array.from(scriptElements).forEach((scriptElement) => {
      const clonedElement = document.createElement("script");
  
      Array.from(scriptElement.attributes).forEach((attribute) => {
        clonedElement.setAttribute(attribute.name, attribute.value);
      });
      
      clonedElement.text = scriptElement.text;
  
      scriptElement.parentNode.replaceChild(clonedElement, scriptElement);
    });
}

let ans = 'Kevin Yao' //evan's backend will return the answer


console.log("results.js loaded")
//tweetbox
const twBox = document.querySelector('.tweetbox');
const btns = document.querySelectorAll('.answer-container-item')




for(let btn of btns){

    console.log(btn)
    btn.addEventListener('click', function(e){
        console.log(btn.innerText)
        if(btn.innerText === ans){
            console.log('correct answer')
            const counter = document.querySelector('#scoreCount')
            counter.innerText = Number(counter.innerText)+1
        }
        const realTweet = document.createElement("div")

        realTweet.innerHTML = 
        `
        <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Age limits for people in power seems smart</p>&mdash; Marques Brownlee (@MKBHD) <a href="https://twitter.com/MKBHD/status/1540348372674318339?ref_src=twsrc%5Etfw">June 24, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        `
        executeScriptElements(realTweet)
        twBox.parentNode.replaceChild(realTweet, twBox)
   
      

        //document.body.appendChild(realTweet)
        //console.log(twBox.parentNode)
    })
}