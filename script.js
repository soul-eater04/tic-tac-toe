let turn = 0;

let GameBoard = (function(){
    const cells = Array.from(document.querySelectorAll('.cell'));
    let gameBoard = [['','',''],['','',''],['','','']];
    let k = 0;
    for(let i = 0 ; i < 3 ; i++){
        for(let j = 0 ; j < 3 ; j++){
            gameBoard[i][j] = cells[k];
            gameBoard[i][j].addEventListener('click', (event) => clickedBox(event));
            k++;
        }
    }
    return gameBoard;
})();

function  getPlayerTurn(){
    if(turn === 0){
        return {player: 'X',nextTurn: 1};
    }
    else{
        return {player:'O',nextTurn:0};
    }
}

function clickedBox(event){
    let box = event.target;
    GameController(box);
}

function GameController(box){
    const currentPlayer = getPlayerTurn(turn).player;
    turn = getPlayerTurn(turn).nextTurn;
    const currentBox = box;
    currentBox.textContent = currentPlayer;
    const conclusion = checkForResult();
    if(conclusion.result === 'HOLD'){
        return;
    }
    if(conclusion.result === 'WIN'){
        let winner = conclusion.player;
        console.log(`THE WINNER IS ${winner}`);
        announceWin(winner);
    }
    return turn;
}

function announceWin(winner){
    let resultDiv = document.querySelector('.result');
    resultDiv.textContent = `THE WINNER IS ${winner}`;
    console.log(`THE WINNER IS ${winner}`);
}

function checkForResult() {
    let winner = '';
    const rowCheck = (function() {
        for (let i = 0; i < 3; i++) {
            if (
                GameBoard[i][0].textContent === GameBoard[i][1].textContent &&
                GameBoard[i][1].textContent === GameBoard[i][2].textContent &&
                GameBoard[i][0].textContent !== ''
            ) {
                winner = GameBoard[i][0].textContent;
                return { player: GameBoard[i][0].textContent, win: 1 };
            }
        }
        winner = 'HOLD';
        return { player: 'HOLD', win: 0 };
    })();

    const columnCheck = (function() {
        for (let j = 0; j < 3; j++) {
            if (
                GameBoard[0][j].textContent === GameBoard[1][j].textContent &&
                GameBoard[1][j].textContent === GameBoard[2][j].textContent &&
                GameBoard[0][j].textContent !== ''
            ) {
                winner = GameBoard[0][j].textContent;
                return { player: GameBoard[0][j].textContent, win: 1 };
            }
        }
        winner = 'HOLD';
        return { player: 'HOLD', win: 0 };
    })();

    const diagonalCheck = (function() {
        if (
            GameBoard[0][0].textContent === GameBoard[1][1].textContent &&
            GameBoard[1][1].textContent === GameBoard[2][2].textContent &&
            GameBoard[0][0].textContent !== ''
        ) {
            return { player: GameBoard[0][0].textContent, win: 1 };
        }
        if (
            GameBoard[0][2].textContent === GameBoard[1][1].textContent &&
            GameBoard[1][1].textContent === GameBoard[2][0].textContent &&
            GameBoard[0][2].textContent !== ''
        ) {
            return { player: GameBoard[0][2].textContent, win: 1 };
        }
        else{
            winner = 'HOLD';
            return { player: 'HOLD', win: 0 };
        }
    })();

    if(rowCheck.win){
        return {result: 'WIN', player: rowCheck.player };
    }
    
    if (columnCheck.win) {
        return {result: 'WIN', player: columnCheck.player };
    }
    
    if (diagonalCheck.win) {
        return {result: 'WIN', player: diagonalCheck.player };
    }

    else {
        let completed = 'TIE';
        for(let i = 0 ; i < 3 ; i++){
            for(let j = 0 ; j < 3 ; j++){
                if(GameBoard[i][j].textContent === ''){
                    completed = 'HOLD';
                }
            }
        }
        return {result: completed , player: 'NONE'};
    }
}



console.log(GameBoard);


