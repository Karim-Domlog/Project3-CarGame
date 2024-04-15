document.addEventListener('DOMContentLoaded', function () {
    // Get references to elements
    const hero = document.querySelector('#hero');
    const hero2 = document.querySelector('#hero2');
    const road = document.querySelector('#road');
    const villian = document.querySelector('#villian');
    const villian2 = document.querySelector('#villian2');
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

    // Generate random position for villains
    function generateRandomPosition() {
        const randomPosition1 = Math.floor(Math.random() * 3) * 100;
        let randomPosition2;
        do {
            randomPosition2 = Math.floor(Math.random() * 3) * 100;
        } while (randomPosition1 === randomPosition2); // Ensure that the positions are different

        villian.style.left = randomPosition1 + 'px';
        villian2.style.left = randomPosition2 + 'px';
    }

    // Event listener for keydown events
    document.addEventListener('keydown', function (e) {
        if (e.key == 'ArrowLeft' || e.key == 'a') {
            moveLeft();
        }
        if (e.key == 'ArrowRight' || e.key == 'd') {
            moveRight();
        }
    });

    // Event listener for animation iteration (villain movement)
    document.addEventListener('animationiteration', function () {
        generateRandomPosition();
    });

    // Check collision and update score
    let gameOver = false; // Variable to track game over state
    function checkCollisionAndScore() {
        if (!gameOver) {
            const heroLeft = parseInt(window.getComputedStyle(hero).getPropertyValue('left'));
            const villianLeft = parseInt(window.getComputedStyle(villian).getPropertyValue('left'));
            const villian2Left = parseInt(window.getComputedStyle(villian2).getPropertyValue('left'));
            const villianTop = parseInt(window.getComputedStyle(villian).getPropertyValue('top'));
            if ((heroLeft === villianLeft && villianTop >= 460) || (heroLeft === villian2Left && villianTop >= 350)) {
                gameOver = true;
                hero.src = 'hero2.png'; // Change hero's image
                endGame();
            } else {
                score++;
                document.querySelector('#score').innerHTML = 'Score: ' + score;
            }
        }
    }

    // Interval for checking collision and updating score
    const checkDead = setInterval(checkCollisionAndScore, 100);

    function endGame() {
        // Display the game over message
        gameOverMessage.style.display = 'block';

        // Display the "Play Again" button
        playAgainButton.style.display = 'block';

        // Stop the animations
        villian.style.animation = 'none';
        villian2.style.animation = 'none';
        road.style.animation = 'none';

        // Stop checking for hero's death
        clearInterval(checkDead);

        // Update high score if necessary
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            document.querySelector('#HighScore').innerHTML = 'High Score: ' + highScore;
        }
    }

    // Event listener for the "Play Again" button
    playAgainButton.addEventListener('click', function () {
        // Reload the page to restart the game
        location.reload();
    });

});
