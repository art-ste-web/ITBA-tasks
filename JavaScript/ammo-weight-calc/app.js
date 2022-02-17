function calcAmmoMass() {
    const ammoTypeMassValue = document.getElementById('ammo_type').value;
    const ammoNumber = document.getElementById('ammo_numb').value;
    const totalAmmoMass = calcTotalMass(ammoTypeMassValue, ammoNumber);
    showOneAmmoValue(ammoTypeMassValue);
    showTotalMass(totalAmmoMass);

}
function showTotalMass(totalMassValue) {
    const totalAmmoEl = document.querySelector('.total-ammo-mass');
    totalAmmoEl.innerText = `${totalMassValue} г (${(totalMassValue/1000).toFixed(3)} кг)`;
}


function calcTotalMass(value, number) {
    let totalMassGram = value*number;
    return totalMassGram.toFixed(2);
}



function showOneAmmoValue(massValue) {
    const oneAmmoEl = document.querySelector('.one-ammo-mass');
    oneAmmoEl.innerText = `${massValue} г`;
}

const calcForm = document.querySelector('.calc-container');
calcForm.addEventListener('change', calcAmmoMass);