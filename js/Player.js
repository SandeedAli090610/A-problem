class Player {
  constructor() {
   this.name = null;
   this.positionX = 0;
   this.positionY = 0;
   this.index = null;
   this.rank = 0;
   this.score = 0;
  }
getplayerCount(){
  var playerCountref = database.ref("playerCount");
  playerCountref.on("value",data => 
   { playerCount = data.val(); 
  });
}
updateCount(count) {
   database.ref("/").update({ playerCount: count });
   }
  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
    name: this.name, 
    positionX: this.positionX, 
    positionY: this.positionY, 
    rank: this.rank,
    score: this.score
  });
   } 
   //Bp 
   static getPlayersInfo() {
   var playerInfoRef = database.ref("players");
   playerInfoRef.on("value", data => { allPlayers = data.val(); });
  }

  addPlayer() { 
    var playerIndex = "players/player" + this.index; 
    if (this.index === 1) { 
      this.positionX = width / 2 - 100;
     } 
    else {
       this.positionX = width / 2 + 100;
       }}
  static getPlayersInfo() { 
    var playerInfoRef = database.ref("players"); 
    playerInfoRef.on("value", data => { 
      allPlayers = data.val(); 
    }); 
  }
  getCarsAtEnd(){ 
    database.ref('carsAtEnd').on("value",(data)=>{ 
      this.rank = data.val(); 
    }); 
  } 
  static updateCarsAtEnd(rank) { 
    database.ref("/").update({ 
      carsAtEnd: rank }); 
  }
}
  

