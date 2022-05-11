class Form {
    constructor() {
      this.input = createInput("").attribute("placeholder", "Enter your name");
      this.playButton = createButton("Multiplayer");
      this.localButton = createButton("Local");
      this.controlButton = createButton("Controls");
      this.greeting = createElement("h2");
      this.BlueControl = createElement("h1");
      this.RedControl = createElement("h1");
    }
  
    setElementsPosition() {
      this.input.position(width / 2 - 130, height / 2 + 120);
      this.playButton.position(width / 2 - 10, height / 2 + 190);
      this.localButton.position(width / 2 - 220, height / 2 + 190);
      this.controlButton.position(width/2-110,height /2 + 270)
      this.greeting.position(width / 2 - 250, height / 2 - 165);
      this.BlueControl.position(width / 2 - 420, height / 2 - 170);
      this.RedControl.position(width / 2 - 600, height / 2 - 20);
    }
  
    setElementsStyle() {
      this.input.class("customInput");
      this.playButton.class("customButton");
      this.localButton.class("customButton");
      this.controlButton.class("customButton");
      this.greeting.class("greeting");
      this.BlueControl.class("BlueControl");
      this.RedControl.class("RedControl");
    }
  
    hide() {
      this.greeting.hide();
      this.playButton.hide();
      this.localButton.hide();
      this.controlButton.hide();
      this.backButton.hide();
      this.input.hide();
      this.BlueControl.hide();
      this.RedControl.hide();
    }
  
    handleMousePressed() {
      this.playButton.mousePressed(() => {
        this.input.hide();
        this.playButton.hide();
        this.localButton.hide();
        this.controlButton.hide();
        this.greeting.show();
  
        var message = `
        Hello ${this.input.value()}
        </br>Waiting for next player...`;
        this.cancelButton = createButton("Cancel");
        this.cancelButton.position(width / 2 - 100, height / 2 + 200);
        this.cancelButton.class("customButton");
        this.cancelButton.mousePressed(() => {
          this.cancelButton.hide();
          this.greeting.hide();
          this.input.show();
          this.playButton.show();
          this.localButton.show();
          this.controlButton.show();
        })  

        this.greeting.html(message);
        playerCount += 1;
        player.name = this.input.value();
        player.index = playerCount;
        player.addPlayer();
        player.updateCount(playerCount);
        player.getDistance();
      //  player.getLife();
        
        time = 100;
        game.start2();
      });
    
    }

    handleMousePress() {
      this.localButton.mousePressed(() => {
        this.input.hide();
        this.playButton.hide();
        this.localButton.hide();
        this.controlButton.hide();
        //game.start();
        gameState = 1;
        time = 100;
        game.start2();
      });
    }

    handleMousePresse() {
      this.controlButton.mousePressed(() => {
        this.input.hide();
        this.playButton.hide();
        this.localButton.hide();
        this.controlButton.hide();
        this.BlueControl.show();
        var message = `
         Blue Controls </br>
         A and D keys to move, E key to punch.</br>`
        this.BlueControl.html(message);
        this.RedControl.show();
        var rMessage = `
        Red Controls </br>
        Left and Right arrows to move, Spacebar to punch.</br>`
        this.RedControl.html(rMessage);
        this.backButton = createButton("Back");
        this.backButton.position(width / 2 - 100, height / 2 + 200);
        this.backButton.class("customButton");
        this.backButton.mousePressed(() => {
          this.backButton.hide();
          this.BlueControl.hide();
          this.RedControl.hide();
          this.input.show();
          this.playButton.show();
          this.localButton.show();
          this.controlButton.show();

        })  
      });
    }

    greetingHide() {
      this.greeting.hide();
      this.cancelButton.hide();
    }
    
  
    display() {
      this.setElementsPosition();
      this.setElementsStyle();
      this.handleMousePressed();
      this.handleMousePress();
      this.handleMousePresse();
      //this.handleBackPressed();
    }
  }
  