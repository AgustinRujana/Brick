//Main Section Parallax
const capa1 = document.getElementById('capa1')
const capa2 = document.getElementById('capa2')
const capa3 = document.getElementById('capa3')
const mainDiv = document.getElementById('mainDiv')

window.addEventListener('scroll', () => {
    let value = window.scrollY
    
    capa1.style.top = window.screen.height * .6 + value * 0.1 + 'px'
    capa2.style.top = window.screen.height * .5 + value * 0.15 + 'px'
    capa3.style.top = window.screen.height * .45 + value * 0.2 + 'px'
    mainDiv.style.marginTop = window.screen.height * .2 + value * 0.15 + 'px'
})