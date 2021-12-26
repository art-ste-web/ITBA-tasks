//document.querySelector();
const mainContainer = document.querySelector('.main-container');
console.log(mainContainer);

//document.querySelectorAll();
const paragraphs = mainContainer.querySelectorAll('.text-par');
console.log(paragraphs);

//document.createElement(), setAttribute();
const jsImg = document.createElement('img');
jsImg.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png');
jsImg.setAttribute('alt', 'JavaScript logo');
jsImg.setAttribute('width', '320px');

//parentNode, appendChild
const jsHistory = document.querySelector('.js-history');
console.log(jsHistory.parentNode);
jsHistory.parentNode.appendChild(jsImg);

//innerHTML, .style
const artActual = document.querySelector('.actual-situation');
const innerPar = `<h2>Актуальний стан</h2>
                    <p>JavaScript, наразі, є однією з найпопулярніших мов програмування в інтернеті.
                     В перші роки існування, більшість професійних програмістів скептично ставилися
                      до мови, цільова аудиторія якої складалася з програмістів-аматорів.
                       Поява AJAX змінила ситуацію та звернула увагу професійної спільноти до мови,
                        а її подальші модифікації за стандартами ES6+ внесли багато корисних можливостей,
                     яких не вистачало для ефективного програмування.</p>`;
artActual.innerHTML = innerPar;
artActual.style.background = "#eee";
artActual.style.padding = "1rem";
artActual.style.marginTop = "2rem";

//getAttribute()
const logoImg = document.querySelector('img');
const logoImgUrl = logoImg.getAttribute('src');
console.log(logoImgUrl);

//addEventListener()
logoImg.addEventListener('click', ()=>{
    console.log('click on logo');
})

//window.onload
window.onload = ()=>{
    alert('Документ завантажено')
}

//scrollTo()
const topBtn = document.querySelector('.to-top-btn');
topBtn.style.display = 'block';
topBtn.style.margin = '0 auto';
topBtn.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

//window.content?????
console.log(window.content);