// Global Variables (accessible by all functions)

// Array of Word Options (lowercase)
var wordsList = ["drake", "abel", "onika", "tiwa", "ayo", "selena", "future", "david", "rick", "dvsn"];
// Solutions will be held here.
var chosenWord = "";
// This will break the solution into individual letters to be stored in array.
var lettersInChosenWord  = [];
// This will be the number of blanks shown based on the solution.
var numBlanks = 0;
// Holds a mix of  blank and solved letters.
var blanksAndSuccesses = [];
// Holds all the wrong guesses
var wrongGuesses = [];

// Game Counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 9;

// FUNCTONS (bits of code that will be called upon to run when needed)

// startGame()
// its how the game will start and restart
/// note: its not being run here. It's just being saved for future use
function startGame() {
    // Reset the guesses back to 0.
    numGuesses = 9;

    // Solution is chosen randomly from wordList
    chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    // The word is broken into individual letters.
    lettersInChosenWord = chosenWord.split("");
    // We count the number of letters in the word.
    numBlanks = lettersInChosenWord.length;

    // Print the solution in console for testing.
    console.log(chosenWord);

    // CRITICAL - Here we *reset* the guess and success array at each round.
    blanksAndSuccesses = [];
    //  CRITICAL - Here we *reset* the wrong guesses from the previous round.
    wrongGuesses = [];

    // Fill up the blanksAndSuccesses list with appropriate number of blanks.
    // This is based on number of letters in solution.
    for  (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    // print the initial blanks in console.
    console.log(blanksAndSuccesses);

    //  Reprints the guessesLeft to 9
    document.getElementById("guesses-left").innerHTML = numGuesses;

    // Prints thee blankss at the beginning of each round in the HTML
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

    // Clears the wrong guesses from the previous round
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// checkLetters() function
// its where we will do all of the comparisons for matches.
// Again, its not being called here just being made for future use.
function checkLetters(letter) {

    // This boolean wil be toggled based on whether or not a user letter is found anywhere inthe word.
    var letterInWord = false;

    //check if a letter exxists inside the array at all.
    for (var i = 0; i < numBlanks;  i++) {
        if (chosenWord[i] === letter) {
            // If the letter exists then toggle this  boolean to be true. THis will be used in theneext step.
            letterInWord = true;
        }
    }

    // If the letter exiists somewhere in the word then figure out exactly where (which indices).
    if (letterInWord) {

        //Loop throughthe word.
        for (var j = 0; j < numBlanks; j++) {
            //Populate the blanksAndSucceses with every instance of the letter.
            if (chosenWord[j] === letter) {
                //Here we set the specific space in blanks and letter equal to the letter when there is a match.
                blanksAndSuccesses[j] === letter;
            }
        }
        // Logging  for testing.
        console.log(blanksAndSuccesses);
    }
    // If the letter doesn't exist at all...
    else {
        // ..then we add the letter to the listing of wrong letters, and we subsract one of the guesses.
        wrongGuesses.push(letter);
        numGuesses--;
    }
} 

// roundComplete() function
// Here we will have all the code that needs to be run after each guess is made
function roundComplete() {

    // First, log an initial status update in the console telling us how many wins, losses, and guesses are left.
    console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

    // Update the HTML to reflect the new number of guesses. Also update the correct guesses.
    document.getElementById("guesses-left").innerHTML = numGuesses;
    // This will print hte array of  of guesses and blanks onto the page.
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");
    // This will print the wrong guesses onto the page.
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

    // If we have gotten all letter to match the solution...
    if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
        //..add to the win counter and give user an alert.
        winCounter++;
        alert("You win!");

        // Update the win counter in the HTML and restart the game.
        document.getElementById("win-counter").innerHTML = winCounter;
        startGame();
    }

    // If we've run out of guesses...
    else if (numGuesses === 0) {
        // Add to loss counter.
        lossCounter++;
        // Give the user an alert.
        alert("You lose!");

        // Update the the losss counter in the HTML.
        document.getElementById("loss-counter").innerHTML = lossCounter;
        // Restart the game.
        startGame();
    }
}

// MAIN PROCESS (this is the code that controls what is actually  run)


// Starts the GAme by running the startGame() function
startGame();

// Then initiate the function for capturing key clicks.
document.onkeyup = function(event) {
    // Converts all key clicks to lowercase letters.
    var letterGuessed = String.fromCharCode(event.which).toLowerCase();
    // Runs the code to check for correctness.
    checkLetters(letterGuessed);
    // Runs the code after each round is done.
    roundComplete();
};