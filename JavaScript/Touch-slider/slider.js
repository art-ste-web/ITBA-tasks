const slideLeftBtn = document.querySelector('.left-btn');
const slideRightBtn = document.querySelector('.right-btn');
const slides = document.querySelectorAll('.slide');

slideLeftBtn.addEventListener('click', slideLeft);
slideRightBtn.addEventListener('click', slideRight);

function slideLeft() {
    const slideDist = slides[0].offsetWidth;
    console.log('dist '+slideDist);
    let curMarg = parseInt(window.getComputedStyle(slides[0], null).marginLeft);
    console.log(curMarg);
    if(curMarg === 0) {
        slides[0].style.marginLeft = `-${slideDist}px`;
    }
    else {
        slides[0].style.marginLeft = `-${Math.abs(curMarg)+slideDist}px`;
        if( Math.abs(curMarg) === slideDist*(slides.length-1)) {
            slides[0].style.marginLeft = 0;
            console.log('dfsd');
        }
    }
    
    
    

}

function slideRight() {
    const slideDist = slides[0].offsetWidth;
    console.log('dist '+slideDist);
    let curMarg = parseInt(window.getComputedStyle(slides[0], null).marginLeft);
    console.log(curMarg);
    if(curMarg === 0) {
        slides[0].style.marginLeft = `-${slideDist}px`;
    }
    else {
        slides[0].style.marginLeft = `-${Math.abs(curMarg)+slideDist}px`;
        if( Math.abs(curMarg) === slideDist*(slides.length-1) || Math.abs(curMarg) > slideDist*(slides.length-1)) {
            slides[0].style.marginLeft = 0;
            console.log('end');
        }
    }

}