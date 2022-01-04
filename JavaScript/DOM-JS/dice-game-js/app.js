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
    
    let pOneMsg = `${gameSet.pOneName}, roll dice to define who will start the game. A player with less points win.`;
    showMessage(pOneMsg);
    activatePlayerOne();
    
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
    let pTwoMsg = `Now ${getNames.pTwoName} roll dice.`
    showMessage(pTwoMsg);
    const rollBtn = document.querySelector('.btn-roll');
    rollBtn.removeEventListener('click', whoRollFirst);
    let pTwoInitRoll = ()=>{
        let pTwoScore = generateDiceNumbers();
        initScore.push(pTwoScore);
        displayPlayerTwoCurrentScore(pTwoScore);
        rollBtn.removeEventListener('click', pTwoInitRoll);
        if(initScore[0]<initScore[1]) {
            let msg = `${getNames.pOneName} starts game first!`;
            showMessage(msg);
            activatePlayerOne();
            rollBtn.innerHTML = '<img src="img/dice-icon.svg" alt=""> Start!'
        }
        else if(initScore[0]>initScore[1]) {
            let msg = `${getNames.pTwoName} starts game first!`;
            showMessage(msg);
            rollBtn.innerHTML = '<img src="img/dice-icon.svg" alt=""> Start!';
        }
        else {
            let msg = `Both players have same number of points. ${getNames.pOneName} try again!`;
            showMessage(msg);
            rollBtn.innerHTML = '<img src="img/dice-icon.svg" alt=""> Try again!'
            console.log('same number');
            rollBtn.addEventListener('click', whoRollFirst);
        }
        console.log(initScore);
    }
    rollBtn.addEventListener('click', pTwoInitRoll);
    
    
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
    topDicePic.src = `img/d-${diceOne+1}.png`;
    bottomDicePic.src = `img/d-${diceTwo+1}.png`;
    let totalScore = (diceOne+1)+(diceTwo+1);
    return totalScore;
    console.log(totalScore);
}



