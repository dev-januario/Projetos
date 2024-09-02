document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase())
}) // Representa o corpo do site, ele fica esperando algum evento na página acontecer, se acontecer algo [Primeiro parâmetro], irá executar uma função [Segundo parâmetro]


document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value

    if (song !== '') {
        let songArray = song.split('') // Transformando string em array
        playComposition(songArray)
    }
})

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`)
    let keyElement = document.querySelector(`div[data-key="${sound}"]`)

    if (audioElement) {
        audioElement.currentTime = 0 // Quando encontrar o elemento que foi tocado, ele vai voltar para o ponto zero do audio. Essa linha de código foi adicionada, pois sem ela, o sistema ia esperar o áudio acabar para reproduzir de novo, mesmo clicando várias vezes seguida.
        audioElement.play()
    }

    if (keyElement) {
        keyElement.classList.add('active')

        setTimeout(() => {
            keyElement.classList.remove('active')
        }, 300)
    }
}

function playComposition(songArray) {
    let wait = 0

    for (let i of songArray) {
        setTimeout(() => {
            playSound(`key${i}`)
        }, wait)
        wait += 250
    }
}