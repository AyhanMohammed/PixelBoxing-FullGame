class Game {
    constructor() {
      this.active = false;
      this.pause = false;
      this.life1 = 250;
      this.life2 = 250;
      this.win = createElement("h2");
      this.win2 = createElement("h2");
      this.win3 = createElement("h2");
      this.win4 = createElement("h2");
      this.name1 = null;
      this.name2 = null;
      this.name1Elem = createElement("h4");
      this.name2Elem = createElement("h4");

    }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }

    update(state) {
        database.ref("/").update({
          gameState: state
        });
      }
    
    start() {
        player = new Player();
        playerCount = player.getCount();
    

        boxer1 = createSprite(width / 2 + 300,height - 300);
        boxer1.addImage("redboxer",redboxer);
        boxer1.addImage("redboxerFlip",redflip)
        boxer1.addAnimation("walking",redboxerWalk);
        boxer1.addAnimation("walkingFlip",redwalkFlip)
        boxer1.addAnimation("redpunch",redboxerPunch);
        boxer1.addAnimation("redpunchFlip",redflipPunch);
        boxer1.addAnimation("redDead",redboxerDead);
        boxer1.debug = false;
        boxer1.setCollider("rectangle",-5,5,50,80);

        boxer1.changeImage("redboxer");
      
        boxer1.scale = 3;

        boxer2 = createSprite(width / 2 - 300,height - 300);
        boxer2.addImage("blueboxer",blueflip);
        boxer2.addImage("blueboxerFlip",blueboxer);
        boxer2.addAnimation("blueboxerWalk",bluewalkFlip);
        boxer2.addAnimation("blueboxerWalkFlip",blueboxerWalk);
        boxer2.addAnimation("bluepunch",blueflipPunch);
        boxer2.addAnimation("bluepunchFlip",blueboxerPunch);
        boxer2.addAnimation("blueDead",blueboxerDead);
        boxer2.debug = false;
        boxer2.setCollider("rectangle",5,5,50,80);

        boxer2.changeImage("blueboxer");

        boxer2.scale = 3;

        redicon = createSprite(width / 2 + 680, height / 2 - 270);
        redicon.addImage("redicon",rediconImg);
        redicon.scale = 0.7;

        blueicon = createSprite(width / 2 - 680, height / 2 - 270);
        blueicon.addImage("blueicon",blueiconImg);
        blueicon.scale = 0.7;
        

      //  countDown = createSprite(width / 2, height / 2);
      //  countDown.addAnimation("countdown",countDownAnim);
       

      }

      start2() {
        countDown = createSprite(width / 2, height / 2);
        countDown.addAnimation("countdown",countDownAnim);

        boxer = [boxer1,boxer2];
        console.log(boxer);
      }

      setElementStyle() {
        this.win.position(width / 2 - 300,100);
        this.win.class("blueWin");
        this.win2.position(width / 2 - 300,100);
        this.win2.class("redWin");
        this.win3.position(width / 2 - 300,100);
        this.win3.class("blueWin");
        this.win4.position(width / 2 - 300,100);
        this.win4.class("redWin");
        this.name1Elem.position(width / 2 + 450,height / 2 - 330);
        this.name1Elem.class("greeting");
        this.name2Elem.position(width / 2 - 550,height / 2 - 330);
        this.name2Elem.class("greeting");
      }

    play() {

      background(bg);

      this.setElementStyle();
      
      
      this.timer();
      countDown.changeAnimation("countdown");
 
    
      //countDown.visible = false;

      this.handlePlayerControls();
      //keyReleased();

      this.showRedLife();
      this.showBlueLife();

      pauseButton = createImg("assets/pauseimage.png");
      pauseButton.position(width / 2 - 30,50);
      pauseButton.size(50,50);
      pauseButton.mousePressed(() => {
        this.pause = true;
        keyRel = true;
        this.pauseClick();
      })

      if (this.life1 <= 0) {
        boxer1.changeAnimation("redDead");
        boxer2.changeImage("blueboxer");
        boxer1.y = height - 100;
        this.pause = true;
        this.life1 = 0;
        fill("red");
        rect(width / 2 +350, height - 650, 250, 30);
        var message = `BLUE WINS`
        this.win.html(message);
        this.win.show();
      }

      if (this.life2 <= 0) {
        boxer2.changeAnimation("blueDead");
        boxer1.changeImage("redboxer");
        boxer2.y = height - 100;
        this.pause = true;
        this.life2 = 0;
        fill("red");
        rect(width / 2 - 600, height - 650, 250, 30);
        var message = `RED WINS`
        this.win2.html(message);
        this.win2.show();
      }

      
        
      
      drawSprites()
    }

    /*play() {
      this.handleElements();
      this.handleResetButton();
  
      Player.getPlayersInfo();
      player.getCarsAtEnd();
  
      if (allPlayers !== undefined) {
        image(track, 0, -height * 5, width, height * 6);
  
        this.showFuelBar();
        this.showLife();
        this.showLeaderboard();
  
        //index of the array
        var index = 0;
        for (var plr in allPlayers) {
          //add 1 to the index for every loop
          index = index + 1;
  
          //use data form the database to display the cars in x and y direction
          var x = allPlayers[plr].positionX;
          var y = height - allPlayers[plr].positionY;
  
          var currentLife = allPlayers[plr].life;
          if(currentLife <= 0) {
            cars[index - 1].changeImage("blast")
            cars[index - 1].scale = 0.5;
            gameState = 2;
            this.gameOver();
          }
  
          cars[index - 1].position.x = x;
          cars[index - 1].position.y = y;
  
          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 60, 60);
  
            this.handleFuel(index);
            this.handlePowerCoins(index);
            this.handleObstacleCollision(index);
            this.handleCarCollision(index);
  
            if (player.life <= 0) {
              this.blast = true;
              this.playerMoving = false;
            }
  
            // Changing camera position in y direction
            camera.position.y = cars[index - 1].position.y;
          }
        }
  
        if (this.playerMoving) {
          player.positionY += 5;
          player.update();
        }
  
        // handling keyboard events
        this.handlePlayerControls();
  
        // Finshing Line
        const finshLine = height * 6 - 100;
  
        if (player.positionY > finshLine) {
          gameState = 2;
          player.rank += 1;
          Player.updateCarsAtEnd(player.rank);
          player.update();
          this.showRank();
        }
  
        drawSprites();
      }
    }*/

    play2() {

      background(bg);
      
      this.setElementStyle();

      var playerName = database.ref("players/player1");
        playerName.on("value", data => {
          var data = data.val();
          this.name1 = data.name
        });

      var playerName2 = database.ref("players/player2");
        playerName2.on("value", data => {
          var data = data.val();
          this.name2 = data.name
        });

      this.name1Elem.html(this.name1);
      this.name2Elem.html(this.name2);
 
     
      //console.log("I am here")

      this.timer();
      countDown.changeAnimation("countdown");

      home2 = createImg("assets/homeimage.png");
      home2.position(width / 2 - 30,50);
      home2.size(80,80);
      home2.mousePressed(() => {
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          players: {}
        });
        location.reload();
      })
 
    
      //countDown.visible = false;

      Player.getPlayersInfo();

    

      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;
        this.handlePlayerControlsM(index);
       
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        var life = allPlayers[plr].life
        this.showRedLifeM(life);
        this.showBlueLifeM(life);
        boxer[index - 1].position.x = x;
        boxer[index - 1].position.y = y;
      }

      if (this.life1 <= 0) {
        boxer1.changeAnimation("redDead");
        boxer2.changeImage("blueboxer");
        boxer1.y = height - 100;
        this.pause = true;
        this.gameOverB();
        this.life1 = 0;
        var playerIndex = "players/player1";
            database.ref(playerIndex).update({
              life: this.life1
            });
        fill("red");
        rect(width / 2 +350, height - 650, 250, 30);
    
      }

      if (this.life2 <= 0) {
        boxer2.changeAnimation("blueDead");
        boxer1.changeImage("redboxer");
        boxer2.y = height - 100;
        this.pause = true;
        this.gameOverR();
        this.life2 = 0;
        var playerIndex = "players/player2";
            database.ref(playerIndex).update({
              life: this.life2
            });
        fill("red");
        rect(width / 2 - 600, height - 650, 250, 30);
        var message = `RED WINS`
        this.win4.html(message);
        this.win4.show();
      }




      


      drawSprites();


    }

    gameOverB() {
      var message = `BLUE WINS`
      this.win3.html(message);
      this.win3.show();
    }

    gameOverR() {
      var message = `RED WINS`
      this.win4.html(message);
      this.win4.show();
    }

    updateCountdown() {
      var m = Math.floor(time/60);
      var s = time % 60;
      time = time - 1;
      if (time <- 200) {
        countDown.visible = false;
      }
    }

    timer() {
      setInterval(this.updateCountdown,1000);
    }

    pauseClick() {
        resume = createImg("assets/resumeimage.png");
        resume.position(width / 2-40,height / 2);
        resume.size(80,80);
        resume.mousePressed(() => {
          this.pause = false;
          keyRel = false;
          resume.hide();
          restart.hide();
          home.hide();
        })
    
        restart = createImg("assets/restartimage.png");
        restart.position(width / 2-120,height / 2);
        restart.size(80,80);
        restart.mousePressed(() => {
          this.life1 = 250;
          this.life2 = 250;
          boxer1.x = width / 2 + 300;
          boxer1.y = height - 300;
          boxer2.x = width / 2 - 300;
          boxer2.y = height - 300;
          resume.hide();
          restart.hide();
          home.hide();
          this.win.hide();
          this.win2.hide();
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {}
          });
          boxer1.changeImage("redboxer");
          boxer2.changeImage("blueboxer");
          this.pause = false;
        })
    
        home = createImg("assets/homeimage.png");
        home.position(width / 2+40,height / 2);
        home.size(80,80);
        home.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {}
          });
          location.reload();
        })
    }

    showBlueLife() {

      push();
      fill("white");
      rect(width / 2 - 600, height - 650, 250, 30);
      fill("green");
      rect(width / 2 - 600, height - 650, this.life2, 30);
      noStroke();
      pop();
    }

    showRedLife() {
      push();
      fill("white");
      rect(width / 2 + 350, height - 650, 250, 30);
      fill("green");
      rect(width / 2 + 350, height - 650, this.life1, 30);
      noStroke();
      pop();
    }

    
    showBlueLifeM() {
      var playerDistanceRef = database.ref("players/player2");
      playerDistanceRef.on("value", data => {
        var data = data.val();
        this.life2 = data.life
      });
      push();
      fill("white");
      rect(width / 2 - 600, height - 650, 250, 30);
      fill("green");
      rect(width / 2 - 600, height - 650, this.life2, 30);
      noStroke();
      pop();
 //   }
  }

    showRedLifeM(index) {
      var playerDistanceRef = database.ref("players/player1");
      playerDistanceRef.on("value", data => {
        var data = data.val();
        this.life1 = data.life
      });
      push();
      fill("white");
      rect(width / 2 + 350, height - 650, 250, 30);
      fill("green");
      rect(width / 2 + 350, height - 650, this.life1, 30);
      noStroke();
      pop();
 //   }
  }

    handlePlayerControlsM(index) {
      if (!this.pause) {
        if (index == 1) {
          if (keyDown(RIGHT_ARROW) && player.positionX < width / 2 + 500) {
            boxer1.position.x = boxer1.position.x + 5;
            boxer[index - 1].changeAnimation("walkingFlip");
            this.active = true;
            var playerIndex = "players/player1";
            database.ref(playerIndex).update({
            positionX : boxer1.position.x
            });
          }

          if (keyDown(LEFT_ARROW) && player.positionX > width / 2 - 500) {
            boxer1.position.x = boxer1.position.x - 5;
            boxer[index - 1].changeAnimation("walking");
            this.active = false;
            var playerIndex = "players/player1";
            database.ref(playerIndex).update({
            positionX : boxer1.position.x
            });
          }
    
        }

        if (index == 2) {
          if (keyDown("d") && player.positionX < width / 2 + 500) {
            boxer2.position.x = boxer2.position.x + 5;
            boxer[index - 1].changeAnimation("blueboxerWalk");
            this.active = true;
            var playerIndex = "players/player2";
            database.ref(playerIndex).update({
            positionX : boxer2.position.x
            });
          }

          if (keyDown("a") && player.positionX > width / 2 - 500) {
            boxer2.position.x = boxer2.position.x - 5;
            boxer[index - 1].changeAnimation("blueboxerWalkFlip");
            this.active = false;
            var playerIndex = "players/player2";
            database.ref(playerIndex).update({
            positionX : boxer2.position.x
            });
          }
    
        }


      

      if (index == 2) {
        if (keyDown("e") && this.active == true) {
          boxer[index - 1].changeAnimation("bluepunch");
          if (boxer2.isTouching(boxer1)) {
            this.life1 = this.life1 - 2;
           player.life = this.life1;
           var playerIndex = "players/player1";
            database.ref(playerIndex).update({
            life: this.life1
            });
            punchSound.play();
          }
        }
  
        if (keyDown("e") && this.active == false) {
          boxer[index - 1].changeAnimation("bluepunchFlip");
          if (boxer2.isTouching(boxer1)) {
            this.life1 = this.life1 - 2;
            player.life = this.life1;
            var playerIndex = "players/player1";
            database.ref(playerIndex).update({
              life: this.life1
            });
            punchSound.play();
          }
        }
    }

        if(index == 1){

          if (keyDown("space") && this.active == true) {
          boxer[index - 1].changeAnimation("redpunchFlip");
            if (boxer1.isTouching(boxer2)) {
              this.life2 = this.life2 - 2;
              player.life = this.life2
              var playerIndex = "players/player2";
              database.ref(playerIndex).update({
                life: this.life2
              });
              punchSound.play();
        }
        }

          if (keyDown("space") && this.active == false) {
            boxer[index - 1].changeAnimation("redpunch");
            if (boxer1.isTouching(boxer2)) {
              this.life2 = this.life2 - 2;
              player.life = this.life2;
              var playerIndex = "players/player2";
              database.ref(playerIndex).update({
                life: this.life2
              });
              punchSound.play();
        }
        }
    }
  


  }
}
    

    handlePlayerControls() {
      if (!this.pause) {
        if (keyDown(LEFT_ARROW) && boxer1.x > width / 2 - 500) {
        boxer1.position.x = boxer1.position.x - 5;
        boxer1.changeAnimation("walking");
        this.active = true;
        }
    
        if (keyDown(RIGHT_ARROW) && boxer1.x < width / 2 + 500) {
        boxer1.position.x = boxer1.position.x + 5;
        boxer1.changeAnimation("walkingFlip");
        this.active = false;
        }

        if (keyDown("d") && boxer2.x < width / 2 + 500) {
        boxer2.position.x = boxer2.position.x + 5;
        boxer2.changeAnimation("blueboxerWalk");
        this.active = true;
        }

        if (keyDown("a") && boxer2.x > width / 2 - 500) {
        boxer2.position.x = boxer2.position.x - 5;
        boxer2.changeAnimation("blueboxerWalkFlip");
        this.active = false;
        }

        if (keyDown("space") && this.active == true) {
        boxer1.changeAnimation("redpunch");
          if (boxer1.isTouching(boxer2)) {
          this.life2 = this.life2 - 2;
          punchSound.play();
        }
        }

        if (keyDown("space") && this.active == false) {
        boxer1.changeAnimation("redpunchFlip");
          if (boxer1.isTouching(boxer2)) {
          this.life2 = this.life2 - 2;
          punchSound.play();
        }
        }

        if (keyDown("e") && this.active == true) {
        boxer2.changeAnimation("bluepunch");
          if (boxer2.isTouching(boxer1)) {
          this.life1 = this.life1 - 2;
          punchSound.play();
        }
        }

        if (keyDown("e") && this.active == false) {
        boxer2.changeAnimation("bluepunchFlip");
          if (boxer2.isTouching(boxer1)) {
          this.life1 = this.life1 - 2;
          punchSound.play();
          }
        }
      }
      }
    
    } 
  


  




function keyReleased() {
  if (keyCode == 37 && !keyRel) {
    boxer1.changeImage("redboxer");
  }
  if (keyCode == 39 && !keyRel) {
    boxer1.changeImage("redboxerFlip")
  }
  if (keyCode == 68 && !keyRel) {
    boxer2.changeImage("blueboxer");
  }
  if (keyCode == 65 && !keyRel) {
    boxer2.changeImage("blueboxerFlip")
  }
  /*if (keyCode == 69) {
    boxer1.changeImage("redboxer");
  }
  if (keyCode == 69) {
    boxer1.changeImage("redboxerFlip")
  }*/
}

