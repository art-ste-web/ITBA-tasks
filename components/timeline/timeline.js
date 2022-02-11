const timeline = document.querySelector('.timeline');
const timeLineSegments = document.querySelectorAll('.timeline__segment');
const leftBtn = document.querySelector('.timeline__controls .left-btn');
const rightBtn = document.querySelector('.timeline__controls .right-btn');

const eventDatesData = [
    {
        segmentId: 'january',
        events: [
            {
                date: '25',
                title: 'Бій на опорному пункті «Льоха»',
                description: 'Українські воїни 128-ї гірсько-піхотної і 17-ї танкової бригад під командуванням старшого лейтенанта Романа Жованика на опорному пункті «Олексій» («Льоха») під селом Санжарівка зупинили наступ колони 4-ї мотострілецької бригади 2-го армійського корпусу ЗС РФ і розгромили її.',
                link: '#'

            }
        ]
    },
    {
        segmentId: 'february',
        events: [
            {
                date: '10',
                title: 'Бої за Логвинове',
                description: 'Бої російсько-української війни, що сталися 10-12 лютого 2015 року при намаганні російських окупаційних військ і підрозділів терористів ЛДНР відрізати українські підрозділи, які в напівоточенні боронили Дебальцеве за 6 км на південь від села Логвинового',
                link: '#'

            }
        ]
    }

]




setInitialTranslate(-20);
leftBtn.addEventListener('click', ()=>{
    moveLeft(10);
});

rightBtn.addEventListener('click', ()=>{
    moveRight(-10);
});

function getSegmentLength() {
    
    const segmentsLength = [];
    timeLineSegments.forEach(segment => {
        segmentsLength.push(Number(segment.getAttribute('data-t-line-days-count')));
    });
    return segmentsLength;
}
const segLength = getSegmentLength();

function renderTimeLine(segmentsLength) {
    
    for(let i = 0; i < timeLineSegments.length; i++) {
        for(let j = 1; j <= segmentsLength[i]; j++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('timeline__day');
            dayEl.textContent = [j];
            timeLineSegments[i].append(dayEl);
            //console.log(segmentsLength[j]);
        }
    }
}

function addEventsDates(eventsData) {
    timeLineSegments.forEach(seg=>{
        eventsData.forEach(evt=>{
            if(seg.id === evt.segmentId) {
                let segDays = seg.querySelectorAll('.timeline__day');
                for(let i = 0; i < segDays.length; i++) {
                    if(segDays[i].textContent === evt.events.date) {
                        segDays[i].style.color = 'red';
                    }
                }
            }
        })
    })
}

function setInitialTranslate(transValue) {
    timeline.style.transform = `translateX(${transValue}%)`;
}

function moveLeft(moveStep) {
    let transVal = Number(timeline.style.transform.replace(/[^-?\d.]/g, ''));
    console.log(timeline.style.transform);
    console.log(transVal);
    if(transVal === 0){
        return false;
    }
    timeline.style.transform = `translateX(${transVal + moveStep}%)`;
    
}

function moveRight(moveStep) {
    let transVal = Number(timeline.style.transform.replace(/[^-?\d.]/g, ''));
    console.log(timeline.style.transform);
    console.log(transVal);
    if(transVal === -60){
        return false;
    }
    timeline.style.transform = `translateX(${transVal + moveStep}%)`;
    
}


console.log(segLength);
renderTimeLine(segLength);

addEventsDates(eventDatesData);
// const dayEl = document.createElement('div');
// dayEl.classList.add('timeline-day');


//for(let i = 0; i<timeLineSegmentsp[0].length)
