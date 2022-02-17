// let playerOneName = 'Player1';
// let playerTwoName = 'Player2';
// let numberOfAttempts = 3;
// let maximumTotalScore = 100;
const newGameBtn = document.querySelector('.btn-new');
const newGameSettingsPopup = document.querySelector('.new-game-popup');
const fullScreenOverlay = document.querySelector('.overlay');

newGameBtn.addEventListener('click', startNewGame);


startNewGame();

//show new game settings pop up
function startNewGame() {
    
    newGameSettingsPopup.style.display = 'block';
    fullScreenOverlay.style.display = 'block';
    const confirmSettingsBtn = document.querySelector('.confirm-settings-btn');
      
    confirmSettingsBtn.addEventListener("click", getNewGameSettings);
}

//get settings from pop up and store to session storage
function getNewGameSettings() {
    const playerOneName = document.querySelector('#player_1_name').value;
    const playerTwoName = document.querySelector('#player_2_name').value;
    const numberOfAttempts = document.querySelector('#attempts_num').value;
    const maximumTotalScore = document.querySelector('#max_score_num').value;
    let gameOptionsValues = {
        pOneName: playerOneName,
        pTwoName: playerTwoName,
        attemptNum: numberOfAttempts,
        maxScore: maximumTotalScore
    };
    newGameSettingsPopup.style.display = 'none';
    fullScreenOverlay.style.display = 'none';
    console.log(gameOptionsValues);
    sessionStorage.setItem('gameSettings', JSON.stringify(gameOptionsValues));
    resetScores();
    setPlayerNames();
    startPlayGame();
}

//reset all score numbers
function resetScores() {
    const playerOneTotalScore = document.querySelector('#p_1_total');
    const playerOneCurrentScore = document.querySelector('#p_1_current');
    const playerTwoTotalScore = document.querySelector('#p_2_total');
    const playerTwoCurrentScore = document.querySelector('#p_2_current');
    playerOneTotalScore.innerHTML = '0';
    playerOneCurrentScore.innerHTML = '0';
    playerTwoTotalScore.innerHTML = '0';
    playerTwoCurrentScore.innerHTML = '0';
}

//read game settings from storage
function getGameSettings() {
    let gameSet = JSON.parse(sessionStorage.getItem('gameSettings'));
    //console.log(gameSet);
    return gameSet;
}

//set player names from settings
function setPlayerNames() {
    const playerOneName = document.querySelector('#p_one_name');
    const playerTwoName = document.querySelector('#p_two_name');
    const getNames = getGameSettings();
    playerOneName.innerHTML = getNames.pOneName;
    playerTwoName.innerHTML = getNames.pTwoName;
     
}

//start game, make active player 1 panel (left)
function startPlayGame() {
    const gameSet = getGameSettings();
    const rollBtn = document.querySelector('.btn-roll');
    const attemptsNumTotal = document.querySelector('.total-attempts');
    const attemptsNumRemain = document.querySelector('.cur-attempt');
    
    let pOneMsg = `<span class='h-text'>${gameSet.pOneName}</span>, roll the dice to play who will start the game. A player with less points win.`;
    showMessage(pOneMsg);
    activatePlayerOne();
    //remove events listeners from roll btn
    rollBtn.removeEventListener('click', pOneRolling);
    rollBtn.removeEventListener('click', pTwoRolling);

    rollBtn.addEventListener('click', whoRollFirst);



}

function showMessage(message) {
    const messageBox = document.querySelector('.message-box');
    messageBox.innerHTML = message;
}

function whoRollFirst() {
    const getNames = getGameSettings();
    let initScore = [];
    let pOneScore = generateDiceNumbers();
    initScore.push(pOneScore);
    displayPlayerOneCurrentScore(pOneScore);
    activatePlayerTwo();
    let pTwoMsg = `Now <span class='h-text'>${getNames.pTwoName}</span> roll the dice.`
    showMessage(pTwoMsg);
    const rollBtn = document.querySelector('.btn-roll');
    rollBtn.removeEventListener('click', whoRollFirst);
    let pTwoInitRoll = ()=>{
        let pTwoScore = generateDiceNumbers();
        initScore.push(pTwoScore);
        displayPlayerTwoCurrentScore(pTwoScore);
        rollBtn.removeEventListener('click', pTwoInitRoll);
        //player one starts game
        if(initScore[0]<initScore[1]) {
            let msg = `<span class='h-text'>${getNames.pOneName}</span> starts the game first! <span class='h-text'>${initScore[0]}</span> less than <span class='h-text'>${initScore[1]}</span>.`;
            showMessage(msg);
            activatePlayerOne();
            rollBtn.innerHTML = '<img src="img/dice-icon.svg" alt=""> Start!'
            let pOneRoundScores = [];
            rollBtn.addEventListener('click', ()=>{
                
                console.log('player one starts');
                resetScores();
                let curScore = generateDiceNumbers();
                let roundScore = curScore;
                console.log(curScore);
                displayPlayerOneCurrentScore(curScore);
                let msg = `Youre score is <span class='h-text'>${curScore}</span>`
                showMessage(msg);
                pOneRoundScores.push(curScore);
                console.log(pOneRoundScores);
            });
        }
        //player two starts game
        else if(initScore[0]>initScore[1]) {
            let msg = `<span class='h-text'>${getNames.pTwoName}</span> starts the game first! <span class='h-text'>${initScore[1]}</span> less than <span class='h-text'>${initScore[0]}</span>.`;
            showMessage(msg);
            rollBtn.innerHTML = '<img src="img/dice-icon.svg" alt=""> Start!';
            rollBtn.addEventListener('click', pTwoRolling);
        }
        else {
            let msg = `Both players have same number of points. <span class='h-text'>${getNames.pOneName}</span> try again!`;
            showMessage(msg);
            rollBtn.innerHTML = '<img src="img/dice-icon.svg" alt=""> Try again!'
            console.log('same number');
            rollBtn.addEventListener('click', whoRollFirst);
        }
        console.log(initScore);
    }
    rollBtn.addEventListener('click', pTwoInitRoll);
    
    
}


function pOneRolling() {
    
    console.log('player one starts');
    resetScores();
    let curScore = generateDiceNumbers();
    let roundScore = curScore;
    console.log(curScore);
    displayPlayerOneCurrentScore(curScore);
    let msg = `Youre score is <span class='h-text'>${curScore}</span>`
    showMessage(msg);
    pOneRoundScores.push(curScore);
    console.log(pOneRoundScores);

}

function pTwoRolling() {
    console.log('player two starts');
    resetScores();
    let curScore = generateDiceNumbers();
    console.log(curScore);
}


function activatePlayerOne() {
    const playerOnePanel = document.querySelector('.player-1-panel');
    const playerTwoPanel = document.querySelector('.player-2-panel');
    playerOnePanel.classList.add('active');
    playerTwoPanel.classList.remove('active');
    
}

function activatePlayerTwo() {
    const playerOnePanel = document.querySelector('.player-1-panel');
    const playerTwoPanel = document.querySelector('.player-2-panel');
    playerTwoPanel.classList.add('active');
    playerOnePanel.classList.remove('active');
}

function displayPlayerOneCurrentScore(score) {
    const playerOneCurrentScore = document.querySelector('#p_1_current');
    playerOneCurrentScore.innerHTML = score;
}

function displayPlayerTwoCurrentScore(score) {
    const playerTwoCurrentScore = document.querySelector('#p_2_current');
    playerTwoCurrentScore.innerHTML = score;
}

//generate random numbers for dice
function generateDiceNumbers() {
    const topDicePic = document.getElementById('dice_1');
    const bottomDicePic = document.getElementById('dice_2');
    let diceOne = Math.floor(Math.random()*6);
    let diceTwo = Math.floor(Math.random()*6);
    let turnAngelDiceOne = (diceOne+1)*6;
    let turnAngelDiceTwo = (diceTwo+1)*3;
    topDicePic.src = `img/d-${diceOne+1}.png`;
    bottomDicePic.src = `img/d-${diceTwo+1}.png`;
    topDicePic.style.transform = `rotate(${turnAngelDiceOne}deg)`;
    bottomDicePic.style.transform = `rotate(${turnAngelDiceTwo}deg)`;
    let totalScore = (diceOne+1)+(diceTwo+1);
    return totalScore;
    console.log(totalScore);
}



