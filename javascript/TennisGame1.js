var PlayerFactory = (function() {
  var Player = {
    init: function(name) {
      this.name = name;
      this.score = 0;
      return this;
    },

    scored: function() { this.score++; }
  };

  Object.freeze(Player);

  return {
    create: function(name) {
      return Object.create(Player).init(name);
    }
  };
})();

var TennisGame1 = (function() {
  var Tennis = {
    init: function(player1name, player2name) {
      this.player1 = PlayerFactory.create(player1name);
      this.player2 = PlayerFactory.create(player2name);
      return this;
    },

    wonPoint: function(playerName) {
      if (playerName === this.player1.name)
        this.player1.scored();
      if (playerName === this.player2.name)
        this.player2.scored();
    },

    getScore: function() {
      var score = "";
      var tempScore = 0;
      if (this.player1.score === this.player2.score) {
        switch (this.player1.score) {
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
      } else if (this.player1.score >= 4 || this.player2.score >= 4) {
        var minusResult = this.player1.score - this.player2.score;
        if (minusResult === 1) score = "Advantage " + this.player1.name;
        else if (minusResult === -1) score = "Advantage " + this.player2.name;
        else if (minusResult >= 2) score = "Win for " + this.player1.name;
        else score = "Win for " + this.player2.name;
      } else {
        for (var i = 1; i < 3; i++) {
          if (i === 1) tempScore = this.player1.score;
          else {
            score += "-";
            tempScore = this.player2.score;
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
    }
  };

  Object.freeze(Tennis);

  return {
    init: function(player1name, player2name) {
      return Object.create(Tennis).init(player1name, player2name);
    },
    type: 'oloo'
  };
})();

if (typeof window === "undefined") {
  module.exports = TennisGame1;
}
