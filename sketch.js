var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var car1Img, car2Img, car1, car2, track;
var cars = [];
var gameState;
var allPlayers;
var fuelImg, goldCoinImg;
var fuel, goldCoin;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1Img = loadImage("./assets/car1.png");
  car2Img = loadImage("./assets/car2.png");
  track = loadImage("./assets/track.jpg");
  fuelImg = loadImage("./assets/fuel.png");
  goldCoinImg = loadImage("./assets/goldCoin.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();
  game.getState();
}

function draw() {
  background(backgroundImage);
  if(playerCount===2){
    game.update(1);
  }
  if(gameState === 1){
    game.play();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
