const Letter = require("./Letter.js");

function Word(word) {
    this.letters = [];
    // Constructing objects for each letter
    word.split("").forEach((char) => {
        this.letters.push(new Letter(char));
    });
    this.makeGuess = function(guess) {
        // Comparing each letter of word to guessed letter
        this.completed = true;
        this.letters.forEach((char) => {
            if (!char.checkLetter(guess)) {
                this.completed = false;
            };
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