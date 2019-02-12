const Letter = require("./Letter.js");

function Word(word) {
    this.letters = [];
    word.split("").forEach((char) => {
        this.letters.push(new Letter(char));
    });
    this.makeGuess = function(guess) {
        this.letters.forEach((char) => {
            this.completed = char.checkLetter(guess);
        });
    };
    this.toString = function() {
        let text = [];
        this.letters.forEach(function(char) {
            text.push(char.updateLetter());
        });
        return text.join(" ");
    };
};

module.exports = Word;