var canvas;
var database, gameState,game,player,playerCount,form,allPlayers;
var bg, bgHome;
var boxer1, boxer2;
var redboxer, blueboxer, redboxerPunch, blueboxerPunch, redboxerWalk, blueboxerWalk, redboxerDead, blueboxerDead;
var pauseButton, resume, home, restart, countDownAnim, countDown, home2;
var redflip, redflipPunch,redwalkFlip, reddeadFlip, blueflip, blueflipPunch, bluewalkFlip, bluedeadFlip;
var rediconImg, redicon, blueiconImg, blueicon;
var punchSound;
var keyRel = false;
var time = 100;
var boxer = [];


function preload() {
  bg = loadImage("assets/bg.jpg");
  bgHome = loadImage("assets/bghome.png");
  redboxer = loadImage("assets/redboxer.png");
  redboxerPunch = loadAnimation("assets/redboxerpunch1.png","assets/redboxerpunch2.png")
  redboxerWalk = loadAnimation("assets/redboxerwalk.png","assets/redboxer.png")
  redboxerDead = loadImage("assets/reddead.png");
  blueboxer = loadImage("assets/blueboxer.png");
  blueboxerPunch = loadAnimation("assets/blueboxerpunch1.png","assets/blueboxerpunch2.png");
  blueboxerWalk = loadAnimation("assets/blueboxerwalk.png","assets/blueboxer.png");
  blueboxerDead = loadImage("assets/bluedead.png")
  redflip = loadImage("assets/redflip.png");
  redflipPunch = loadAnimation("assets/redflip2.png","assets/redflip3.png");
  redwalkFlip = loadAnimation("assets/redwalkflip.png","assets/redflip.png");
  reddeadFlip = loadImage("assets/reddeadflip.png");
  blueflip = loadImage("assets/blueflip.png");
  blueflipPunch = loadAnimation("assets/blueflip2.png","assets/blueflip3.png");
  bluewalkFlip = loadAnimation("assets/bluewalkflip.png","assets/blueflip.png");
  bluedeadFlip = loadImage("assets/bluedeadflip.png");
  rediconImg = loadImage("assets/redicon.png");
  blueiconImg = loadImage("assets/blueicon.png");
  punchSound = loadSound("assets/punch.wav");
  countDownAnim = loadAnimation("assets/3image.png","assets/3image.png","assets/3image.png","assets/2image.png","assets/1image.png","assets/1image.png","assets/1image.png","assets/1image.png","assets/1image.png");
  //countDownAnim.looping = false
 // countDownAnim = loadAnimation("assets/3image.png","assets/2image.png","assets/1image.png")
  countDownAnim.frameDelay = 25;
}

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  database = firebase.database();

  
  form = new Form();
  form.display();

  game = new Game()
  game.getState();
  //player.getDistance();
  game.start();



  gameState = 0;

 

}

function draw() {
  background(bgHome)
  if (playerCount === 2) {
    game.update(2);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    console.log("game state is 2")
    game.play2();
    form.greetingHide();
  }


}