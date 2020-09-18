//Array de criação do labirinto

const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];


//Função que adiciona uma div para cada celula do array Map

function createCell() {
    let principal = document.getElementById('principal')
    for (let i = 0; i < map.length; i++) {
        let hugging = document.createElement('div')
        hugging.id = `hugg${i}`
        hugging.classList = 'hugg'
        principal.appendChild(hugging)
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === "W") {
                let cell1 = document.createElement('div')
                cell1.dataset.position = j
                cell1.className = 'cellsWall'
                hugging.appendChild(cell1)
            }
            if (map[i][j] === " " || map[i][j] === "S" || map[i][j] === "F") {
                let cell2 = document.createElement('div')
                if (map[i][j] === "S") {
                    cell2.id = "Start"
                }
                if (map[i][j] === "F") {
                    cell2.id = "End"
                }
                cell2.dataset.position = j
                cell2.className = 'cellsPath'
                hugging.appendChild(cell2)
            }
        }
    }
}


createCell()

//Cria div e imagem do Jogador

let player = document.getElementById('Start')
let daisyDiv = document.createElement('div')
daisyDiv.id = "moveDaisy"


function createImage() {
    let daisyPic = document.createElement('img')
    daisyPic.src = '/imagens/daisy.png'
    daisyPic.id = "daisy"
    player.appendChild(daisyDiv)
    daisyDiv.appendChild(daisyPic)

}

createImage()


//Movimentação do jogador


document.addEventListener('keydown', (event) => {

    let next = daisyDiv.parentNode.nextSibling
    let prior = daisyDiv.parentNode.previousSibling
    const keyName = event.key


    if (next.className === "cellsPath") {
        if (keyName === "ArrowRight") {
            next.appendChild(daisyDiv)
        }
    }
    if (prior.className === "cellsPath") {
        if (keyName === "ArrowLeft") {
            prior.appendChild(daisyDiv)
        }
    }

    if (keyName === "ArrowUp") {
        let daisyPositionUp = daisyDiv.parentElement.getAttribute("data-position")
        let cellPlayerParentAndPreviousSibling = daisyDiv.parentElement.parentElement.previousSibling
        for (let i = 0; i <= 20; i++) {
            let above = cellPlayerParentAndPreviousSibling.childNodes[i].getAttribute("data-position")
            let destination = cellPlayerParentAndPreviousSibling.childNodes[above]
            if (daisyPositionUp === above && destination.className === "cellsPath") {
                destination.appendChild(daisyDiv)
            }
        }
    }

    if (keyName === "ArrowDown") {
        let daisyPositionDown = daisyDiv.parentElement.getAttribute("data-position")
        let cellPlayerParentAndNextSibling = daisyDiv.parentElement.parentElement.nextSibling
        for (let i = 0; i <= 20; i++) {
            let bellow = cellPlayerParentAndNextSibling.childNodes[i].getAttribute("data-position")
            let destination = cellPlayerParentAndNextSibling.childNodes[bellow]
            if (daisyPositionDown === bellow && destination.className === "cellsPath") {
                destination.appendChild(daisyDiv)
            }
        }
    }
    
    if (daisyDiv.parentElement.id === "End"){
        let win = document.getElementById('vitoria')
        win.classList.remove('oculto')
    }
    //let daisyWinner = daisyDiv.parentElement.getAttribute("data-position")
})


let botao = document.getElementById('botao')
botao.addEventListener('click', function(){
    location.reload()
})