const Letter = require("./Letter.js");

function Word(word) {
    this.letters = [];
    word.split("").forEach(function(char) {
        this.letters.push(new Letter.func(char));
    });
    this.display = function() {
        let text = [];
        this.letters.forEach(function(char) {
            text.push(char.updateLetter());
        });
        return text.join(" ");
    };
    this.makeGuess = function(guess) {
        this.letters.forEach(function(char) {
            char.checkLetter(guess);
        });
    };
};

module.exports = {
    func : Word,
}