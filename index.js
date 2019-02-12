const inquirer = require("inquirer");
const colors = require("colors");
const Word = require("./Word.js");

const categories = {
    Animals : ["Fish", "Whale", "Dog", "Cat", "Squirrel", "Iguana"],
    Movies : ["Men In Black","Jurassic Park","Pulp Fiction", "It", "Up"],
    Valentines : ["Cupid", "Heart", "Arrow","Chocolate"],
};
const maxGuesses = 6;

function startRound(list) {
    if (list.length <= 0) {
        console.log("Completed Category!".magenta); 
        return startGame()
    };
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
            console.log("You Failed!".red + " The corerct answer was: " + colors.green(word));
            return startRound(words);
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

console.log("----------------------------------".blue);
console.log("\nWelcome to the Word Guess Game! \n".yellow);

function startGame() {
    let wordBank = Object.keys(categories);
    wordBank.push("Exit".red);
    inquirer.prompt([
        {
            type : "list",
            name : "category",
            message : "Select a category to begin!",
            choices : wordBank,
        }
    ]).then(function(resp) {
        const category = resp.category;
        if (category.indexOf("Exit") != -1) {
            return console.log("Goodbye, hope you enjoyed!".yellow);
        } else {
            startRound(categories[category]);
        };
    });
};

startGame();