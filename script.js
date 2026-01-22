
const cells = document.querySelectorAll('.cell')
const titleHeader = document.getElementById('titleHeader')
const xplayerDisplay = document.getElementById('xplayerDisplay')
const oplayerDisplay = document.getElementById('oplayerDisplay')
const restartBtn = document.getElementById('restartBtn')
const confettiContainer = document.getElementById('confetti-container')
const winSound = document.getElementById('winSound')
const loseSound = document.getElementById('loseSound')

let player = null
let computer = null
let ispauseGame = false
const inputcells = Array(9).fill('')

const winCondation = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

// --- Choose X or O ---
xplayerDisplay.addEventListener('click', ()=> choosePlayer('X'))
oplayerDisplay.addEventListener('click', ()=> choosePlayer('O'))

function choosePlayer(chosen){
    if(player) return
    player = chosen
    computer = player==='X' ? 'O':'X'
    titleHeader.textContent = `You are ${player}`

    if(player==='X'){ xplayerDisplay.classList.add('player-active'); oplayerDisplay.classList.remove('player-active') }
    else{ oplayerDisplay.classList.add('player-active'); xplayerDisplay.classList.remove('player-active') }
}


cells.forEach((cell,index)=>{
    cell.addEventListener('click',()=>playerMove(cell,index))
})

function playerMove(cell,index){
    if(!player || ispauseGame) return
    if(cell.textContent!=='') return

    markCell(cell,index,player)
    if(checkWinner(player)) return
    if(checkDraw()){ drawSound(); return }

    setTimeout(computerMove,400)
}

function markCell(cell,index,currentPlayer){
    cell.textContent = currentPlayer
    cell.style.color = currentPlayer==='X'?'#1892EA':'#A737FF'
    inputcells[index] = currentPlayer
}

function computerMove(){
    if(ispauseGame) return
    const emptyIndices = inputcells.map((v,i)=>v===''?i:null).filter(i=>i!==null)
    if(emptyIndices.length===0) return

    const randomIndex = emptyIndices[Math.floor(Math.random()*emptyIndices.length)]
    markCell(cells[randomIndex],randomIndex,computer)

    if(checkWinner(computer)) return
    if(checkDraw()){ drawSound(); return }
}

// --- Check winner ---
function checkWinner(curr){
    for(const [a,b,c] of winCondation){
        if(inputcells[a]===curr && inputcells[b]===curr && inputcells[c]===curr){
            ispauseGame=true
            if(curr===player){
                titleHeader.textContent = 'You Win '
                startConfetti()
                if(winSound) winSound.play().catch(()=>{})
            } else {
                titleHeader.textContent = 'You Lost '
                if(loseSound) loseSound.play().catch(()=>{})
            }
            [a,b,c].forEach(i=>cells[i].style.background='#2A2343')
            restartBtn.style.visibility='visible'
            return true
        }
    }
    return false
}

// --- Draw ---
function checkDraw(){
    if(inputcells.every(c=>c!=='') && !checkWinner(player) && !checkWinner(computer)){
        ispauseGame=true
        titleHeader.textContent='Draw '
        restartBtn.style.visibility='visible'
        drawSound()
        return true
    }
    return false
}

function drawSound(){ if(loseSound){ loseSound.currentTime=0; loseSound.play().catch(()=>{}) } }


function startConfetti(){
    for(let i=0;i<200;i++){
        setTimeout(()=>{
            const confetti=document.createElement('div')
            confetti.classList.add('confetti')
            confetti.style.left=Math.random()*100+'vw'
            confetti.style.backgroundColor=`hsl(${Math.random()*360},100%,50%)`
            confetti.style.width=(5+Math.random()*5)+'px'
            confetti.style.height=(5+Math.random()*5)+'px'
            confetti.style.transform=`rotate(${Math.random()*360}deg)`
            confettiContainer.appendChild(confetti)
            setTimeout(()=>confetti.remove(),4000)
        }, Math.random()*1000)
    }
}

// --- Restart ---
restartBtn.addEventListener('click',()=>{
    inputcells.fill('')
    cells.forEach(c=>{ c.textContent=''; c.style.background=''; })
    confettiContainer.innerHTML=''
    if(winSound){ winSound.pause(); winSound.currentTime=0 }
    if(loseSound){ loseSound.pause(); loseSound.currentTime=0 }

    player=null
    computer=null
    ispauseGame=false
    titleHeader.textContent='Choose One'
    restartBtn.style.visibility='hidden'
    xplayerDisplay.classList.remove('player-active')
    oplayerDisplay.classList.remove('player-active')
})
