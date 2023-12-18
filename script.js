let GameBoard = (function(){
    const cells = Array.from(document.querySelectorAll('.cell'));
    let gameBoard = [['','',''],['','',''],['','','']];
    let k = 0;
    for(let i = 0 ; i < 3 ; i++){
        for(let j = 0 ; j < 3 ; j++){
            gameBoard[i][j] = cells[k];
            k++;
        }
    }
    return {gameBoard};
})();

function  getPlayerTurn(turn){
    if(turn === 0){
        return {player: 'X',turn: 1};
    }
    else{
        return {player:'O',turn:0};
    }
}

function clickedBox(event){
    let box = event.target;
    GameController(box);
}

function GameController(box){
    let turn = 0;
    const currentPlayer = getPlayerTurn(turn).player;
    turn = getPlayerTurn(turn).turn;
    const currentBox = box;
    currentBox.textContent = currentPlayer;
    checkForResult();
}

function checkForResult(){
    
}



console.log(GameBoard);


