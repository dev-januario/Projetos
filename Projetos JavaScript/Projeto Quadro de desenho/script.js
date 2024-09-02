// Initial Data
let currentColor = 'black'
let canDraw = false
let mouseX = 0
let mouseY = 0

let screen = document.querySelector('#tela')
let ctx = screen.getContext('2d') // Selecionando o contexto da área de desenho

// Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent)
})
screen.addEventListener('mousedown', mouseDownEvent)
screen.addEventListener('mousemove', mouseMoveEvent)
screen.addEventListener('mouseup', mouseUpEvent)
document.querySelector('.clear').addEventListener('click', clearScreen)

// Functions
function colorClickEvent(event) {
    let color = event.target.getAttribute('data-color')
    currentColor = color

    document.querySelector('.color.active').classList.remove('active') // Encontra o elemento que tem o active e remove
    event.target.classList.add('active') // Adiciona a cor selecionada
}

function mouseDownEvent(event) {
    canDraw = true
    // Calcula o ponto do mouse dentro do Canvas
    mouseX = event.pageX - screen.offsetLeft
    mouseY = event.pageY - screen.offsetTop
}

function mouseMoveEvent(event) {
    if (canDraw) {
        draw(event.pageX, event.pageY)
    }
}

function mouseUpEvent() {
    canDraw = false  
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft
    let pointY = y - screen.offsetTop

    // Desenhar
    ctx.beginPath() // Começo
    ctx.lineWidth = 5 // Tamanho da linha
    ctx.lineJoin = "round" // Linha com formato de bola
    ctx.moveTo(mouseX, mouseY) // Mover para o início da linha
    ctx.lineTo(pointX, pointY) // Faça uma linha do pointX até o pointY
    ctx.closePath() // Final
    ctx.strokeStyle = currentColor // Cor da linha
    ctx.stroke() // Finalizar todo processo

    // Desenho contínuo, peguei a primeira posição e continuou
    mouseX = pointX
    mouseY = pointY
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}