const colors = require("colors");

function Letter(letter,placeholder="_") {
    this.letter = letter;
    this.guessed = false;
    // For apostrophes, spaces etc.
    const code = letter.toUpperCase().charCodeAt(0);
    if (code < 65 || code > 90) {
        this.guessed = true;
        this.misc = true;
        if (letter == " ") this.letter = " / ";
    };
    this.placeholder = placeholder;
    this.updateLetter = function() {
        if (this.guessed && this.misc) {
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