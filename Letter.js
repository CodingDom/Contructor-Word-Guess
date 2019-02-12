const colors = require("colors");

function Letter(letter,placeholder="_") {
    this.letter = letter;
    this.guessed = false;
    if (letter == " ") {this.letter = " / ";this.guessed = true;this.space = true;};
    this.placeholder = placeholder;
    this.updateLetter = function() {
        if (this.guessed && this.space) {
            return this.letter;
        } else if (this.guessed) {
            return colors.underline(this.letter);
        } else {
            return this.placeholder;
        };
    };
    this.checkLetter = function(guess) {
        if (guess.toLowerCase() == this.letter.toLowerCase()) {
            this.guessed = true;
        };
        return this.guessed;
    };
};

module.exports = Letter;