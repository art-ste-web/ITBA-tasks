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
    let activePlayer = 'player1';
    const gameSet = getGameSettings();
    const rollBtn = document.querySelector('.btn-roll');
    const attemptsNumTotal = document.querySelector('.total-attempts');
    const attemptsNumRemain = document.querySelector('.cur-attempt');

    
    attemptsNumRemain.innerHTML = gameSet.attemptNum;
    attemptsNumTotal.innerHTML = gameSet.attemptNum;
    changeActivePlayer(activePlayer);
    rollBtn.addEventListener('click',()=>{
        
        attemptsNumRemain.innerHTML = gameSet.attemptNum -= 1;
        if(gameSet.attemptNum === 0) {
            activePlayer = 'player2';
        }
        changeActivePlayer(activePlayer);
        generateDiceNumbers();
        console.log('click');
    })



}

//generate random numbers for dice
function generateDiceNumbers() {
    let diceOne = Math.floor(Math.random()*6);
    let diceTwo = Math.floor(Math.random()*6);
    let totalScore = (diceOne+1)+(diceTwo+1);
    console.log(totalScore);
}

//change active player
function changeActivePlayer(activePlayer) {
    const gameSet = getGameSettings();
    const playerOnePanel = document.querySelector('.player-1-panel');
    const playerTwoPanel = document.querySelector('.player-2-panel');
    const attemptsNumPlayerName = document.querySelector('.cur-pl-name');
    if(activePlayer === 'player1') {
        playerOnePanel.classList.add('active');
        playerTwoPanel.classList.remove('active');
        attemptsNumPlayerName.innerHTML = gameSet.pOneName;
    }
    else if (activePlayer === 'player2') {
        playerTwoPanel.classList.add('active');
        playerOnePanel.classList.remove('active');
        attemptsNumPlayerName.innerHTML = gameSet.pTwoName;
    }
}