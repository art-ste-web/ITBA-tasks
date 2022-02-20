


function generateRandomNumber(startNum, endNum) {
    const randomNum = Math.random() * (endNum - startNum) + startNum;
    console.log(randomNum.toFixed(0));
    return randomNum.toFixed(0);
}

function gameStart() {
    const startBtn = document.getElementById('start_game_btn');
    startBtn.addEventListener('click', ()=>{
        hideSettingsBlock();
        showGameBlock();
    });
    let count = 0;
    let prevNum = [];
    const checkNumBtn = document.getElementById('check_numb_btn');
    checkNumBtn.addEventListener('click', ()=>{
        
        const userNumbInput = document.getElementById('enter_numb');
        if(!userNumbInput.value) {
            showGameMessage('Ви не ввели число! Введіть число.')
            return
        }
        for(let i=0; i<prevNum.length; i++) {
            if(prevNum[i]===+userNumbInput.value){
                showGameMessage('Це число вже було...');
                return
            }
        }
        count++;
        checkUserNumber(count, prevNum);
        console.log(prevNum);
    })
}

function checkUserNumber(count, prevNum) {
    
    const userNumbInput = document.getElementById('enter_numb');
    // if(!userNumbInput.value) {
    //     showGameMessage('Ви не ввели число! Введіть число.')
    // }
    prevNum.push(+userNumbInput.value);
    console.log(userNumbInput.value);
    const settings = getInitialSettings();
    
    
    console.log(count, +settings.attemptsNumb);
    if(count === +settings.attemptsNumb) {
        showGameMessage('Нажаль Ви програли...');
        count = 0;
    }
    
}


function getInitialSettings() {
    const numbFromInput = document.getElementById('start_numb');
    const numbToInput = document.getElementById('end_numb');
    const attemptsInput = document.getElementById('attempts');
    const gameSettings = {
        startNumb: numbFromInput.value,
        endNumb: numbToInput.value,
        attemptsNumb: attemptsInput.value
    }
    console.log(gameSettings);
    return gameSettings;
}

function showGameMessage(message) {
    const messageBlock = document.querySelector('.app-form__game-message');
    messageBlock.textContent = message;
}

function hideSettingsBlock() {
    const settingsBlock = document.querySelector('.app-form__initial-settings');
    settingsBlock.style.height = 0;
    settingsBlock.style.opacity = 0;
    console.log('start');
}

function showGameBlock() {
    const gameBlock = document.querySelector('.app-form__guess-number-block');
    gameBlock.style.opacity = 1;
}
getInitialSettings();

generateRandomNumber(10, 20);
gameStart()