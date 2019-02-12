// Requiring modules
const inquirer = require("inquirer");
const colors = require("colors");
const Word = require("./Word.js");

// Word banks for each category
const categories = require("./wordbank.json");

// Maximum amount of guesses per word
const maxGuesses = 6;

// Starts up round for each word in selected word bank
function startRound(list) {
    // Once list reaches 0, category is completed
    if (list.length <= 0) {
        console.log("Completed Category!".magenta); 
        return startGame()
    };
    // Clones the word bank's array
    let words = list.slice(0);
    // Selecting  and removing random word from word bank
    const randomIndex = Math.floor(Math.random()*words.length);
    const word = words[randomIndex];
    words.splice(randomIndex,1);
    const wordObj = new Word(word);
    // Used to check if guess was incorrect/correct
    let prevGuess = wordObj.toString();
    // Amount of guessing remaining for current word
    let remainder = maxGuesses;
    // Every letter that has been guessed
    let guessed = [];

    // Function used to display messages and handle game logic
    function display(info="") {
        // Displaying the message along with the word needed to be guessed
        if (info != "") info += "\n\n";
        let msg = "\n";
        msg += info;
        msg += "Guesses Remaining: " + colors.red(remainder) + " | ".blue + "Guessed Letters: " + colors.magenta(guessed.join(", ")) + "\n\n";
        msg += wordObj + "\n";
        console.log(msg);

        // Checking whether the round ended or not
        // Declaring victory/loss
        if (remainder <= 0) {
            console.log("You Failed!".red + " The corerct answer was: " + colors.green(word));
            return startRound(words);
        } else if (wordObj.completed) {
            console.log("Good Job!".green + " Word Complete..".grey);
            return startRound(words);
        }

        // Prompting letting guessing option
        inquirer.prompt([
            {
                name : "guess",
                message : "Guess a letter!"
            }
        ])
        .then(function(resp) {
            const guess = resp.guess;
            // Checking for acceptable guess
            if (guessed.indexOf(guess) >= 0) return display("You already guessed this letter!".yellow);
            const code = guess.toUpperCase().charCodeAt(0);
            if (guess.length != 1 || (code < 65 || code > 90)) return display("Must enter a single letter!".yellow);
            guessed.push(guess);
            // Checking for correct guess
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

// Application start up
console.log("----------------------------------".blue);
console.log("\nWelcome to the Word Guess Game! \n".yellow);

function startGame() {
    // Grabbing categories
    let wordBank = Object.keys(categories);
    // Alphabetically organizing categories
    wordBank.sort();
    // Adding quit option
    wordBank.push("Exit".red);
    // Creating category selection
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
        };
        startRound(categories[category]);
    });
};

startGame();