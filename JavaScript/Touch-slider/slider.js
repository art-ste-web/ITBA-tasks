const sliderData = {
        images: [
        {
            url:'./img/img-1.jpg',
            title: 'Image 1'
        },
        {
            url:'./img/img-2.jpg',
            title: 'Image 2'
        },
        {
            url:'./img/img-3.jpg',
            title: 'Image 3'
        },
        {
            url:'./img/img-4.jpg',
            title: 'Image 4'
        },
    ],
    activeSlide: 0,
    isTitle: true,
    isSwipe: true,
    isIndicator: false,
    autoplay: false

}

class SwipeSlider {
    constructor(sliderData) {
        this.sliderData = sliderData;
        this.sliderImages = sliderData.images;
        this.sliderContainer = document.getElementById('slider-container');
    }

    sliderInit() {
        //create slider feed and controls
        const sliderTapeEl = document.querySelector('.slider-tape');
        const sliderControlsEl = document.querySelector('.slider-controls');
        if(!sliderTapeEl && !sliderControlsEl) {
            this.createSliderTape();
            this.createSliderControls();
        }
        this.resizeSlide();
        this.setActiveSlide();
        //slide count
        let slideCount = sliderData.activeSlide;
        const slideWidth = this.sliderContainer.offsetWidth;
        const sliderTape = document.querySelector('.slider-tape');
        sliderTape.style.transform = `translateX(-${slideCount*slideWidth}px)`;
        //slide events
        const slideLeftBtn = document.querySelector('.left-btn');
        const slideRightBtn = document.querySelector('.right-btn');
        //slide left
        slideLeftBtn.addEventListener('click', ()=>{
            slideCount++;
            if(slideCount >= this.sliderImages.length) {
                slideCount = 0;
            }
            this.rollSlide(slideCount, slideWidth);
            console.log('slide left');
            console.log(slideCount);
        })
        //slide right
        slideRightBtn.addEventListener('click', ()=>{
            slideCount--;
            if(slideCount < 0 ) {
                slideCount = this.sliderImages.length - 1;
            }
            this.rollSlide(slideCount, slideWidth);
            console.log('slide right');
            console.log(slideCount);
        })
        
        console.log('slider init');
        if(this.sliderData.isSwipe) {
            this.handleSlideSwipe(slideCount, slideWidth);
        }
        
    };
    
    handleSlideSwipe(count, slideWidth) {
        const sliderTape = document.querySelector('.slider-tape');
        let x1 = null;
        let y1 = null;
        sliderTape.addEventListener('touchstart', (e)=>{
            const firstTouch = e.touches[0];
            x1 = firstTouch.clientX;
            y1 = firstTouch.clientY;
            //console.log(x1, y1);
        }, false);
        sliderTape.addEventListener('touchmove', (e)=>{
            if(!x1 || !y1) {
                return false;
            }
            const firstTouchEnd = e.touches[0];
            let x2 = firstTouchEnd.clientX;
            let y2 = firstTouchEnd.clientY;
            //console.log(x2, y2);
            let xDif = x2 - x1;
            let yDif = y2 - y1;
            console.log(xDif, yDif);
            if(Math.abs(xDif) > Math.abs(yDif)) {
                if(xDif > 0) {
                    count--;
                    if(count < 0 ) {
                        count = this.sliderImages.length - 1;
                    }
                    this.rollSlide(count, slideWidth);
                    console.log('right');
                }
                else {
                    count++;
                    if(count >= this.sliderImages.length) {
                        count = 0;
                    }
                    this.rollSlide(count, slideWidth);
                    console.log('left');
                }
            }
            else {
                if(yDif > 0) {
                    console.log('down');
                }
                else {
                    console.log('top');
                }
            }
            x1 = null;
            y1 = null;
        }, false);
    }

    rollSlide(count, slideWidth) {
        const sliderTape = document.querySelector('.slider-tape');
        sliderTape.style.transform = `translateX(-${count*slideWidth}px)`;
    }

    resizeSlide() {
        let slideWidth = document.getElementById('slider-container').offsetWidth;
        const sliderTape = document.querySelector('.slider-tape');
        const sliderImages = document.querySelectorAll('.slider-tape img');
        sliderTape.style.width = slideWidth * sliderImages.length + 'px';
        sliderImages.forEach (img => {
            img.style.width = slideWidth + 'px';
            img.style.height = 'auto';
        })
        
        
    }

    setActiveSlide() {
        const slideWidth = this.sliderContainer.offsetWidth;
        const sliderTape = document.querySelector('.slider-tape');
        sliderTape.style.transform = `translateX(-${this.sliderData.activeSlide*slideWidth}px)`;
    }

    createSliderTape() {
        const sliderTape = document.createElement('div');
        sliderTape.classList.add('slider-tape');
        this.sliderContainer.append(sliderTape);
        const sliderTapeEl = document.querySelector('.slider-tape');
        this.sliderData.images.forEach(el => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('img-wrapper');
            sliderTapeEl.append(imageWrapper);
            const image = document.createElement('img');
            image.setAttribute('src', el.url);
            image.setAttribute('alt', '');
            imageWrapper.append(image);
            if(this.sliderData.isTitle) {
                const slideTitle = document.createElement('p');
                slideTitle.classList.add('slide-title');
                slideTitle.textContent = el.title;
                imageWrapper.append(slideTitle);
            }
        });
        
    }
    createSliderControls() {
        const sliderControls = document.createElement('div');
        sliderControls.classList.add('slider-controls');
        this.sliderContainer.append(sliderControls);
        const sliderControlsEl = document.querySelector('.slider-controls');

        //left button
        const leftBtn = document.createElement('span');
        leftBtn.classList.add('left-btn');
        sliderControlsEl.append(leftBtn);
        const leftBtnEl = document.querySelector('.left-btn');
        const leftBtnIcon = document.createElement('i');
        leftBtnIcon.setAttribute('data-feather', "chevron-left");
        leftBtnEl.append(leftBtnIcon);

        //right button
        const rightBtn = document.createElement('span');
        rightBtn.classList.add('right-btn');
        sliderControlsEl.append(rightBtn);
        const rightBtnEl = document.querySelector('.right-btn');
        const rightBtnIcon = document.createElement('i');
        rightBtnIcon.setAttribute('data-feather', "chevron-right");
        rightBtnEl.append(rightBtnIcon);
        
    }
    
    
}

let mySlider = new SwipeSlider(sliderData);
mySlider.sliderInit();
window.addEventListener('resize', mySlider.sliderInit.bind(mySlider));


