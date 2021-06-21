var turn = 0;
const urlRedPiece = "./img/red-piece.png";
const urlWhitePiece = "./img/white-piece.png";
const urlNotAllowed = "./img/notAllowed.png";

window.onload = function () {

    var stateGame = defaultState();

    createBoard(stateGame);

    var element = document.getElementById("newGameButton");
    element.onclick = InitializeTurn;
}

function InitializeTurn() {

    alert("Turno Jugador 1");

    var board = document.getElementById("board");
    board.innerHTML = "";

    var state = defaultState();
    createBoard(state);
    
    turn = 1;
}

function createBoard(stateGame) {

    var board = document.getElementById("board");

    stateGame.forEach(function (row, j) {

        var rowElement = CreateRow(j);

        row.forEach(function (cell, i) {

            var cellElement = CreateCell(j, i);

            CheckPieceType(cell, cellElement);

            cellElement.onclick = Select;

            rowElement.appendChild(cellElement);
        });

        board.appendChild(rowElement);
    });
}

function CheckPieceType(cell, cellElement) {

    var pieceType = cell === 1 ? "redPiece" : cell === 2 ? "whitePiece" : "";

    if (pieceType.length > 0)
        cellElement.classList.add(pieceType);
}

function CreateRow(j) {

    var row = document.createElement("div");

    row.classList.add("board_row");
    row.classList.add(`row${j + 1}`);

    return row;
}

function CreateCell(j, i) {

    var cell = document.createElement("div");

    cell.classList.add("checkersSquare");
    cell.classList.add(`item${j + 1}-${i + 1}`);

    return cell;
}

function Select() {

    if (this.classList.contains("selected")) {

        this.classList.remove("selected")
        CheckTurn();
        return;
    }

    var board = document.getElementById("board");

    var element = board.getElementsByClassName("selected");
    var hasSelected = element.length > 0;

    if (turn === 0 || hasSelected)
        return;

    var isRed = this.classList.contains("redPiece");
    var isWhite = this.classList.contains("whitePiece");

    if (isWhite && turn === 1) {

        this.style.backgroundImage = `url(${urlNotAllowed})`

        setTimeout(() => {
            this.style.backgroundImage = `url(${urlWhitePiece})`
        }, 1000);

        return;
    }

    if (isRed && turn === 2) {

        this.style.backgroundImage = `url(${urlNotAllowed})`

        setTimeout(() => {
            this.style.backgroundImage = `url(${urlRedPiece})`
        }, 1000);

        return;
    }

    if (isRed || isWhite)
        this.classList.add("selected");    
}

function CheckTurn() {
    turn = turn === 1 ? 2 : 1;
    alert("Turno jugador " + turn);
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