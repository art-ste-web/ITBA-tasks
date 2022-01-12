//challenge 1, challenge 2
//Mark
const weightMark = 95;
const heightMark = 1.88;
let bmiMark = weightMark / (heightMark * heightMark);
console.log(`Mark's BMI: ${bmiMark}`);
//John
const weightJohn = 85;
const heightJohn = 1.76;
let bmiJohn = weightJohn / (heightJohn * heightJohn);
console.log(`John's BMI: ${bmiJohn}`);

let markHasHigherBMI = (bmiMark>bmiJohn) ? true : false;
if(markHasHigherBMI) {
    console.log(`Mark's BMI (${bmiMark}) is higher than Jhon's BMI (${bmiJohn})`);
}
else {
    console.log(`Jhon's BMI (${bmiJohn}) is higher than Mark's BMI (${bmiMark})`);
}

//challenge 3
//Dolphins
const firstScoreDolphins = 97;
const secondScoreDolphins = 112;
const thirdScoreDolphins = 101;
let avarageScoreDolphins = (firstScoreDolphins + secondScoreDolphins + thirdScoreDolphins) / 3;
//Koalas
const firstScoreKoalas = 109;
const secondScoreKoalas = 95;
const thirdScoreKoalas = 106;
let avarageScoreKoalas = (firstScoreKoalas + secondScoreKoalas + thirdScoreKoalas) / 3;

if(avarageScoreDolphins >=100 || avarageScoreKoalas >=100) {
    if(avarageScoreDolphins > avarageScoreKoalas) {
        console.log(`Dolphins wins with a score ${avarageScoreDolphins} : ${avarageScoreKoalas}`);
    }
    else if(avarageScoreDolphins == avarageScoreKoalas) {
        console.log(`Its draw. Score is ${avarageScoreDolphins} : ${avarageScoreKoalas}`);
    }
    else if(avarageScoreDolphins < avarageScoreKoalas) {
        console.log(`Koalas wins with a score ${avarageScoreKoalas} : ${avarageScoreDolphins}`);
    }
}
else {
    console.log('Nobody wins');
}

//challenge 4
const bill = 400;
let tip = (bill>=50 && bill<=300) ? bill*(15/100) : bill*(20/100);
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value is ${bill+tip}`);




let smile = "😀";
let smile1 = String.fromCodePoint(8986);


for(let i = 0; i<10; i++) {
    if(i===2) {
        continue
    }
    console.log(smile += "😀");
}


