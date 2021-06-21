var turn = 0;
const urlNotAllowed = "./img/notAllowed.png";

window.onload = InitializeBoard();

function InitializeBoard() {

    var stateGame = defaultState();
    createBoard(stateGame);

    var element = document.getElementById("newGameButton");
    element.onclick = InitializeTurn;
}

function InitializeTurn() {

    turn = 1;

    var turnElement = getAndClearTurnElement();    
    createAndAppendTurnText(turnElement);

    var board = document.getElementById("board");
    board.innerHTML = "";

    var state = defaultState();
    createBoard(state);
}

function defaultState() {

    var stateGame = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ];

    return stateGame;
}

function createBoard(stateGame) {

    var board = document.getElementById("board");

    stateGame.forEach(function (row, j) {

        var rowElement = createRow(j);

        row.forEach(function (cell, i) {

            var cellElement = createCell(j, i);

            CheckPieceType(cell, cellElement);

            cellElement.onclick = select;

            rowElement.appendChild(cellElement);
        });

        board.appendChild(rowElement);
    });
}

function createRow(j) {

    var row = document.createElement("div");

    row.classList.add("board_row");
    row.classList.add(`row${j + 1}`);

    return row;
}

function createCell(j, i) {

    var cell = document.createElement("div");

    cell.classList.add("checkersSquare");
    cell.classList.add(`item${j + 1}-${i + 1}`);

    return cell;
}

function CheckPieceType(cell, cellElement) {

    var pieceType = cell === 1 ? "redPiece" : cell === 2 ? "whitePiece" : "";

    if (pieceType.length > 0)
        cellElement.classList.add(pieceType);
}

function select() {

    if (turn === 0)
        return;

    if (this.classList.contains("selected")) {

        this.classList.remove("selected")
        checkTurn();

        return;
    }

    var board = document.getElementById("board");

    var hasSelected = board.getElementsByClassName("selected").length > 0;

    if (hasSelected) {
        moveNotAllowed(this);
        return;
    }

    var isWhite = this.classList.contains("whitePiece");
    var isTurnOne = turn === 1;

    if (isWhite && isTurnOne) {
        moveNotAllowed(this);
        return;
    }

    var isRed = this.classList.contains("redPiece");
    var isTurnTwo = turn === 2;

    if (isRed && isTurnTwo) {
        moveNotAllowed(this);
        return;
    }

    if (isRed || isWhite)
        this.classList.add("selected");    
}

function checkTurn() {

    turn = turn === 1 ? 2 : 1;

    var turnElement = getAndClearTurnElement();

    createAndAppendTurnText(turnElement);
}

function moveNotAllowed(element) {

    var oldImage = window.getComputedStyle(element, false).backgroundImage;

    element.style.backgroundImage = `url(${urlNotAllowed})`;

    setTimeout(() => {
        element.style.backgroundImage = oldImage;
    }, 100);
}

function getAndClearTurnElement() {

    var turnElement = document.getElementById("turnText");
    turnElement.innerHTML = "";

    return turnElement;
}

function createAndAppendTurnText(turnElement) {

    var color =  turn === 1 ? "rojas" : "blancas";

    var textElement = document.createElement("h2");
    textElement.innerText = `Turno jugador: ${turn} (${color})`;

    turnElement.appendChild(textElement);
}