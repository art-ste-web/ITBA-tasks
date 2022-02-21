


function generateRandomNumber(startNum, endNum) {
    const randomNum = Math.random() * (endNum - startNum) + startNum;
    console.log(randomNum.toFixed(0));
    return +randomNum.toFixed(0);
}

function gameStart() {
    let randomNumber = null;
    let settings = null;
    const startBtn = document.getElementById('start_game_btn');
    //confirm setting and start game
    startBtn.addEventListener('click', ()=>{
        hideSettingsBlock();
        showGameBlock();
        settings = getInitialSettings();
        const startNum = +settings.startNumb;
        const endNum = +settings.endNumb;
        randomNumber = generateRandomNumber(startNum, endNum);
        console.log(randomNumber);
        showGameMessage(`Введіть число в діапазоні від ${startNum} до ${endNum}`);
    });
    
    let count = 0;
    let checkedNums = [];

    //check user number
    const checkNumBtn = document.getElementById('check_numb_btn');
    checkNumBtn.addEventListener('click', ()=>{
        const userNumbInput = document.getElementById('enter_numb');
        const userNumb = +userNumbInput.value;
        checkUserNumber(count, userNumb, checkedNums, randomNumber, settings);
    })
}

function checkUserNumber(count, userNumb, checkedNums, randomNumber, settings) {
    
    if(!userNumb) {
        showGameMessage('Ви не ввели число! Введіть число.');
        return
    }
    for(let i=0; i<checkedNums.length; i++) {
        if(checkedNums[i]===userNumb){
            showGameMessage('Це число вже було, введіть інше');
            return
        }
    }
    if(userNumb > randomNumber) {
        showGameMessage(`Загадане число менше ${userNumb}`);
        showNumbersList(`${String(checkedNums)} Кількість спроб: ${settings.attemptsNumb - count}`);
    } else if(userNumb < randomNumber) {
        showGameMessage(`Загадане число більше ${userNumb}`);
        showNumbersList(`${String(checkedNums)} Кількість спроб: ${settings.attemptsNumb - count}`);
    } else if(userNumb === randomNumber) {
        showGameMessage(`Вітаємо! Ви вгадали число ${randomNumber}. Натисніть "Нова гра", щоб зіграти ще`);
        showNumbersList(`${String(checkedNums)} Кількість спроб: ${settings.attemptsNumb - count}`);
        return
    } else if(count === +settings.attemptsNumb) {
        showGameMessage('Нажаль Ви програли...');
        count = 1;
        return
    }
    
    count++;
    checkedNums.push(userNumb);
    
    console.log(checkedNums);
    
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

function showNumbersList(numList) {
    const numListEl = document.querySelector('.app-form__attempts-nums');
    numListEl.innerText = `Ви вже спробували числа: ${numList}`;
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
//getInitialSettings();

//generateRandomNumber(10, 20);
gameStart()