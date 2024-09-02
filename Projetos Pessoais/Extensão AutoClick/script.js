const start = document.querySelector('#button')
const stop = document.querySelector('#button1')
const form = document.querySelector('#formulario')

start.style.display = 'block'
stop.style.display = 'none'

function save(botao) { localStorage.setItem('botaoPressionado', botao) }
function lastPressed() { return localStorage.getItem('botaoPressionado') }

const last = lastPressed()

if (last === 'start') {
    start.style.display = 'none'
    stop.style.display = 'block'
} else if (last === 'stop') {
    start.style.display = 'block'
    stop.style.display = 'none'
}

const executarCodigo = () => {
    function autoClick(botao) { if (botao) { botao.click() } }
    setInterval(() => { var botao = document.querySelector('[data-test-id="views_views-list_header-refresh"]'); autoClick(botao) }, 3000)
}

const pararCodigo = () => {
    window.location.reload()
}

function apagarItens() {
    function ocultarElementos() {
        const seguidores = document.querySelector('.property_box .ember-view.form_field:nth-child(4)')
        const organizacao = document.querySelector('.property_box .ember-view.form_field:nth-child(5)')
        const compartilhando = document.querySelector('.property_box .ember-view.form_field:nth-child(6)')
        const tags = document.querySelector('[data-test-id="ticket-fields-tags"]')
    
        if (seguidores) {
            seguidores.style.display = 'none'
        }
        if (organizacao) {
            organizacao.style.display = 'none'
        }
        if (compartilhando) {
            compartilhando.style.display = 'none'
        }
        if (tags) {
            tags.style.display = 'none'
        }
    }
    setInterval(ocultarElementos, 3000)    
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    const last = lastPressed()

    if (last === 'start') {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: executarCodigo,
        })
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: apagarItens,
        })
    } else if (last === 'stop') {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: pararCodigo,
        })
    }
})

start.addEventListener('click', () => {
    save('start')
    start.style.display = 'none'
    stop.style.display = 'block'
})

stop.addEventListener('click', () => {
    save('stop')
    start.style.display = 'block'
    stop.style.display = 'none'
})
