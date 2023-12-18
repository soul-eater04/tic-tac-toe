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
    const rowCheck = (function(){
        for(let i = 0 ; i < 3 ; i++){
            if (
                GameBoard[i][0] === GameBoard[i][1] &&
                GameBoard[i][1] === GameBoard[i][2] &&
                GameBoard[i][0] !== null
            ) {
                return {player: GameBoard[i][j].textContent , win: 1};
            }
            else{
                return {player: 'TIE' , win: 0};
            }
        }
    })();

    const columnCheck = (function() {
        for (let j = 0; j < 3; j++) {
          if (
            GameBoard[0][j] === GameBoard[1][j] &&
            GameBoard[1][j] === GameBoard[2][j] &&
            GameBoard[0][j] !== null
          ) {
            return { player: GameBoard[0][j].textContent, win: 1 };
          }
        }
        return { player: 'TIE', win: 0 };
      })();
    
    const diagonalCheck = (function() {
      if (
        GameBoard[0][0] === GameBoard[1][1] &&
        GameBoard[1][1] === GameBoard[2][2] &&
        GameBoard[0][0] !== null
      ) {
        return { player: GameBoard[0][0].textContent, win: 1 };
      }
      if (
        GameBoard[0][2] === GameBoard[1][1] &&
        GameBoard[1][1] === GameBoard[2][0] &&
        GameBoard[0][2] !== null
      ) {
        return { player: GameBoard[0][2].textContent, win: 1 };
      }
      return { player: 'TIE', win: 0 };
    })();

    if(rowCheck.win || columnCheck.win || diagonalCheck.win){
        return 'WIN';
    }
    else{
        if (rowCheck.player === 'TIE' && columnCheck.player === 'TIE' && diagonalCheck.player === 'TIE') {
            return 'TIE';
        } else {
            return 'HOLD';
        }
    }
}



console.log(GameBoard);


