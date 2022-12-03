class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
  }

  getState(){
    var gameStateref = database.ref("gameState");
    gameStateref.on("value",data => 
     { gameState = data.val(); 
    });
  }
  update(state) {
    database.ref("/").update({ gameState: state });
    }

    start(){
      player = new Player();
      player.getplayerCount();
      form = new Form();
      form.display();
      car1 = createSprite(width / 2 - 50, height - 100);
      car1.addImage(car1Img);
      car1.scale = 0.07;
      car2 = createSprite(width / 2 + 100, height - 100);
      car2.addImage(car2Img);
      car2.scale = 0.07;
      fuel = new Group();
      goldCoin = new Group();
      cars = [car1,car2];
      this.addSprites(fuel,4,fuelImg,0.02);
      this.addSprites(goldCoin,18,goldCoinImg,0.09);
    }

    handleResetButton(){
      this.resetButton.mousePressed(()=>{
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          players:{}
        })
        window.location.reload();
      })
    }
    handlePlayerControls() { 
      if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update(); 
      } 
      if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) { 
        player.positionX -= 5;
        player.update();
       } 
       if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
        player.positionX += 5;
        player.update(); 
      }
   }
    
    play(){
      form.greeting.hide();
      form.titleImg.position(40,50);
      this.resetTitle.html("Reset Game"); 
      this.resetTitle.class("resetText"); 
      this.resetTitle.position(width / 2 + 200, 40); 
      this.resetButton.class("resetButton"); 
      this.resetButton.position(width / 2 + 230, 100);
      this.handleResetButton();
      Player.getPlayersInfo();
      player.getCarsAtEnd();
      if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
      //index of the array
      //this.showLeaderboard(); 
      var index = 0;
      for (var plr in allPlayers) { 
      //add 1 to the index for every loop 
      index = index + 1;
       //use data form the database to display the cars in x and y direction 
      var x = allPlayers[plr].positionX; 
      var y = height - allPlayers[plr].positionY; 
      cars[index - 1].position.x = x; 
      cars[index - 1].position.y = y;

      if (index === player.index) {
      stroke(10); 
      fill("red"); 
      ellipse(x, y, 60, 60);
      this.handleFuel(index);
      this.handleGoldCoins(index);
      camera.position.y = cars[index-1].position.y;
      //camera.position.x = cars[index-1].position.x;
     }
     }
     this.handlePlayerControls();
     const finishLine = height * 6 - 100; 
     if (player.positionY > finishLine) { 
      gameState = 2; 
      player.rank += 1; 
      Player.updateCarsAtEnd(player.rank); 
      player.update(); 
      //this.showRank(); 
    }
     drawSprites();
    }
  }
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale){
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;
      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400); 
      var sprite = createSprite(x, y); 
      sprite.addImage("sprite", spriteImage); 
      sprite.scale = scale; 
      spriteGroup.add(sprite);
     } }

     handleFuel(index) { 
      // Adding fuel 
      cars[index - 1].overlap(fuel, function(collector, collected) { 
        player.fuel = 185; 
        collected.remove(); 
      });
     }

     handleGoldCoins(index) { 
      cars[index - 1].overlap(goldCoin, function(collector, collected) { 
        player.score += 21; 
        player.update(); 
        collected.remove();
       });
      }
      showLeaderboard() {
        var leader1, leader2;
        var players = Object.values(allPlayers);
        if (
          (players[0].rank === 0 && players[1].rank === 0) ||
          players[0].rank === 1
        ) {
          // &emsp;    This tag is used for displaying four spaces.
          leader1 =
            players[0].rank +
            "&emsp;" +
            players[0].name +
            "&emsp;" +
            players[0].score;
      
          leader2 =
            players[1].rank +
            "&emsp;" +
            players[1].name +
            "&emsp;" +
            players[1].score;
        }
      
        if (players[1].rank === 1) {
          leader1 =
            players[1].rank +
            "&emsp;" +
            players[1].name +
            "&emsp;" +
            players[1].score;
      
          leader2 =
            players[0].rank +
            "&emsp;" +
            players[0].name +
            "&emsp;" +
            players[0].score;
        }
      
        this.leader1.html(leader1);
        this.leader2.html(leader2);
      }
      
  }


  