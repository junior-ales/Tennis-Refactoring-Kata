function Player(name) {
  this.name = name;
  this.score = 0;
}

var TennisGame1 = function(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);

    this.m_score1 = this.player1.score;
    this.m_score2 = this.player2.score;
};

TennisGame1.prototype.wonPoint = function(playerName) {
    if (playerName === this.player1.name)
        this.m_score1 += 1;
    if (playerName === this.player2.name)
        this.m_score2 += 1;
};

TennisGame1.prototype.getScore = function() {
    var score = "";
    var tempScore = 0;
    if (this.m_score1 === this.m_score2) {
        switch (this.m_score1) {
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
    } else if (this.m_score1 >= 4 || this.m_score2 >= 4) {
        var minusResult = this.m_score1 - this.m_score2;
        if (minusResult === 1) score = "Advantage " + this.player1.name;
        else if (minusResult === -1) score = "Advantage " + this.player2.name;
        else if (minusResult >= 2) score = "Win for " + this.player1.name;
        else score = "Win for " + this.player2.name;
    } else {
        for (var i = 1; i < 3; i++) {
            if (i === 1) tempScore = this.m_score1;
            else {
                score += "-";
                tempScore = this.m_score2;
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
