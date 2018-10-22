var TextPlayer = function (name) {
  this.actions = new Player(name);

  var match = null;
  var current_round = null;
  var player_id = null;
  var executeToken = 1;

  var that = this;

  this.setupMatch = function (poker_match) {
    match = poker_match;
    for(let i = 0; i < match.players.length; i++) {
      let playerName = match.players[i].getName();
      let playerEl = `<div class='player player-`+playerName+i+`'>
      `+playerName+`
      (Money: <div class="money" style="display:inline-block">`+ match.players[i].actions.getBudget() +`</div>)
      </div>`;
      $("#matchWrapper").append([playerEl]);
    }
  }

  this.getName = function () {
    return name;
  }
  this.setupNextRound = function (round_of_poker, id) {
    current_round = round_of_poker;
    player_id = id;
    current_round.registerEventHandler(Poker.ROUND_STARTED_EVENT, function (e) {
      let dealer = e.getDealer();
      $(".player-"+dealer.getName()+dealer.player_id).append("Dealer");

    });

    current_round.registerEventHandler(Poker.TURN_STARTED_EVENT, function (e) {
      console.log("turn started");

    });

    current_round.registerEventHandler(Poker.BET_START_EVENT, function(e) {
      console.log("bet started");

      $(".turn").remove();
      $(".player-"+e.getBetter().getName()+e.getBetter().player_id).append("<div class='turn'>Your turn</div>");

      if(e.getBetter().player_id === id) {
        $("#consoleSubmit").on("click", function() {
          let input = $("#pokerConsole").val();
          if(input.substring(0,6) === "raise(" && input[input.length-1] === ")" ) {
              let number = parseInt(input.substring(6,input.length-1));
              current_round.raise(number, e.getBetter().player_id);
          } else if(input === "call()") {
              current_round.call(e.getBetter().player_id);
          } else if(input ==="fold()") {
              current_round.fold(e.getBetter().player_id);
          } else if(input === "check()"){
              current_round.check(e.getBetter().player_id);
          }else {
            $("#pokerConsole").val("invalid command");
          }
        });
      }
    });


    current_round.registerEventHandler(Poker.BET_ENDED_EVENT, function(e) {
      console.log("bet ended");

        $(".player-"+e.getPreviousBetter().getName()+e.getPreviousBetter().player_id+" .money").text(e.getPreviousBetter().actions.getBudget());
    });

    current_round.registerEventHandler(Poker.TURN_ENDED_EVENT, function (e) {
      console.log("turn ended");
    });

    current_round.registerEventHandler(Poker.ERROR, function (e) {
      console.log(e.getError());
    });
  }
}
