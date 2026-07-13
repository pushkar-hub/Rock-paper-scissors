let score = JSON.parse(localStorage.getItem('score'))

if(!score){
    score={
        Win:0,
        Loss:0,
        Tie:0
    }
}  

updateScore();

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playgame(playerMove); 
        }, 1000);
        isAutoPlaying = true;
        document.querySelector('.js-autoPlay-button').innerHTML = 'Stop Play';
    }else{
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.js-autoPlay-button').innerHTML = 'Auto Play';
    }
   
}

function resetScore() {
    document.querySelector('.js-warning')
        .innerHTML =`Are you sure want to reset the score?
                    <button class='js-yes-button yes-button'>
                        Yes
                    </button>
                    <button class='js-no-button no-button'>
                        No
                    </button>`;

    document.querySelector('.js-yes-button').addEventListener('click', () => {
        score.Win = 0;
        score.Loss = 0;
        score.Tie = 0;
        localStorage.removeItem('score');
        updateScore();
        document.querySelector('.js-warning').innerHTML = '';
    });
    document.querySelector('.js-no-button').addEventListener('click', () => {
        document.querySelector('.js-warning').innerHTML = '';
    });
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playgame('Rock');      
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playgame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playgame('Scissors');  
});

document.querySelector('.js-reset-score-button').addEventListener('click', () =>{
    resetScore();
});

document.querySelector('.js-autoPlay-button').addEventListener('click', () => autoPlay());

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        playgame('Rock');
    }else if(event.key === 'p'){
        playgame('Paper');
    }else if(event.key === 's'){
        playgame('Scissors');
    }else if(event.key === 'a'){
        autoPlay();
    }else if(event.key === 'Backspace'){
        resetScore();
    }
});

function playgame(playerMove){
    computerMove = pickComputerMove();
    let result = '';
  
    if(playerMove === 'Scissors'){
        if (computerMove === 'Rock'){
            result = 'You Lose';
        }
        else if (computerMove === 'Paper'){
            result = 'You Win';
        }
        else if (computerMove === 'Scissors'){
            result = 'Tie';
        }
   
    }else if(playerMove === 'Paper'){
        if (computerMove === 'Rock'){
            result = 'You Win';
        }
        else if (computerMove === 'Paper'){
            result = 'Tie';
        }
        else if (computerMove === 'Scissors'){
            result = 'You Lose';
        }
   
    }else if(playerMove === 'Rock'){
        if (computerMove === 'Rock'){
            result = 'Tie';
        }
        else if (computerMove === 'Paper'){
            result = 'You Lose';
        }
        else if (computerMove === 'Scissors'){
            result = 'You Win';
        }
    }

    if(result==='You Win'){
        score.Win+=1;
    }else if(result==='You Lose'){
        score.Loss+=1;
    }else if(result==='Tie'){
        score.Tie+=1;
    }

    localStorage.setItem('score',JSON.stringify(score));
    
    updateScore();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-move')
        .innerHTML = ` You
                    <img src="images/${playerMove}-emoji.png" class="move-icon">
                    <img src="images/${computerMove}-emoji.png" class="move-icon">
                    Computer`;
}

function pickComputerMove(){
    randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber>0 && 1/3>randomNumber){
        computerMove = 'Rock';
    }
    else if (randomNumber>1/3 && 2/3>randomNumber){
        computerMove = 'Paper';
    }
    else if (randomNumber>2/3 && 1>randomNumber){
        computerMove = 'Scissors';
    }

    return computerMove;
}

function updateScore(){
    document.querySelector('.js-score')
        .innerHTML =`Wins: ${score.Win}, Losses: ${score.Loss}, Ties: ${score.Tie}`;
}
