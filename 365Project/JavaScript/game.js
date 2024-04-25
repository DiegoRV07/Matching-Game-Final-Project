let moves = 0
let score = 0
let minute = 0
let second = 0
let maxScore = 6
let userArray = []
let gameArray = []
let imagePath = ["images/catontree.png",
                "images/dog.png",
                "images/penguin.png",
                "images/gorilla.png",
                "images/prairiedog.png",
                "images/capybara.png"]



let cardCollect = document.querySelectorAll(".card")
let moveCount = document.querySelector(".count")
let scoreCount = document.querySelector(".scoreCount")
let startButton = document.querySelector(".startButton")
let timeCount = document.querySelector(".time")
let timerInterval;



// Start the Game and Timer: Only when the Start button is pressed

startButton.addEventListener('click', function startGame() {
    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        let formattedTime = `${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
        timeCount.innerHTML = formattedTime;
    }, 1000);
    resetGame();
});

function showCard(card){
    let backImg = card.querySelector('.back img');
    let cardID = parseInt(card.id.split('-')[1], 10);
    backImg.src = imagePath[cardID % imagePath.length];
    card.classList.add('flipped')
}



// Get the Users Clicks.

cardCollect.forEach(card => {
    card.addEventListener('click', function userClick(idGrabber){
        let userChoice = idGrabber.currentTarget;
        if (card.dataset.flipped === 'false'){

            card.dataset.flipped = 'true';
            showCard(userChoice);
            userArray.push(userChoice);
            
            if (userArray.length === 2){
                checkArray(); 
            }
        };
    });
});

// Logic of the Game: Checks if the pair of clicks are correct.

function checkArray(){
    if (userArray.length == 2){
        const [firstCard, secondCard] = userArray;

        if (firstCard.id === secondCard.id){
        
            score++;
            userArray = [];

        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');

                let firstImage = firstCard.querySelector('.back img');
                let secondImage = secondCard.querySelector('.back img');
                
                firstCard.dataset.flipped = 'false';
                secondCard.dataset.flipped = 'false';

                // firstImage.style.display = 'none';
                // secondImage.style.display = 'none';
                
                
            }, 1000);
        };
        moves++;
        scoreCount.innerHTML = score;
        moveCount.innerHTML = moves;
        endGame();
        userArray = [];
    };
};


// Card shuffler and pair makers. Only after start is pressed it sets ID's to the cards.
// Also attaches images to the back of the cards. 

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleAndAssignCards() {
    let shuffledIndices = Array.from({length: cardCollect.length}, (_, i) => i);
    shuffleArray(shuffledIndices);

    let cardPairs = [];
    for (let i = 0; i < shuffledIndices.length; i++) {
        cardPairs[i] = Math.floor(shuffledIndices[i] / 2);
    }

    cardCollect.forEach((card, index) => {
        let pairID = cardPairs[index]
        card.id = `card-${pairID}`;
        card.dataset.flipped = 'false';
        card.classList.remove('flipped');

    
    });
};




// Game reset functions. After the user has reached a score of 6.

function endGame(){
    if (score == maxScore){
        alert("You Win");
        clearInterval(timerInterval);
        resetGame();
    };
};

function resetGame(){
    score = 0;
    moves = 0;
    minute = 0;
    second = 0;

    scoreCount.innerHTML = '0';
    moveCount.innerHTML = '0';
    timeCount.innerHTML = '00:00';

    cardCollect.forEach((card) => {
        card.dataset.flipped = 'false';
        card.classList.remove('flipped');
        let backImg = card.querySelector('.back img');
        backImg.src = '';
    });
    shuffleAndAssignCards();
};




// startButton.addEventListener('click', function startTimer(timer){
//     if (timer){
//         setInterval(function(){
//             second++
//             if (second == 60){
//                 minute++;
//                 second = 0;
//             }
//             setTimeout(1000);
//             let formattedTime = (minute < 10 ? "0" : "") + minute + ":" + (second < 10 ? "0" : "") + second;
//             timeCount.innerHTML = formattedTime;
//         }, 1000);
//     };
//     setupCards();
// });


// function setupCards() {
//     let indices = Array.from({length: cardCollect.length}, (_, i) => i);
//     shuffleArray(indices);
//     let pairedIndices = [];
    
//     indices.forEach((index, i) => {
//         pairedIndices.push(Math.floor(i / 2));
//     });
    
//     cardCollect.forEach((card, i) => {
//         card.setAttribute('id', `card-${pairedIndices[i]}`);
//         let backImg = card.querySelector('.back');
//         backImg.style.backgroundImage = `url(${imagePath[pairedIndices[i] % imagePath.length]})`;
//     });
// };



