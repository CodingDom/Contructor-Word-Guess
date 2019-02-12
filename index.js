const inquirer = require("inquirer");
const colors = require("colors");
const Word = require("./Word.js");

const wordBank = ["Jurassic Park", "Dinosaur", "Fish", "Whale"];
const maxGuesses = 6;

function startRound(list) {
    let words = list.slice(0);
    const randomIndex = Math.floor(Math.random()*words.length);
    const word = words[randomIndex];
    words.splice(randomIndex,1);
    const wordObj = new Word(word);
    let prevGuess = wordObj.toString();
    let remainder = maxGuesses;
    let guessed = [];

    function display(info="") {
        if (info != "") info += "\n\n";
        let msg = "\n";
        msg += info;
        msg += "Guesses Remaining: " + remainder + " | ".blue + "Guessed Letters: " + colors.magenta(guessed.join(", ")) + "\n\n";
        msg += wordObj + "\n";
        console.log(msg);

        if (remainder <= 0) {
            return console.log("You lose!".red + " The corerct answer was: " + colors.green(word));
        } else if (wordObj.completed) {
            console.log("Good Job!".green + " Word Complete..".grey);
            return startRound(words);
        }

        inquirer.prompt([
            {
                name : "guess",
                message : "Guess a letter!"
            }
        ])
        .then(function(resp) {
            const guess = resp.guess;
            if (guessed.indexOf(guess) >= 0) return display("You already guessed this letter!".yellow);
            const code = guess.toUpperCase().charCodeAt(0);
            if (guess.length != 1 || (code < 65 || code > 90)) return display("Must enter a single letter!".yellow);
            guessed.push(guess);
            wordObj.makeGuess(guess);
            if (prevGuess != wordObj.toString()) {
                display("Correct".green);
            } else {
                remainder--;
                display("Incorrect".red);
            };
            prevGuess = wordObj.toString();
        });
    };

    display();
};

startRound(wordBank);
