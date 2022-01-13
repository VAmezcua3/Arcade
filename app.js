//*************** STATE ***************//
let state = {};
state.players = ["", ""];
state.currentPlayerIdx = Math.floor(Math.random() * 2)

const resetState = () => {
    state.board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    console.log('state', state);
}

//*************** DOM SELECTIONS ***************//
const boardElem = document.getElementById("board")
console.log("board", boardElem);

const playerTurnElem = document.getElementById("turn")
const replay = document.getElementById("replay");


//*************** DOM FUNCTIONS ***************//
const renderBoard = () => {
    boardElem.innerHTML = "";
    for (let i = 0; i < state.board.length; i++){
        const cellElem = document.createElement("div");
        cellElem.className = "cell";
        console.log('cell', cellElem);
        cellElem.dataset.index = i;
        /*let content = state.board[i].value;
        let isTurned = state.board[i].isTurned;
            if (isTurned) {
                cellElem.innerText = content;
        }*/
        boardElem.appendChild(cellElem)
    }
}

const renderPlayers = () => {
    let text;

    if (!state.players[0] || !state.players[1]) {
        text = `
            <input class='player1' name='player1' placeholder='Enter Name'>  
            <input class='player2' name='player2' placeholder='Enter Name'>
            <div><button class="start">Start</button></div>
        `
    } else {
        text = `It is ${getCurrentPlayer()}\'s turn!`
    }
    playerTurnElem.innerHTML = text;
}

//*************** EVENT LISTENERS ***************//
boardElem.addEventListener("click", function(event){
    console.log("event", event.target);
    let identifier = event.target.dataset.index;
    state.board[identifier] = "";
    console.log("identifier", identifier)
    changeTurn()
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

//*************** HELPER FUNCTIONS ***************//
    const getCurrentPlayer = () => {
        return state.players[state.currentPlayerIdx]
    }
    const changeTurn = () => {
        state.currentPlayerIdx = state.currentPlayerIdx === 0 ? 1 : 0;
    }
    const render = () => {
        renderBoard()
        renderPlayers()
    }
//*************** BOOT STRAPPING ***************//
resetState()
render()