const sliderData = {
    sliderContainer: 'slider-container',
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
    ],
    activeSlide: 0,
    title: true,
    indicator: false,
    autoplay: false

}

class TouchSlider {
    constructor(sliderData) {
        this.sliderData = sliderData;
        this.slideLeftBtn = document.querySelector('.left-btn');
        this.slideRightBtn = document.querySelector('.right-btn');
        this.sliderFeed = document.querySelectorAll('.slider-feed');
        this.sliderNav = document.querySelector('.slider-navigation');
    }

    sliderInit() {
        this.createSliderFeed();
        this.createSliderControls();
        this.resizeSlide();
        this.setActiveSlide();
        let slideCount = sliderData.activeSlide;
        const slideWidth = document.getElementById('slider-container').offsetWidth;
        const sliderFeed = document.querySelector('.slider-feed');
        const slideLeftBtn = document.querySelector('.left-btn');
        slideLeftBtn.addEventListener('click', ()=>{
            slideCount++;
            sliderFeed.style.transform = `translateX(-${slideCount*slideWidth}px)`;
            console.log('slide left');
            console.log(slideCount);
        })


    };

    resizeSlide() {
        let slideWidth = document.getElementById('slider-container').offsetWidth;
        const sliderFeed = document.querySelector('.slider-feed');
        const sliderImages = document.querySelectorAll('.slider-feed img');
        sliderFeed.style.width = slideWidth * sliderImages.length + 'px';
        sliderImages.forEach (img => {
            img.style.width = slideWidth + 'px';
            img.style.height = 'auto';
        })
        
    }

    setActiveSlide() {
        const slideWidth = document.getElementById('slider-container').offsetWidth;
        const sliderFeed = document.querySelector('.slider-feed');
        sliderFeed.style.transform = `translateX(-${this.sliderData.activeSlide*slideWidth}px)`;
    }

    createSliderFeed() {
        const slider = document.getElementById(this.sliderData.sliderContainer);
        const sliderFeed = document.createElement('div');
        sliderFeed.classList.add('slider-feed');
        slider.append(sliderFeed);
        const sliderFeedEl = document.querySelector('.slider-feed');
        this.sliderData.images.forEach(el => {
            const image = document.createElement('img');
            image.setAttribute('src', el.url);
            image.setAttribute('alt', '');
            sliderFeedEl.append(image);
        });
        
    }
    createSliderControls() {
        const slider = document.getElementById(this.sliderData.sliderContainer);
        const sliderControls = document.createElement('div');
        sliderControls.classList.add('slider-controls');
        slider.append(sliderControls);
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

let mySlider = new TouchSlider(sliderData);
mySlider.sliderInit();
window.addEventListener('resize', mySlider.resizeSlide);


