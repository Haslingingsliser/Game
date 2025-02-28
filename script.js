const target = document.getElementById('target');
const startBtn = document.getElementById('startBtn');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const gameOverElement = document.getElementById('gameOver');
const clickArea = document.getElementById('clickArea');
const bgMusic = document.getElementById('bgMusic');

let score = 0;
let timeLeft = 60;
let gameActive = false;
let timerId = null;

// Path gambar relatif ke folder images
const images = ['./images/bingus.jpg', './images/spongius.jpg'];

// Preload images untuk menghindari delay saat pertama kali muncul
const preloadImages = () => {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};
preloadImages();

// Fungsi untuk memutar musik
function startMusic() {
    bgMusic.play()
        .then(() => {
            console.log('Musik berhasil diputar');
        })
        .catch(error => {
            console.log('Gagal memutar musik:', error);
        });
}

// Fungsi untuk mendapatkan posisi acak di dalam area klik
function getRandomPosition(element) {
    const container = element.parentElement;
    const maxX = container.offsetWidth - element.offsetWidth;
    const maxY = container.offsetHeight - element.offsetHeight;
    return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY)
    };
}

// Fungsi untuk mengubah gambar dan posisi target
function changeImage() {
    if (!gameActive) return;
    
    const randomIndex = Math.floor(Math.random() * images.length);
    const newPosition = getRandomPosition(target);
    
    target.src = images[randomIndex];
    target.style.left = `${newPosition.x}px`;
    target.style.top = `${newPosition.y}px`;
}

// Fungsi untuk memperbarui skor
function updateScore() {
    scoreElement.textContent = score;
}

// Fungsi untuk memulai game
function startGame() {
    if (gameActive) return;
    
    gameActive = true;
    score = 0;
    timeLeft = 60;
    updateScore();
    timeElement.textContent = timeLeft;
    gameOverElement.style.display = 'none';
    startBtn.disabled = true;
    
    // Reset tampilan target
    target.style.display = "block";
    
    // Tampilkan gambar pertama
    changeImage();
    
    // Mulai timer
    timerId = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// Fungsi untuk mengakhiri game
function endGame() {
    gameActive = false;
    clearInterval(timerId);
    startBtn.disabled = false;
    gameOverElement.textContent = `Game Over! Final Score: ${score}`;
    gameOverElement.style.display = 'block';
    target.style.display = 'none';
}

// Fungsi untuk menangani klik pada gambar
function handleImageClick() {
    if (gameActive) {
        score++;
        updateScore();
        changeImage();
        target.style.animation = 'clickEffect 0.3s';
        setTimeout(() => {
            target.style.animation = '';
        }, 300);
    }
}

// Event Listeners
startBtn.addEventListener('click', () => {
    bgMusic.muted = false; // Hapus muted
    startMusic(); // Mulai musik
    startGame(); // Mulai game
});
target.addEventListener('click', handleImageClick);
