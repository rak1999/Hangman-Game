const word = ["apple" , "book" , "cat" , "peek" , "either"];
const randomword = word[Math.floor(Math.random()*word.length)];
const visitedArray = [];
const correctChar = [];
const wrongChar = [];
const hangmanBody = document.querySelectorAll('.figure-part');

function showChar(){
    document.getElementById('word').innerHTML = 
    `
    ${randomword.split("").map((letter) => 
        `
        <span class = "letter">
            ${correctChar.includes(letter) ? letter : ""}
        </span>

        `
    ).join("")}

    `;

    const guessesWOrd = document.getElementById('word').innerText.replace(/\n/g,"");
    if(guessesWOrd === randomword) {
        alert("You Won The Game !");
        wrongChar.splice(0);
        correctChar.splice(0);
        visitedArray.splice(0);
        showChar();
    }
}

function updateIncorrectChar(){
    document.getElementById('wrong-letter-container').innerHTML =
    `
    ${wrongChar.length>=1 ? "<p> Wrong Char Guesses" : ""}
    ${wrongChar.map((letter) => 
        `
        <span> ${letter} </span>

        `
        )}

    `;

    hangmanBody.forEach((ele , index) => {
        const numOfIncorrectGuess = wrongChar.length;
        //console.log("Printing" + numOfIncorrectGuess + " " + wrongChar.length);
        if(index < numOfIncorrectGuess){
            ele.style.display = "block";
        } else {
            ele.style.display = "none";
        }
    })

    if(wrongChar.length === hangmanBody.length){
        alert("You Lost The Game!")
    }
}

function showNotification(){
    document.getElementById("notification-container").style.display = "block";
    setTimeout(() => {
        document.getElementById("notification-container").style.display = "none";
    },3000);
}

document.getElementById("notification-container").style.display = "none";
showChar();

window.addEventListener("keydown" , (e) =>{
    console.log(e.key);
    if(e.key>= 'a' && e.key <= 'z') {
        if(visitedArray.includes(e.key)){
            showNotification();
        } else {
            visitedArray.push(e.key);
            if(randomword.includes(e.key)){
                correctChar.push(e.key);
                showChar();
            } else {
                wrongChar.push(e.key);
                updateIncorrectChar();
            }
        }
    } else {
        console.log("Bad Character");
    }
})