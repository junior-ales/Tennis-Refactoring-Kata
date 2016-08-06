var TennisGame1 = (function() {
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

  var DRAW_SCORES = {
    0: "Love-All",
    1: "Fifteen-All",
    2: "Thirty-All"
  };

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
      var minusResult = this.player1.score - this.player2.score;

      var isDraw = minusResult === 0;
      if (isDraw) {
        return DRAW_SCORES[this.player1.score] || "Deuce";
      }

      var isHighScore = this.player1.score >= 4 || this.player2.score >= 4;
      if (isHighScore) {
        if (minusResult ===  1) return "Advantage " + this.player1.name;
        if (minusResult === -1) return "Advantage " + this.player2.name;

        return "Win for " + (minusResult > 1 ? this.player1.name : this.player2.name);
      }

      var score = "";
      var tempScore = 0;

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
