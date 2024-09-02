/*
    Breve explicação sobre target e currentTarget

    document.querySelector('.neutralArea').addEventListener('click', (event) => {
        event.target // Retorna exatamente qual o evento que eu cliquei
        event.currentTarget // Retorna em quem tem esse evento
    })
*/
let areas = {
    a: null,
    b: null,
    c: null
}

document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

// Para toda área que eu quiser arrastar um item e soltar, precisa dos três eventos abaixo
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver) // Será executada
    area.addEventListener('dragleave', dragLeave)
    area.addEventListener('drop', drop)
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral)
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)

// Functions Item
function dragStart(event) {
    event.currentTarget.classList.add('dragging')
}

function dragEnd(event) {
    event.currentTarget.classList.remove('dragging')
}

// Functions Area
function dragOver(event) {
    // Passou por cima da área dropável
    if(event.currentTarget.querySelector('.item') === null) {
        event.preventDefault()
        event.currentTarget.classList.add('hover')
    }
}

function dragLeave(event) {
    // Saiu da área dropável
    event.currentTarget.classList.remove('hover')
}

function drop(event) {
    // Soltou na área dropável [ Obs.: A função drop só irá funcionar se a função dragOver estiver funcionando ]
    event.currentTarget.classList.remove('hover')
    
    if(event.currentTarget.querySelector('.item') === null) { // Não há nada dentro da área
        let dragItem = document.querySelector('.item.dragging')
        event.currentTarget.appendChild(dragItem)
        updateAreas()
    }
}

// Functions Neutral Area
function dragOverNeutral(event) {
    event.preventDefault()
    event.currentTarget.classList.add('hover')
}

function dragLeaveNeutral(event) {
    event.currentTarget.classList.remove('hover')
}

function dropNeutral(event) {
    event.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.item.dragging')
    event.currentTarget.appendChild(dragItem)
    updateAreas()
}

// Logic Functions
function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name')

        if(area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML
        } else {
            areas[name] = null
        }
    })
    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct')
    } else {
        document.querySelector('.areas').classList.remove('correct')
    }
}