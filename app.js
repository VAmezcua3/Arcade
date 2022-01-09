let replay = document.getElementById("replay");

//*************** STATE ***************//
let state = {};

function resetState(){
    state.board = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    console.log('state', state);
}

//*************** DOM SELECTION ***************//
let boardElem = document.getElementById("board")
console.log("board", boardElem);

function renderBoard(){
    boardElem.innerHTML = "";
    for (let i = 0; i < state.board.length; i++){
        const cellElem = document.createElement("div");
        console.log('cell', cellElem);
        cellElem.className = "cell";
        cellElem.dataset.index = i;
        //let content = state.board[i];
        //cellElem.innerText = content
        boardElem.appendChild(cellElem)
    }
}
//*************** EVENT LISTENERS ***************//
boardElem.addEventListener("click", function(event){
    console.log("event", event.target);
    let identifier = event.target.dataset.index;
    state.board[identifier] = "";
    console.log("identifier", identifier)
    renderBoard();
})

//*************** BOOT STRAPPING ***************//
resetState()
renderBoard()