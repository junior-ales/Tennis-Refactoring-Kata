function Player(name) {
    this.name = name;
    this.score = 0;
}

var TennisGame1 = function(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
};

TennisGame1.prototype.wonPoint = function(playerName) {
    if (playerName === this.player1.name)
        this.player1.score += 1;
    if (playerName === this.player2.name)
        this.player2.score += 1;
};

TennisGame1.prototype.getScore = function() {
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
};

if (typeof window === "undefined") {
    module.exports = TennisGame1;
}
