class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function (data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
    
      form = new Form()
      form.display();
    }
  }
  play() {
    form.hide();
    textSize(30);
    text("game start ", 120, 100);
    Player.getPlayerInfo();
    if (allPlayers != undefined) {
      var display_position = 130;
      textSize(15);
      for (var plr in allPlayers) {
        if (plr === "player" + player.index) {
          fill("red")  
        }
        else {
          fill("black")
        }
        display_position+= 20;
        var keyName = allPlayers[plr].name;
        var keyDistance = allPlayers[plr].distance;
        text(keyName + " = " + keyDistance,120,display_position);


      }
    }
  }
}
