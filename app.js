const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");



class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

let score = 0;

//Game Loop

function drawGame() {
  changeSnakePosition();
  let result = isGameOver();
  if(result){
    return;
  }
  clearScreen();
  

  checkAppleCollision();
  drawApple();
  drawSnake();

  drawScore();

  if(score > 5){
    speed = 9;
  }
  if(score > 10){
    speed = 11;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver(){
  let gameOver = false;

if(yVelocity ===0 && xVelocity ===0){
  return false;
}

  //Walls
  if(headX < 0){
    gameOver = true;
  }
  else if(headX === tileCount){
    gameOver = true
  }
  else if(headY < 0){
    gameOver = true;
  }
  else if(headY === tileCount){
    gameOver = true
  }

  for(let i = 0; i < snakeParts.length; i++){
    let part = snakeParts[i];
    if(part.x === headX && part.y === headY){
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";

    ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2)
  }

  return gameOver;
}

function drawScore() {
  document.getElementById("blocksLong").innerHTML  = score + 2;
}

function clearScreen() {
  ctx.fillStyle = "#003366";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "#ccff00";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new snakePart(headX, headY));
  while (snakeParts.length > tailLength) {
    snakeParts.shift();
  }

  ctx.fillStyle = "#ff7f50";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

  
}



function drawApple() {
  ctx.fillStyle = "#800000";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
  headX = headX + xVelocity;
  headY = headY + yVelocity;
}

function checkAppleCollision() {
  if (appleX === headX && appleY == headY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }
}


document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
  //UP
  if (event.keyCode == 38) {
    if (yVelocity == 1) return;
    yVelocity = -1;
    xVelocity = 0;
  }

  //DOWN
  if (event.keyCode == 40) {
    if (yVelocity == -1) return;
    yVelocity = 1;
    xVelocity = 0;
  }

  //LEFT
  if (event.keyCode == 37) {
    if (xVelocity == 1) return;
    yVelocity = 0;
    xVelocity = -1;
  }

  //RIGHT
  if (event.keyCode == 39) {
    if (xVelocity == -1) return;
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame();
