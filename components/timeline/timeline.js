const timeline = document.querySelector('.timeline');


function getSegmentLength() {
    const timeLineSegments = document.querySelectorAll('.timeline__segment');
    const segmentsLength = [];
    timeLineSegments.forEach(segment => {
        segmentsLength.push(Number(segment.getAttribute('data-t-line-days-count')));
    });
    return segmentsLength;
}
const segLength = getSegmentLength();
const dayEl = document.createElement('div');
dayEl.classList.add('timeline-day');

console.log(segLength);
//for(let i = 0; i<timeLineSegmentsp[0].length)
