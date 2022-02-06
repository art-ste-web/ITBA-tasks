import sliderData from "./slider-data.js";
console.log(sliderData.imagesUrl);

class TouchSlider {
    constructor() {
        this.sliderSliderEl = document.querySelector('.slider-container');
        this.slideLeftBtn = document.querySelector('.left-btn');
        this.slideRightBtn = document.querySelector('.right-btn');
        this.slides = document.querySelectorAll('.slide');
        this.sliderNav = document.querySelector('.slider-navigation');
    }
    sliderInit() {
        if(this.sliderSliderEl) {
            console.log('slider exist');
            const slideWidth = this.slides[0].offsetWidth;
            this.setActiveSlidePos(slideWidth);
            this.slideLeftBtn.addEventListener('click', ()=>{
                this.slideLeft(slideWidth)
                this.trackNavigation(slideWidth)
            });
            this.slideRightBtn.addEventListener('click', ()=>{
                this.slideRight(slideWidth)
                this.trackNavigation(slideWidth)
            });
        }
        else {
            console.log('slider does not exist');
        }
    }

    getActiveSlideIndex(){
        let activeSlideIndex;
        for(let i=0; i<this.slides.length; i++) {
            if(this.slides[i].classList.contains('active-slide')) {
                activeSlideIndex = i;
                // console.log('active slide # '+activeSlideIndex);
               
            }
            
        }
        if(!activeSlideIndex) {
            this.slides[0].classList.add('active-slide');
            activeSlideIndex = 0;
            // console.log('no active slide');
        }
        return activeSlideIndex;        
    }

    setActiveSlidePos(slideWidth) {
        let activeSlideIndex = this.getActiveSlideIndex();
        console.log('act ind '+activeSlideIndex);
        this.slides[0].style.marginLeft = `-${slideWidth*activeSlideIndex}px`;
    }

    slideLeft(slideWidth) {
        
        console.log('dist '+slideWidth);
        let curMarg = parseInt(window.getComputedStyle(this.slides[0], null).marginLeft);
        console.log(curMarg);
        if(curMarg === 0) {
            this.slides[0].style.marginLeft = `-${slideWidth*(this.slides.length-1)}px`;
            console.log('end left slide');
        }
        else if(curMarg<0) {
            this.slides[0].style.marginLeft = `${curMarg+slideWidth}px`;
            console.log('left < 0');
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

    trackNavigation(slideWidth) {
        let curMarg = parseInt(window.getComputedStyle(this.slides[0], null).marginLeft);
        console.log('nav '+curMarg);
        let currentIndex = (Math.abs(curMarg)-slideWidth)/slideWidth;
        if(currentIndex<0) {
            currentIndex = this.slides.length-1;
        }
        
        console.log(currentIndex);
    }

}


let mySlider = new TouchSlider;
mySlider.sliderInit();


