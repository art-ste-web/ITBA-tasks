const chartOne = document.getElementById('segment_1')
let charts = document.querySelectorAll('.donut-segment');
// console.log(chartOne.getAttributeNS(null, 'stroke-dasharray'));
// console.log(chartOne.setAttributeNS(null, 'stroke-dasharray', '80 20'));
// console.log(chartOne.getAttributeNS(null, 'stroke-dasharray'));

const diagramData = [
    {
        segmentPercent: 60,
        segmentName: 'Sector 1',
        segmentColor: '#0072bf'
    },
    {
        segmentPercent: 30,
        segmentName: 'Sector 2',
        segmentColor: '#b1c94e'
    },
    {
        segmentPercent: 10,
        segmentName: 'Sector 3',
        segmentColor: '#00b7a8'
    },
]

let segmentsValues = document.querySelectorAll('.segment-value');
let valuesArr = [12, 28, 60];
let firstSegmentOffset =  Number(charts[0].getAttributeNS(null, 'stroke-dashoffset'));
let dashArr = [];

let offsetArr = [];

function calcDash() {
    for(let i = 0; i < valuesArr.length; i++) {
        dashArr[i] = (100 - valuesArr[i]);
    }
    console.log(dashArr);
}

function calcOffset() {
    // for(let i = 0; i < valuesArr.length; i++) {
    //     if(i=0) {
    //         offsetArr.push(0);
    //     } else {
    //         offsetArr.push(valuesArr[i]+valuesArr[i+1]);
    //     }
    // }
    offsetArr[0] = (0);
    offsetArr[1] = (Number(`-${valuesArr[0]}`));
    offsetArr[2] = (Number(`-${valuesArr[0] + valuesArr[1]}`));
    console.log(offsetArr);
    
}



// console.log(valuesArr);



function initValues() {
    calcDash();
    calcOffset()
    for(let i = 0; i < segmentsValues.length; i++){
        segmentsValues[i].innerText =`${valuesArr[i]}%`;
        charts[i].setAttributeNS(null, 'stroke-dasharray', `${valuesArr[i]} ${dashArr[i]}`)
        charts[i].setAttributeNS(null, 'stroke-dashoffset', `${offsetArr[i]}`)
    
        
    }
    
}

function resetValues(arr) {
    arr = [];
}

const rangeDataEls= document.querySelectorAll('.range-data');
const valueEl= document.querySelectorAll('.display-value');
console.log(rangeDataEls);


// function checkSumData(val1, val2, val3) {
//     if(val1>100 || val2>100 || val3>100) {
//         alert("error");
//     }

// }


function updateValue() {
    const totalBlock = document.querySelector('.total-value');
    for(let i=0; i < rangeDataEls.length; i++) {
        let curValue = rangeDataEls[i].value;
        valueEl[i].innerText = curValue;
        rangeDataEls[i].setAttribute('value', valuesArr[i]);
        valueEl[i].innerText = valuesArr[i];
        let sumVal = Number(rangeDataEls[0].value) + Number(rangeDataEls[1].value) + Number(rangeDataEls[2].value);
        totalBlock.innerText = `Total: ${sumVal}%`;
        rangeDataEls[i].addEventListener('input', ()=>{
            let curValue = rangeDataEls[i].value;
            sumVal = Number(rangeDataEls[0].value) + Number(rangeDataEls[1].value) + Number(rangeDataEls[2].value);
            //console.log(curValue);
            totalBlock.innerText = `Total: ${sumVal}%`;
            console.log(sumVal);
            valueEl[i].innerText = curValue;
            valuesArr[i] = +curValue;
            console.log(valuesArr);
            if(sumVal>100) {
                alert('Cумма відсотків не повинна перевищувати 100')
            }
            
            
        })
    }
}

document.getElementById('rebuild-btn').addEventListener('click', initValues);

updateValue();

// checkSumData(100, 100, 10);

initValues()