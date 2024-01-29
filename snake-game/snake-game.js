//snake game code made following YouTube tutorial from Kenny Yip Coding - 
//https://www.youtube.com/watch?v=baBq5GAL0_U

//board
const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;

//snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

//snake movement
let velocityX = 0;
let velocityY = 0;

//empty array for snake body, made up of segments of the canvas
const snakeBody = [];

//food
let foodX;
let foodY;

let score = 0;
let highScore = document.getElementById("highscore")


//display high score
if (localStorage.getItem("snakescore")) {
    highScore.innerText = localStorage.getItem("snakescore");
} else {
    highScore.innerText = 0;
}


let gameOver = false;


//what happens when window loads
window.onload = function() {
    //black board
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = rows * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    placeFood();
    document.addEventListener("keyup", changeDirection);
    //refresh rate
    setInterval(update, 1000/10);
}

function update() {
    if (gameOver) {
        return;
    }

    //size and colour of board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //size and colour of food
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //editing the array for the snake body to add one square to the end
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);

        //add 5 points to the score when one food is eaten
        let score5 = score += 5;
        document.getElementById("cscore").innerText = score5;
        if (score5 >= localStorage.getItem("snakescore")) {
            localStorage.setItem("snakescore", score5);
        }
        //randomly place another square of food when one is eaten
        placeFood();
    }

    //snake movement
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    //styling for snake
    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);

        //add 1 point to score for every individual square moved
        let score1 = score += 1;
        document.getElementById("cscore").innerText = score1;
        if (score1 >= localStorage.getItem("snakescore")) {
            localStorage.setItem("snakescore", score1);
        }
    }


    //game over conditions
    if (snakeX < 0 || snakeX > cols * blockSize - 1 || snakeY < 0 || snakeY > rows * blockSize - 1) {
        gameOver = true;
        alert("Game Over!");
    }

    //game over is the snake hits its own body
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over!");
        }
    }
}

//how to control the snake
function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

//radomize food placement
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

//trying to ficure out scoring on my own...

// function addScore() {
//     if (placeFood()) {
//         let scoreBoard = document.getElementById("score").innerHTML();
//         let value2 = parseInt(scoreBoard) + 5;
//         document.getElementById("score").innerHTML() = value2;
//     }
    
    // else if (velocityX + 1 || velocityY + 1) {
    //     
    //     let value1 = parseInt(scoreBoard) + 1;
    //     document.getElementById("score").innerHTML() = value1;
    // }
// }



//things to change/add:

//-food can be placed underneath te snake currently, make it place only on free space on canvas
//-all functions are quite large. separate them into smaller functions
//-scoring starts only after first piece of food eaten. might be something to do with context?
//-ad a congratulations to game over pop up if you get a high score
//-try having the snake go through walls and come back in through the opposite side?