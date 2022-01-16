//*************** STATE ***************//
let state = {};
let turnCount = 0

const resetState = () => {
    state.board = ["", "", "", "", "", "", "", "", "",];
    console.log('state', state);
}

state.players = ["", ""];
state.winner = null;
state.currentPlayerIdx = Math.floor(Math.random() * 2)

//*************** DOM SELECTIONS ***************//
const boardElem = document.getElementById("board");
console.log("board", boardElem);

const playerTurnElem = document.getElementById("turn");

const replay = document.getElementById("replay");

//*************** DOM FUNCTIONS ***************//
const renderBoard = () => {
    boardElem.innerHTML = "";
    for (let i = 0; i < state.board.length; i++){
        const cellElem = document.createElement("div");
        cellElem.className = "cell";
        console.log('cell', cellElem);
        cellElem.dataset.index = i;
        let content = state.board[i];
        cellElem.innerText = content;
        boardElem.appendChild(cellElem)
    }
}

const renderPlayers = () => {
    let text;

    if (!state.players[0] && !state.players[1]) {
        text = `
            <input class='player1' name='player1' placeholder='Enter Name'>  
            <input class='player2' name='player2' placeholder='Enter Name'>
            <div><button class="start">Start</button></div>
        `
    }   else if (!state.players[0] && state.players[1]){
        state.players[0] = "computer";
        text = `It is ${getCurrentPlayer()}\'s turn!`
    }   else if (state.players[0] && !state.players[1]){
        state.players[1] = "computer";
        text = `It is ${getCurrentPlayer()}\'s turn!`
    }   else if (state.winner){
        text = `${state.winner} is the All Valley Champion!`
    }   else if (turnCount === 9){
        text = `TIE`
    }
      else {
        text = `It is ${getCurrentPlayer()}\'s turn!`
    }
    playerTurnElem.innerHTML = text;
}

//*************** EVENT LISTENERS ***************//
boardElem.addEventListener("click", function(event){
    console.log("event", event.target);
    let identifier = event.target.dataset.index;
    console.log("identifier", identifier)
    takeTurn(identifier);
    render();
})

playerTurnElem.addEventListener('click', function(event) {
    if (event.target.className === 'start') {
        const input1 = document.querySelector('input[name=player1]').value;
        state.players[0] = input1;
        const input2 = document.querySelector('input[name=player2]').value;
        state.players[1] = input2;
        render();
    }
})

replay.addEventListener("click", function(event){
    state.players = ["", ""];
    state.currentPlayerIdx = Math.floor(Math.random() * 2);
    state.winner = null;
    turnCount = 0;
    resetState();
    render();
})
//*************** HELPER FUNCTIONS ***************//
const getCurrentPlayer = () => {
    return state.players[state.currentPlayerIdx]
}

const changeTurn = () => {
    state.currentPlayerIdx = state.currentPlayerIdx === 0 ? 1 : 0;
    console.log('current player', state.currentPlayerIdx)
}
    
const takeTurn = (identifier) => {
    let snake = String.fromCodePoint(0x1F40D);
    let karate = String.fromCodePoint(0x1F94B);

    if(state.board[identifier]) return;
    
    if (state.currentPlayerIdx === 0){
        state.board[identifier] = snake;
    } else {
        state.board[identifier] = karate;
    }
    checkWinner();
    changeTurn();
    turnCount++
}

const checkWinner = (position) => {
    const solutions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for (let i = 0; i < solutions.length; i++){
        let solution = solutions[i]; 
        let a = solution[0]; 
        let b = solution[1]; 
        let c = solution[2]; 

        let valueOne = state.board[a] 
        let valueTwo = state.board[b] 
        let valueThree = state.board[c]

        if (valueOne && valueOne === valueTwo && valueTwo === valueThree) {
            if (state.board[a] === String.fromCodePoint(0x1F40D) || state.board[b] === String.fromCodePoint(0x1F40D) || state.board[c] === String.fromCodePoint(0x1F40D)){
                state.winner = state.players[0]
            } else {
                state.winner = state.players[1]
            }
            console.log(state.winner);
            return
        }
    }
}

const render = () => {
    renderBoard()
    renderPlayers()
}

//*************** BOOT STRAPPING ***************//
resetState()
render()