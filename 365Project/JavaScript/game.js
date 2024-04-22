let moves = 0
let score = 0
let minute = 0
let second = 0
let maxScore = 6
let userArray = []
let gameArray = []


let cardCollect = document.querySelectorAll(".card")
let moveCount = document.querySelector(".count")
let scoreCount = document.querySelector(".scoreCount")
let startButton = document.querySelector(".startButton")
let timeCount = document.querySelector(".time")



cardCollect.forEach(card => {
    card.addEventListener('click', function userClick(idGrabber){
        let userChoice = idGrabber.currentTarget.id;
        if (idGrabber){
            userArray.push(userChoice);
            checkArray();
            console.log(score);
        };
        endGame();
    });
});


function checkArray(){
    if (userArray.length == 2){
        if (userArray[0] == userArray[1] ){
            moves++;
            score++;
            scoreCount.innerHTML = score;
            moveCount.innerHTML = moves;
            userArray = [];
        } else if (userArray[0] != userArray[1]) {
            moves++;
            moveCount.innerHTML = moves;
            userArray = [];
        }
    };
};


function endGame(){
    if (score == maxScore){
        alert("You Win")
        score = 0;
        moves = 0;
        minute = 0;
        second = 0;
        scoreCount.innerHTML = moves;

    };
};


startButton.addEventListener('click', function startTimer(timer){
    if (timer){
        setInterval(function(){
            second++
            if (second == 60){
                minute++;
                second = 0;
            }
            setTimeout(1000);
            let formattedTime = (minute < 10 ? "0" : "") + minute + ":" + (second < 10 ? "0" : "") + second;
            timeCount.innerHTML = formattedTime;
        }, 1000);
    };
});






