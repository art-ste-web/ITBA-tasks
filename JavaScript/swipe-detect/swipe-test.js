const touchpad = document.querySelector('.touch-pad');
let x1 = null;
let y1 = null;

touchpad.addEventListener('touchstart', (event)=>{
    console.log(event);
    x1 = Math.round(event.touches[0].clientX);
    y1 = Math.round(event.touches[0].clientY);
    displayStartCoord(x1, y1);
});
touchpad.addEventListener('touchmove', (event)=>{
    if(!x1 || !y1) {
        return false;
    }
    let x2 = Math.round(event.touches[0].clientX);
    let y2 = Math.round(event.touches[0].clientY);
    displayMoveCoord(x2, y2);
    let xDif = x2 - x1;
    let yDif = y2 - y1;
    displayCoordDif(xDif, yDif);
    if(Math.abs(xDif) > Math.abs(yDif)) {
        if(xDif > 0) {
            showDirection('right');
            showDirTxt('+X = Вправо');
            console.log('right');
        }
        else {
            showDirection('left');
            showDirTxt('-X = Вліво')
            console.log('left');
        }
    }
    else {
        if(yDif > 0) {
            showDirection('down');
            showDirTxt('+Y = Вниз');
            console.log('down');
        }
        else {
            showDirection('up');
            showDirTxt('-Y = Вверх');
            console.log('up');
        }
    }
    x1 = null;
    y1 = null;
});


//display data on page
function displayStartCoord(x, y) {
    const tStartXel = document.querySelector('.t-start-x');
    const tStartYel = document.querySelector('.t-start-y');
    tStartXel.textContent = x;
    tStartYel.textContent = y;
}

function displayMoveCoord(x, y) {
    const tEndXel = document.querySelector('.t-end-x');
    const tEndYel = document.querySelector('.t-end-y');
    tEndXel.textContent = x;
    tEndYel.textContent = y;
}

function displayCoordDif(x, y) {
    const xDifEl = document.querySelector('.x-dif');
    const yDifEl = document.querySelector('.y-dif');
    xDifEl.textContent = x;
    yDifEl.textContent = y;
}

function showDirection(direction) {
    const dirEls = document.querySelectorAll('.direction');
    dirEls.forEach(el => {
        el.style.opacity = 0;
        if(el.classList.contains(direction)) {
            el.style.opacity = 1;
        }
    });
}

function showDirTxt(txt) {
    const dirTxtEl = document.querySelector('.dir-txt');
    dirTxtEl.textContent = txt;
}
