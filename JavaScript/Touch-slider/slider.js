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
    isIndicator: false,
    autoplay: false

}

class TouchSlider {
    constructor(sliderData) {
        this.sliderData = sliderData;
        this.sliderImages = sliderData.images;
        this.sliderContainer = document.getElementById('slider-container');
    }

    sliderInit() {
        //create slider feed and controls
        const sliderFeedEl = document.querySelector('.slider-feed');
        const sliderControlsEl = document.querySelector('.slider-feed');
        if(!sliderFeedEl && !sliderControlsEl) {
            this.createSliderFeed();
            this.createSliderControls();
        }
        this.resizeSlide();
        this.setActiveSlide();
        //slide count
        let slideCount = sliderData.activeSlide;
        const slideWidth = this.sliderContainer.offsetWidth;
        const sliderFeed = document.querySelector('.slider-feed');
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
        sliderFeed.style.transform = `translateX(-${slideCount*slideWidth}px)`;

    };
    
    rollSlide(count, slideWidth) {
        const sliderFeed = document.querySelector('.slider-feed');
        sliderFeed.style.transform = `translateX(-${count*slideWidth}px)`;
    }

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
        const slideWidth = this.sliderContainer.offsetWidth;
        const sliderFeed = document.querySelector('.slider-feed');
        sliderFeed.style.transform = `translateX(-${this.sliderData.activeSlide*slideWidth}px)`;
    }

    createSliderFeed() {
        const sliderFeed = document.createElement('div');
        sliderFeed.classList.add('slider-feed');
        this.sliderContainer.append(sliderFeed);
        const sliderFeedEl = document.querySelector('.slider-feed');
        this.sliderData.images.forEach(el => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('img-wrapper');
            sliderFeedEl.append(imageWrapper);
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

let mySlider = new TouchSlider(sliderData);
mySlider.sliderInit();
window.addEventListener('resize', mySlider.sliderInit.bind(mySlider));


