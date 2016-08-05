var TennisGame1 = (function() {
  function Player(name) {
    var INITIAL_SCORE = 0;

    var score = INITIAL_SCORE;

    var self = {
      getName: function() { return name; },
      getScore: function() { return score; },
      scored: function() { score++; }
    };

    Object.freeze(self);
    return self;
  }

  return function(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  };

})();

TennisGame1.prototype.wonPoint = function(playerName) {
  if (playerName === this.player1.getName())
    this.player1.scored();
  if (playerName === this.player2.getName())
    this.player2.scored();
};


TennisGame1.prototype.getScore = function() {
  var score = "";
  var tempScore = 0;
  if (this.player1.getScore() === this.player2.getScore()) {
    switch (this.player1.getScore()) {
      case 0:
        score = "Love-All";
        break;
      case 1:
        score = "Fifteen-All";
        break;
      case 2:
        score = "Thirty-All";
        break;
      default:
        score = "Deuce";
        break;
    }
  } else if (this.player1.getScore() >= 4 || this.player2.getScore() >= 4) {
    var minusResult = this.player1.getScore() - this.player2.getScore();
    if (minusResult === 1) score = "Advantage " + this.player1.getName();
    else if (minusResult === -1) score = "Advantage " + this.player2.getName();
    else if (minusResult >= 2) score = "Win for " + this.player1.getName();
    else score = "Win for " + this.player2.getName();
  } else {
    for (var i = 1; i < 3; i++) {
      if (i === 1) tempScore = this.player1.getScore();
      else {
        score += "-";
        tempScore = this.player2.getScore();
      }
      switch (tempScore) {
        case 0:
          score += "Love";
          break;
        case 1:
          score += "Fifteen";
          break;
        case 2:
          score += "Thirty";
          break;
        case 3:
          score += "Forty";
          break;
      }
    }
  }
  return score;
};

if (typeof window === "undefined") {
  module.exports = TennisGame1;
}
