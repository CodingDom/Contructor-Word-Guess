function Letter(letter,placeholder="_") {
    this.letter = letter;
    this.guessed = false;
    this.placeholder = placeholder;
    this.updateLetter = function() {
        return this.guessed?this.letter:this.placeholder;
    };
    this.checkLetter = function(guess) {
        if (guess.toLowerCase() == this.letter.toLowerCase()) {
            this.guessed = true;
        };
        return this.guessed;
    };
};

module.exports = {
    func : Letter,
}