$(document).ready(function(){

    // Global variables
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();

    var wordList = ["drake", "future", "theweeknd", "nickiminaj", "wizkid", "tiwasavage", "davido", "lilwayne", "frenchmontana", "selena", "rihanna"];
    var word = [];
    var allGuesses;
    var rightGuesses;
    var wrongGuesses = '';
    var presentGuess;
    var positionInWord;
    var guessLeft;
    var wins = 0;
    var losses = 0;
    var artistImage;
    var artistSong;
    var stopArtistSong;

    // Start the Hangman game
    // Game is not being called here, just being saved for future use
    startGame();
    // Keypress callback function
    document.onkeyup = function(event) {
        // This rerurns pressed key
        presentGuess = event.key.toUpperCase();
        // Checks if it is an alphabet and if it is already guessed and return position in allGuesses, and to make sure not to repeat both right or wrong guesses
        if ((alphabet.search(presentGuess) !== -1) && (allGuesses.search(presentGuess) === -1)) {
            allGuesses += presentGuess;
            // Check if guess is right or wrong
            letterChecker();
            displayGame();
            if (rightGuesses === wordString) {
                wins++;
                document.querySelector("#rapper").innerHTML = "<p>Guessed Right</p>" + rightGuesses;
                artistImage = "assets/images/" + rightGuesses + ".jpg";
                artistSong = "assets/images/" + rightGuesses + ".mp3";
                imageDisplay(artistImage, rightGuesses);
                if (stopArtistSong !== undefined) {
                    // Check if song is playing
                    stopArtistSong.pause();
                }
                stopArtistSong = playSong(artistSong);
                setTimeout(function() {
                    startGame();
                },500);
            }
            if (guessLeft < 1) {
                losses++;
                imageDisplay("assets/images/likedmage.jpg", "hanged");
                document.querySelector("#rapper").innerHTML = "<p>Wrong</p>" + "<p>Hanged!!!</p>" + "<p>Rapper is: </p>" + wordString;
                playSong("assets/images/fail-buzzer-01.wav");
                setTimeout(function() {
                    startGame();
                },500);
            }
        }
    }
    
    // Restarts after every round
    // Where we call our code to function
    function startGame() {
        wrongGuesses  = ' ';
        allGuesses = "";
        currentDisplay = [];
        // Randomly selects a word from the array list
        wordString = (wordList[Math.floor(Math.random() * wordList.length)]).toUpperCase();
        // Put the randomly selcted word into an array
        word = wordString.split('');
        guessLeft = wordString.length;
        for (var i = 0; i < guessLeft; i++){
            currentDisplay[i] = "_";
            // Displays the game
        }
        displayGame();
    };

    function letterChecker() {
        // Checks if guess is right or wrong
        positionInWord = wordString.search(presentGuess);
        // Checks if guess is in word andd and return position in word
        if (positionInWord === -1) {
            // if letter not in word
            keySound("assets/images/no.mp3");
            guessLeft--;
            // Adds to wrongGuesses.
            wrongGuesses += presentGuess + ",";
        }
        else {
            // if letter is in word
            keySound("assets/imagess/switch-1.mp3")
            for (var i=0; i<word.length; i++){
                if (word[i] === presentGuess){
                    currentDisplay[i] = presentGuess;
                }
            }
            rightGuesses = currentDisplay.join("");
        }
    };

    function playSong(s) {
        // Key sounds functions
        x = document.createElement("audio");
        x.setAttribute("src", s);
        x.play();
        return x;
    };

    function keySound(s) {
        // Key sounds function
        x = document.createElement("audio");
        x.setAttribute("src", s);
        x.play();
    };

    function imageDisplay(pic, name) {
        var x = document.getElementById("image");
        x.setAttribute("src", pic);
        x.setAttribute("alt", name);
    };

    function displayGame() {
        // declaring a variable to hold our new HTML. Our HTML keeps track of user input
        var scoreBoard =
        "<p>PRESS ANY KEY TO GET STARTED!</p>" +
        "<p>WINS</p>" +
        "<p> " + wins + "</p>" +
        "<p>LOSSES</p>" +
        "<p> " + losses + "</p>" +
        "<p>CURRENT WORD</p>" +
        "<p> " + currentDisplay.join(" ") + "</p>" +
        "<p>NUMBER OF GUESSES REMAINING</p>" +
        "<p> " + guessLeft + "</p>" +
        "<p>LETTERS ALREADY GUESSED</p>" +
        "<p> " + wrongGuesses + "</p>";

        // set the inner HTML contents of the #game div to our html string
        document.querySelector("#game").innerHTML = scoreBoard;
    };
});