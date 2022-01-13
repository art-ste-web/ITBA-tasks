

class TouchSlider {
    constructor() {
        this.sliderSliderEl = document.querySelector('.slider-container');
        this.slideLeftBtn = document.querySelector('.left-btn');
        this.slideRightBtn = document.querySelector('.right-btn');
        this.slides = document.querySelectorAll('.slide');
        
    }
    sliderInit() {
        if(this.sliderSliderEl) {
            console.log('slider exist');
            const slideWidth = this.slides[0].offsetWidth;
            this.setActiveSlidePos(slideWidth);
            this.slideLeftBtn.addEventListener('click', ()=>{
                this.slideLeft(slideWidth)
            });
            this.slideRightBtn.addEventListener('click', ()=>{
                this.slideRight(slideWidth)
            });
        }
        else {
            console.log('slider does not exist');
        }
    }
    setActiveSlidePos(slideWidth) {
        let activeSlideIndex;
        for(let i=0; i<this.slides.length; i++) {
            if(this.slides[i].classList.contains('active-slide')) {
                this.slides[0].style.marginLeft = `-${slideWidth*[i]}px`;
                activeSlideIndex = i;
                console.log('active slide # '+activeSlideIndex);
               
            }
            
        }
        if(!activeSlideIndex) {
            this.slides[0].classList.add('active-slide');
            console.log('no active slide');
        }
        return activeSlideIndex;        
    }
    slideLeft(slideWidth) {
        console.log('dist '+slideWidth);
        let curMarg = parseInt(window.getComputedStyle(this.slides[0], null).marginLeft);
        console.log(curMarg);
        if(curMarg === 0) {
            this.slides[0].style.marginLeft = `-${slideWidth}px`;
        }
        else if( Math.abs(curMarg) >= slideWidth*(this.slides.length-1)) {
            this.slides[0].style.marginLeft = 0;
            console.log('end left slide');
        } 
        else {
            this.slides[0].style.marginLeft = `-${Math.abs(curMarg)+slideWidth}px`;
        }
        
    }

    slideRight(slideWidth) {
        console.log('dist '+slideWidth);
        let curMarg = parseInt(window.getComputedStyle(this.slides[0], null).marginLeft);
        console.log(curMarg);
        if(curMarg === 0) {
            this.slides[0].style.marginLeft = `-${slideWidth}px`;
        }
        else {
            this.slides[0].style.marginLeft = `-${Math.abs(curMarg)+slideWidth}px`;
            if( Math.abs(curMarg) === slideWidth*(this.slides.length-1) || Math.abs(curMarg) > slideWidth*(this.slides.length-1)) {
                this.slides[0].style.marginLeft = 0;
                console.log('end right slide');
            }
        }
    
    }

}


let mySlider = new TouchSlider;
mySlider.sliderInit();


