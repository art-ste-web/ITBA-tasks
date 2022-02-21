const restartBtn = document.getElementById('new_game_btn');
restartBtn.addEventListener('click', ()=>{
    const result = confirm('Почати гру заново?');
    if (result) {
        window.location.reload();
    }
})


function generateRandomNumber(startNum, endNum) {
    const randomNum = Math.random() * (endNum - startNum) + startNum;
    console.log(randomNum.toFixed(0));
    return +randomNum.toFixed(0);
}

function gameStart() {
    let randomNumber = null;
    let settings = null;
    const minNumIput = document.getElementById('start_numb');
    minNumIput.addEventListener('input', checkMaxRange);

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
        showGameMessage(`Введіть число в діапазоні від <b>${startNum}</b> до <b>${endNum}</b>`);
    });
    
    
    let checkedNums = [];
    let count = 0;
    //check user number
    const checkNumBtn = document.getElementById('check_numb_btn');
    checkNumBtn.addEventListener('click', ()=>{
        
        const userNumbInput = document.getElementById('enter_numb');
        const userNumb = +userNumbInput.value;
        if(!userNumb) {
            showGameMessage('Ви не ввели число! Введіть число.');
            return
        }
        if(userNumb < +settings.startNumb || userNumb > +settings.endNumb) {
            showGameMessage(`Введіть число в діапазоні від <b>${settings.startNumb}</b> до <b>${settings.endNumb}</b>`);
            return
        }
        for(let i=0; i<checkedNums.length; i++) {
            if(checkedNums[i]===userNumb){
                showGameMessage('Це число вже було, введіть інше');
                return
            }
        }
        if(userNumb > randomNumber) {
            count++;
            checkedNums.push(userNumb);
            showGameMessage(`Загадане число менше <b>${userNumb}</b>`);
            showNumbersList(`${String(checkedNums)}    <br>Залишилось спроб: <b>${settings.attemptsNumb - count}</b>`);
            
            console.log('count: '+count);
            if(count === +settings.attemptsNumb) {
                showGameMessage('Нажаль <b>Ви програли...</b> Натисніть "Нова гра", щоб зіграти ще');
                checkNumBtn.disabled = true;
                checkNumBtn.style.opacity = .4;
                //count = 0;
                return
            }
        } else if(userNumb < randomNumber) {
            count++;
            checkedNums.push(userNumb);
            showGameMessage(`Загадане число більше <b>${userNumb}</b>`);
            showNumbersList(`${String(checkedNums)}    <br>Залишилось спроб: <b>${settings.attemptsNumb - count}</b>`);
            console.log('count: '+count);
            if(count === +settings.attemptsNumb) {
                showGameMessage('Нажаль <b>Ви програли...</b> Натисніть "Нова гра", щоб зіграти ще');
                checkNumBtn.disabled = true;
                checkNumBtn.style.opacity = .4;
                //count = 0;
                return
            }
        } else if(userNumb === randomNumber) {
            showGameMessage(`<b>Вітаємо! Ви вгадали число ${randomNumber}</b>. Натисніть "Нова гра", щоб зіграти ще`);
            showNumbersList(`${String(checkedNums)}    <br>Залишилось спроб: <b>${settings.attemptsNumb - count}</b>`);
            checkNumBtn.disabled = true;
            checkNumBtn.style.opacity = .4;
            return
        } else 
           
        console.log(checkedNums);
    })
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
    messageBlock.innerHTML = message;
}

function showNumbersList(numList) {
    const numListEl = document.querySelector('.app-form__attempts-nums');
    numListEl.innerHTML = `Ви вже спробували числа: ${numList}`;
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
    gameBlock.style.height = 'auto';
}

function checkMaxRange() {
    const minNumIput = document.getElementById('start_numb');
    const maxNumInput = document.getElementById('end_numb');
    maxNumInput.setAttribute('min', +minNumIput.value+2);
    if(+maxNumInput.value < +minNumIput.value) {
        maxNumInput.value = +minNumIput.value+2
    }
}


//getInitialSettings();
//checkMaxRange() 
//generateRandomNumber(10, 20);
gameStart()
