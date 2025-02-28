const target = document.getElementById('target');
const startBtn = document.getElementById('startBtn');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const gameOverElement = document.getElementById('gameOver');

let score = 0;
let timeLeft = 30;
let gameActive = false;
let timerId = null;

function startGame() {
    if (gameActive) return;
    
    gameActive = true;
    score = 0;
    timeLeft = 30;
    updateScore();
    timeElement.textContent = timeLeft;
    gameOverElement.style.display = 'none';
    startBtn.disabled = true;
    
    moveTarget();
    
    timerId = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function moveTarget() {
    if (!gameActive) return;
    
    const container = target.parentElement;
    const maxX = container.offsetWidth - target.offsetWidth;
    const maxY = container.offsetHeight - target.offsetHeight;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    target.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function updateScore() {
    scoreElement.textContent = score;
    target.style.backgroundColor = `hsl(${score * 10}, 70%, 50%)`;
}

function endGame() {
    gameActive = false;
    clearInterval(timerId);
    startBtn.disabled = false;
    gameOverElement.style.display = 'block';
    target.style.transform = 'translate(0, 0)';
}

target.addEventListener('click', () => {
    if (gameActive) {
        score++;
        updateScore();
        moveTarget();
        
        target.style.transform += ' scale(0.9)';
        setTimeout(() => {
            target.style.transform = target.style.transform.replace(' scale(0.9)', '');
        }, 100);
    }
});

startBtn.addEventListener('click', startGame);
