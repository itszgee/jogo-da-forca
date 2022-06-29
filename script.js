const ecountEl = document.querySelector('.ecount')
const ccountEl = document.querySelector('.ccount')
const countLetter = document.getElementById('countLetter')
const startScreen = document.querySelector('.secao-inicio')
const gameScreen = document.querySelector('.secao-game')
const wordEl = document.getElementById('hangmanWord')
const btnStartEl = document.querySelector('.btn-comecar')
const hangmanWord = document.querySelector('.hangman-word')
const playedLettersEl = document.querySelector('.played-letters')
const tipEl = document.querySelector('.tip')
const tip = document.getElementById('hangmanTip')
const winModalEl = document.getElementById('myModal')
const winModal = new bootstrap.Modal(winModalEl, {})
const sortWord = document.getElementById('sortWord')

const wordlist = ['BANANA', 'CARRO', 'PARALELEPIPEDO', 'TRIANGULO', 'BICICLETA', 'ILUDIDO', 'COMPUTADOR', 'CELULAR', 'ONEDIRECTION', 'TEENWOLF', 'SHADOWHUNTERS', 'ABELHA', 'VAMPIRO', 'LOBISOMEN', 'ZUMBI', 'BRUXA', 'VERMELHO', 'CACHORRO', 'GATO', 'LUCIFER', 'TOKYOGHOUL', 'DEATHNOTE', 'NOTEBOOK', 'RAPARIGA', 'WHISKY', 'HUSKY', 'PINSCHER', 'GUATEMALA' ]
const randomWord = () => Math.floor(Math.random() * (27 - 0)) + 0

let word = []
let gameStarted = false
let ccount = 0
let ecount = 0
let playedLetters = []
let modalEnter = false

gameScreen.classList.add('d-none')

wordEl.addEventListener('keyup', e => {
    countLetter.textContent = wordEl.value.length
})

sortWord.addEventListener('click', () => {
    wordEl.disabled = sortWord.checked
    tip.disabled = sortWord.checked
})

let startGame = () => {

    if (wordEl.value.length > 0 || sortWord.checked) {

        if(sortWord.checked){
            wordEl.value = wordlist[randomWord()]
        }

        word = wordEl.value.toUpperCase().match(/[\w]/g)

        word.forEach(letter => {
            hangmanWord.innerHTML += `<div class="hangman-word-letter">
                                    <span class="hangman-word-letter-letter"></span>
                                    </div>`
        });

        tipEl.textContent = tip.value

        gameScreen.classList.remove('d-none')
        startScreen.classList.add('d-none')

        gameStarted = true
    }

}

btnStartEl.addEventListener('click', startGame)

let verifyLetter = letter => {

    let haveInword = word.filter(letra => letra == letter).length
    let havePlayedLetter = playedLetters.filter(l => l.letra == letter).length

    if (havePlayedLetter == 0) {

        let objletter = {
            "letra": letter,
            "tem": false
        }

        if (haveInword > 0) {

            objletter.tem = true

            word.forEach((l, i) => {
                if (letter == l) {
                    document.querySelectorAll('.hangman-word-letter-letter')[i].textContent = l

                    ccount++
                }
            })

        } else {
            ecount++

        }

        playedLetters.push(objletter)

        playedLettersEl.innerHTML = ''
        playedLetters.forEach(l => {
            if (l.tem) {
                playedLettersEl.innerHTML += `<span class="mx-1 text-success">${l.letra}</span>`
            } else {
                playedLettersEl.innerHTML += `<span class="mx-1">${l.letra}</span>`
            }
        })

        ccountEl.textContent = ccount
        ecountEl.textContent = ecount

        if (ccount == word.length) {

            winModalEl.querySelector('.modal-body').innerHTML = `<p>Você acertou a palavra <span class="fw-bold">'${wordEl.value}'</span>.</p>
                    <p class="fw-bold mb-0">Acertos: <span class="win-rights text-success">${ccount}</span></p>
                    <p class="fw-bold m-0">Erros: <span class="win-wrongs text-danger">${ecount}</span></p>`

            gameStarted = false

            winModal.show()

        } else if (ecount >= 7) {
            winModalEl.querySelector('.modal-body').innerHTML = `<p>Você acertou a palavra <span class="fw-bold">'${wordEl.value}'</span>.</p>
                    <p class="fw-bold mb-0">Acertos: <span class="win-rights text-success">${ccount}</span></p>
                    <p class="fw-bold m-0">Erros: <span class="win-wrongs text-danger">${ecount}</span></p>`

            gameStarted = false

            winModal.show()

        }

    }

}

document.addEventListener('keypress', e => {
    let key = e.key.toUpperCase()

    if (gameStarted) {
        verifyLetter(key)
    } else if (key == 'ENTER' && !modalEnter) {
        startGame()
    }

})

winModalEl.addEventListener('show.bs.modal', () => {

    modalEnter = true

})

winModalEl.addEventListener('hide.bs.modal', () => {

    wordEl.value = ''
    tip.value = ''

    gameScreen.classList.add('d-none')
    startScreen.classList.remove('d-none')

    word = []
    ccount = 0
    ecount = 0
    playedLetters = []

    hangmanWord.innerHTML = ''
    playedLettersEl.innerHTML = ''
    ccountEl.textContent = 0
    ecountEl.textContent = 0
    tipEl.textContent = ''
    countLetter.textContent = 0
    modalEnter = false

})