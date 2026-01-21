const cells = document.querySelectorAll('.cell')
const titleHeader = document.querySelector('#titleHeader')
const xplayerDisplay = document.querySelector('#xplayerDisplay')
const oplayerDisplay = document.querySelector('#oplayerDisplay')
const restartBtn = document.querySelector('#restartBtn')

let player = "X"
let ispauseGame = false
let isGameStart = false
const inputcells = ['', '', '',
    '', '', '',
    '', '', ''
]

const winCondation = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]
]

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapcell(cell, index))
})

function tapcell(cell, index) {
    if (cell.textContent === '' && !ispauseGame) {
        isGameStart = true
        updateCell(cell, index)
        changePlayer()
    }
}

function updateCell(cell, index) {
    cell.textContent = player
    inputcells[index] = player
    cell.style.color = (player == 'X') ? '#1892EA' : '#A737FF'
}
function changePlayer() {
player= (player == "X") ?'O':'X'
   
        
}
function checkWiner(){
    for(const[a,b,c]of winCondation){
           if(
            inputcells[a]==player&&
            inputcells[b]==player&&
            inputcells[c]==player
           ){
            declareWinner([a,b,c])
            return true
           }
    }
}
function declareWinner(winnigIndices){
 titleHeader.textContent = `${player} wins`

    winnigIndices.forEach((index)=>
     cells[index].style.background='#2A2343'
    )
    restartBtn.style.visibility='visible'
}

restartBtn.addEventListener('click',()=>{
    restartBtn.style.visibility='hiden'
})