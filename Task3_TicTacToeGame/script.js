const gameBoard = document.getElementById('gameBoard');
const cells = Array.from(document.getElementsByClassName('cell'));
const resetBtn = document.getElementById('resetBtn');
const playerXScore = document.getElementById('playerXScore');
const playerOScore = document.getElementById('playerOScore');
const status = document.getElementById('status');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = { 'X': 0, 'O': 0 };
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        updateScore();
        status.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        status.innerText = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerText = `Player ${currentPlayer}'s Turn`;
}

function updateScore() {
    scores[currentPlayer]++;
    playerXScore.innerText = `Player X: ${scores['X']}`;
    playerOScore.innerText = `Player O: ${scores['O']}`;
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => (cell.innerText = ''));
    status.innerText = `Player ${currentPlayer}'s Turn`;
}

function handleKeyboardInput(event) {
    const key = event.key;
    if (!gameActive || key < 1 || key > 9) return;

    const cellIndex = key - 1;
    const cell = cells[cellIndex];

    if (gameState[cellIndex] === '') {
        gameState[cellIndex] = currentPlayer;
        cell.innerText = currentPlayer;
        checkResult();
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
document.addEventListener('keydown', handleKeyboardInput);
