addEventListener('load', function() {
    console.log("hangman.js has been loaded.");
    setCanvasAndContext();
    getHighScores();
});

var difficulty = 1;
var resetButton = document.getElementById('reset');
var startPrompt = document.getElementById('startPrompt');
var topScores = document.getElementById('topScores');
var clock = document.getElementById('clock');
var score = document.getElementById('score');
score.innerHTML = "0";
var intervalID = 0;
var parts = document.getElementById('parts');
var initials = document.getElementById('initials');
var wordBox = document.getElementById('wordbox');
var message = document.getElementById("message");
var guessedLetterBox = document.getElementById("guessedLetterBox");
var time = 60000; // 1 min
var gameState = 0;
var numberOfLettersInWord = 0;
var numberOfTurnsTaken = 0;
var score = 0;
var failNumber = 0;
var maxFails = 13;
var secretWord = "";
var secretWordLetters = [];
var correctlyGuessedLetters = [];
var guessedLetters = [];
var highScores = [];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

resetButton.addEventListener('click', function() {
    location.reload();
});

var runTimer = function() {
    intervalID = setInterval(function() {
        clock.innerHTML = time / 1000;
        time -= 1000;
        if (time <= 0) {
            stopTimer();
            die();
        };
    }, 1000)
};

// get a word from the database
var getWord = function(d) {
    difficulty = d;

    var xhr = new XMLHttpRequest();

    xhr.open('POST', '../HangmanSpring/rest/getword/' + difficulty);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status < 400) {
            secretWord = JSON.parse(xhr.responseText).name;

            var blankCount = secretWord.length;

            for (var i = 0; i < blankCount; i++) {

                secretWordLetters.push(secretWord[i].toUpperCase());
                correctlyGuessedLetters.push(" _ ");
            };
            // print the word to the console so i can cheat at the game / for
            // debugging
            console.log(secretWord);
            placeLetter();

        }
    };

    xhr.send();

    return secretWord;
};

// get top scores from database
var getHighScores = function() {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '../HangmanSpring/rest/topscores');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status < 400) {
            highScores = JSON.parse(xhr.responseText);
            var ul = document.createElement('ul');
            ul.innerHTML = "TOP SCORES:";

            for (var i = 0; i < highScores.length; i++) {
                var li = document.createElement('li');
                li.innerHTML = highScores[i].initials + " " +
                    highScores[i].score;
                ul.appendChild(li);
            }

            topScores.appendChild(ul);
        }
    };

    xhr.send();
};

var setScore = function() {
    score = time;
}

// submit score to database
var submitScore = function() {

    var submitInitial = document.getElementById('initials').innerHTML;
    var submitScore = document.getElementById('score').innerHTML;
    var newScore = {
        initials: submitInitial,
        score: Number(submitScore)
    };
    document.getElementById('score').innerHTML = "0";
    var newScoreJSON = JSON.stringify(newScore);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../HangmanSpring/rest/submitscore');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status < 400) {}
    };

    xhr.send(newScoreJSON);

    gameState = 4;

};

// prevent all keys by default
addEventListener('keydown', function(e) {
    e.preventDefault();
});

// most of game logic will be run from here, because its all key event based
addEventListener(
    'keyup',
    function(e) {
        e.preventDefault();
        var characterPressed = "";
        if (e.keyCode < 91 && e.keyCode > 64) {
            characterPressed = String.fromCharCode(e.keyCode).toUpperCase();
        };

        if (gameState === 4 && e.keyCode === 13) {
            gameState = 0;
            setupGame(difficulty);
        }

        if (gameState === 4 && e.keyCode === 27) {
            message.innerHTML = "GOODBYE :( ";
            exitProgram();
        }

        if (gameState === 3 && e.keyCode === 13) {
            promptPlayAgain();
        }

        // submit nitial
        if (gameState === 2 && e.keyCode === 13) {
            submitScore();
            promptPlayAgain();

        }
        // enter initials
        if (gameState === 2 && (e.keyCode < 91 && e.keyCode > 64)) {
            if (initials.innerHTML.length < 3) // why does this have to be
            // 3!?!?
            {
                initials.innerHTML += characterPressed;
            }

        }
        // delete initials
        if (gameState === 2 && (e.keyCode == 8)) {

            if (initials.innerHTML.length < 3) // why does this have to be
            // 3!?!?
            {

                e.preventDefault();
                var divText = initials.innerHTML;
                divText = divText.slice(0, -1);
                initials.innerHTML = divText;
            }

        }

        // this needs to be above the start or it will automatically guess s
        if (gameState === 1 && (e.keyCode < 91 && e.keyCode > 64)) {
            // check if letter has already been guessed
            if (guessedLetters.indexOf(characterPressed) === -1) {
                guessedLetters.push(characterPressed);

                checkLetters(characterPressed);
            } else {
                message.innerHTML = "That letter was already guessed, try again stupid.";
            }

        }

        if (gameState === 0 && characterPressed === 'Q') {
            setupGame(1);
        }
        if (gameState === 0 && characterPressed === 'W') {
            setupGame(2);
        }
        if (gameState === 0 && characterPressed === 'E') {
            setupGame(3);
        }
        if (gameState === 0 && characterPressed === 'R') {
            setupGame(4);
        }
        if (gameState === 0 && characterPressed === 'T') {
            setupGame(5);
        }

    });

var setupGame = function(d) {
    guessedLetters = [];
    guessedLetterBox.innerHTML = "";
    initials.innerHTML = "";
    wordBox.innerHTML = "";
    message.innerHTML = "";
    correctlyGuessedLetters = [];
    secretWordLetters = []
    secretWord = "";
    time = 60000; // 1 min
    gameState = 0;
    numberOfTurnsTaken = 0;
    score = 0;
    setCanvasAndContext();
    resetHighScores();
    runTimer();
    getWord(d);
    startPrompt.innerHTML = "";
    gameState = 1;
    failNumber = 0;

}

//reset scores for the next turn
var resetHighScores = function() {
    topScores.innerHTML = ""
    getHighScores();
}

// display blank spaces based on number of letters in the word
//TODO remove this
var displayBlanks = function(d) {
    getWord(d);

};

// check if letters are in the word
var checkLetters = function(characterPressed) {
    guessedLetterBox.innerHTML += " " + characterPressed + " ";
    var correctWordCountForTurn = 0;
    for (var i = 0; i < secretWordLetters.length; i++) {
        if (secretWordLetters[i] === characterPressed) {
            correctlyGuessedLetters[i] = characterPressed;
            correctWordCountForTurn++;
        };
    };
    if (correctWordCountForTurn < 1) {
        failNumber++;
        drawOnCanvas(failNumber);

    };

    placeLetter();
    // if correctly guessed letters contain no spaces, " _ "
    if ((correctlyGuessedLetters.indexOf(" _ ") === -1) &&
        (failNumber < maxFails)) {
        // stop timer
        stopTimer();
        win();
    };
    //if fail numbe has exceeded maximum
    if (failNumber >= maxFails) {
        // stop timer
        stopTimer();
        die();
    };

};

//stop the timer
var stopTimer = function() {
    clearInterval(intervalID);

};

// win
var win = function() {
    message.innerHTML = "WOW YOU WIN!!!";
    message.innerHTML = "Enter your initials, and press Enter.";
    setScore();
    var scoreDiv = document.getElementById('score');
    scoreDiv.innerHTML = score;
    gameState = 2;
};
// lose
var die = function() {
    message.innerHTML = "YOU HAVE FAILED.  THE WORD WAS '" +
        secretWord.toUpperCase() + "'.<br>Press ENTER to continue.";
    gameState = 3;
};

// replace a blank with a letter
var placeLetter = function() {
    wordBox.innerHTML = "";
    for (var i = 0; i < correctlyGuessedLetters.length; i++) {
        wordBox.innerHTML += " " + correctlyGuessedLetters[i] + " ";
    }
};

// place a part on the hangman guy

// TODO: delete this?
//var placePart = function() {
//
//    parts.innerHTML = "NUMBER OF FAILS: " + failNumber;
//};

// play again
var promptPlayAgain = function() {
    gameState = 4;

    message.innerHTML = "Want to play again? ENTER for yes, ESC for no.";

};

/*
 * Canvas methods
 */

var setCanvasAndContext = function() {
    ctx.clearRect(0, 0, 400, 400);
    drawSun();
    drawTree(20, 175);
    drawTree(40, 250);
    drawTree(-10, 320);
    drawTree(70, 300);
    drawTree(240, 175);
    drawTree(250, 300);
    drawTree(120, 350);
    drawTree(160, 325);
    drawTree(315, 300);
    drawNoose();
};

var drawSun = function() {
    ctx.beginPath();
    var x = 50;
    var y = 50;
    ctx.arc(x, y, 40, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'black';
    ctx.fill();
    ctx.fillStyle = 'black';
};

var drawTree = function(x, y) {
    ctx.beginPath();
    var x = x;
    ctx.moveTo(x, 375);
    ctx.lineTo(x + (y / 6), (375 - y));
    ctx.lineTo(x + y / 3, 375);

    ctx.fillStyle = "rgb(150,225,150)";
    ctx.strokeStyle = "rgb(0,50,0)";
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
}

var drawNoose = function() {
    ctx.beginPath()
    ctx.moveTo(200, 75);
    ctx.lineTo(200, 25);
    ctx.lineTo(350, 25);
    ctx.lineTo(350, 375);
    ctx.stroke();
    ctx.moveTo(0, 375);
    ctx.lineTo(400, 375);
    ctx.stroke();
}

// 1
var drawHead = function() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.arc(200, 115, 40, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.fill();
};

var drawBody = function() {
    ctx.beginPath();
    ctx.moveTo(200, 155);
    ctx.lineTo(200, 260);
    ctx.stroke();
};

var drawLeftArm = function() {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(130, 160);
    ctx.stroke();
};

var drawRightArm = function() {
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(270, 160);
    ctx.stroke();
};
var drawLeftLeg = function() {
    ctx.beginPath();
    ctx.moveTo(200, 260);
    ctx.lineTo(150, 330);
    ctx.stroke();
};
var drawRightLeg = function() {
    ctx.beginPath();
    ctx.moveTo(200, 260);
    ctx.lineTo(250, 330);
    ctx.stroke();
};
var drawRightHand = function() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    var x = (270 + 7.07106781187);
    var y = (160 - 7.07106781187);
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
var drawLeftHand = function() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    var x = (130 - 7.07106781187);
    var y = (160 - 7.07106781187);
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
var drawRightFoot = function() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    var x = (250 + 7.07106781187);
    var y = (330 + 7.07106781187);
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
var drawLeftFoot = function() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    var x = (150 - 7.07106781187);
    var y = (330 + 7.07106781187);
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
};
var drawLeftEye = function() {
    ctx.beginPath();
    var x = (190);
    var y = (105);
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.stroke();
};
var drawRightEye = function() {
    ctx.beginPath();
    var x = (210);
    var y = (105);
    ctx.arc(x, y, 8, 0, 2 * Math.PI);
    ctx.stroke();
};
var drawMouth = function() {
    ctx.beginPath();
    var x = (200);
    var y = (130);
    ctx.arc(x, y, 8, 0, Math.PI, true);
    ctx.stroke();
};

var exitProgram = function() {
    ctx.clearRect(0, 0, 400, 400);

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.arc(75, 75, 30, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(325, 75, 30, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();

    ctx.arc(200, 300, 150, 0, Math.PI, true);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "40px Arial";
    ctx.fillText("GOODBYE", 90, 350);

};

// draw switch
var drawOnCanvas = function(failNumber) {
    switch (failNumber) {
        case 1:
            drawHead();
            break;
        case 2:
            drawBody();
            break;
        case 3:
            drawLeftArm();
            break;
        case 4:
            drawRightArm();
            break;
        case 5:
            drawLeftLeg();
            break;
        case 6:
            drawRightLeg();
            break;
        case 7:
            drawLeftHand();
            break;
        case 8:
            drawRightHand();
            break;
        case 9:
            drawLeftFoot();
            break;
        case 10:
            drawRightFoot();
            break;
        case 11:
            drawLeftEye();
            break;
        case 12:
            drawRightEye();
            break;
        case 13:
            drawMouth();
            break;

        default:

    }
}

/*
 * End canvas methods
 */