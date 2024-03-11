document.addEventListener('DOMContentLoaded', function () {
    // Get references to elements
    const hero = document.querySelector('#hero');
    const road = document.querySelector('#road');
    const villian = document.querySelector('#villian');
    const gameOverMessage = document.querySelector('#gameOverMessage');
    const playAgainButton = document.querySelector('#playAgainButton');

    // Set initial score and high score
    let score = 0;
    let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
    document.querySelector('#HighScore').innerHTML = 'High Score: ' + highScore;

    // Move the hero left
    function moveLeft() {
        const leftPos = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
        if (leftPos >= 100) {
            hero.style.left = leftPos - 100 + 'px';
        }
    }

    // Move the hero right
    function moveRight() {
        const leftPos = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
        if (leftPos < 200) {
            hero.style.left = leftPos + 100 + 'px';
        }
    }

    // Generate random position for villain
    function generateRandomPosition() {
        const randomNumber = Math.floor(Math.random() * 3) * 100;
        villian.style.left = randomNumber + 'px';
    }

    // Event listener for keydown events
    document.addEventListener('keydown', function (e) {
        if (e.key == 'ArrowLeft') {
            moveLeft();
        }
        if (e.key == 'ArrowRight') {
            moveRight();
        }
    });

    // Event listener for animation iteration (villain movement)
    document.addEventListener('animationiteration', function () {
        generateRandomPosition();
    });

    // Check collision and update score
    function checkCollisionAndScore() {
        const heroLeft = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
        const villainLeft = parseInt(window.getComputedStyle(villian).getPropertyValue('left'));
        const villainTop = parseInt(window.getComputedStyle(villian).getPropertyValue('top'));
        if (heroLeft === villainLeft && villainTop >= 400) {
            gameOverMessage.style.display = 'block';
            playAgainButton.style.display = 'block';
            villian.style.animation = 'none';
            road.style.animation = 'none';
            villian.style.top = villainTop + 'px';
            clearTimeout(checkDead);
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                document.querySelector('#HighScore').innerHTML = 'High Score: ' + highScore;
            }
        } else {
            score++;
            document.querySelector('#score').innerHTML = 'Score: ' + score;
        }
    }

    // Interval for checking collision and updating score
    const checkDead = setInterval(checkCollisionAndScore, 100);

    function gameOver() {
        // Display the game over message
        gameOverMessage.style.display = 'block';
        
        // Display the "Play Again" button
        playAgainButton.style.display = 'block';
        
        // Stop the animations
        villian.style.animation = 'none';
        road.style.animation = 'none';
        
        // Stop checking for hero's death
        clearTimeout(checkDead);
    }

    // Event listener for the "Play Again" button
    playAgainButton.addEventListener('click', function () {
        // Reload the page to restart the game
        location.reload();
    });
});
