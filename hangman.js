addEventListener('load',function(){
  console.log("hangman.js has been loaded.");
});

//variables
var wordBox = document.getElementById('wordbox');
  var message = document.getElementById("message");
var time = 60000; //1 min
var gameState = 0;
//0 - waiting to play, 1 - in game, 2 - win, 3 - lose 4 - prompt
var numberOfLettersInWord = 0;
var numberOfTurnsTaken = 0;
var score = 0;
//score is time left when won
var failNumber = 0;
var maxFails = 13;
//foreach fail number, a different part will be associated
//1 - head //2 - body //3 - l arm //4 - r arm //5 - l leg //6 - r leg
//7  - l hand  //8  - rhand //9  -l foot //10  - r foot // //11 - r eye //12 - l eye //13 - mouth P
var secretWord = "";
var secretWordLetters = [];
var correctlyGuessedLetters = [];
var guessedLetters = [];
var highScores = [];


//timer
var runTimer = function(){
  //if timer > 60s, die

};

//get a word from the database
var getWord = function(){
  //make restful call to database
  secretWord = "test";
  return secretWord;
};

//get top scores from database
var getHighScores = function(){
  //call to database to return high scores
  //5? 10?
};

//submit score to database
var submitScore = function(){
  console.log(time*secretWord.length);
  console.log(document.getElementById('initials').innerHTML);
  gameState = 4;

};

//key listener
//most of game logic will be run from here, because its all key event based (obviously)
addEventListener('keyup',function(e){
  e.preventDefault();
  var characterPressed = "";
    if(e.keyCode < 91 && e.keyCode > 64){
      characterPressed =  String.fromCharCode(e.keyCode).toUpperCase();
    };
    console.log(characterPressed);

    if(gameState === 4 && characterPressed === "Y"){
      setupGame();
    }

    if(gameState === 4 && characterPressed === "N"){
      message.innerHTML = "FINE";
    }

    if(gameState === 3 && e.keyCode === 13){
      promptPlayAgain();
    }

    //submit nitial
    if(gameState === 2 && e.keyCode === 13){
      submitScore();
      promptPlayAgain();

    }
    //enter initials
    if(gameState === 2 && (e.keyCode < 91 && e.keyCode > 64)){
      var initials = document.getElementById('initials');
      if(initials.innerHTML.length < 3) //why does this have to be 3!?!?
      {
      initials.innerHTML += characterPressed;
      }


    }

    //this needs to be above the start or it will automatically guess s
    if(gameState === 1 && (e.keyCode < 91 && e.keyCode > 64)){
      console.log("playing!");
      //check if letter has already been guessed
      guessedLetters.push(characterPressed);

      checkLetters(characterPressed);
    }

  if(gameState === 0 && characterPressed === 'S'){
    console.log("GAMESTATE:" + gameState);
    console.log("START PRESSED");
    setupGame();
  }



  //esc, are you sure you want to quit

});

var setupGame = function(){
  initials.innerHTML = "";
  wordBox.innerHTML = "";
  message.innerHTML = "";
  time = 60000; //1 min
  gameState = 0;
  //0 - waiting to play, 1 - in game, 2 - win, 3 - lose
  numberOfTurnsTaken = 0;
  score = 0;
  //score is time left when won
  failNumber = 0;



  displayBlanks();
  //switch gameState to in game;
  gameState = 1;
  console.log("GAMESTATE CHANGED TO " + gameState);

}

//display blank spaces based on number of letters in the word
var displayBlanks = function(){
  var blankCount = getWord().length;
  console.log("BLANKS TO WRITE: " + blankCount);
  for(var i = 0; i < blankCount; i++){

    secretWordLetters.push(getWord()[i].toUpperCase());
    correctlyGuessedLetters.push(" _ ");
  };
  //TODO test console printout
  for(var i = 0; i < secretWordLetters.length; i++){
    console.log(secretWordLetters[i]);
  }
  //print BLANKS (all that is in correctlyGuessedLetters is blanks rn)
  placeLetter();

};

//check if letters are in the word
var checkLetters = function(characterPressed){
  //send index to place letter thing foreach time the letter is in the thing
  console.log("checking letters now......");
  console.log("NUMBER OF MISSES = " + failNumber);
  var correctWordCountForTurn = 0;
  for(var i = 0; i<secretWordLetters.length; i++){
    if(secretWordLetters[i] === characterPressed){
      //place letter fuction
      correctlyGuessedLetters[i] = characterPressed;
      correctWordCountForTurn++;
    }
  };
  if(correctWordCountForTurn < 1){
    failNumber++;
    console.log("FAIL NUMBER IS NOW: " + failNumber);
    placePart();
    //test
    for(var i = 0; i < correctlyGuessedLetters.length; i++){
      console.log(correctlyGuessedLetters[i]);
    };

  }
  placeLetter();
  //if correctly guessed letters contain no " _ "
  if((correctlyGuessedLetters.indexOf(" _ ") === -1) && (failNumber < maxFails)){
    win();
  }else if(failNumber >= maxFails){
    die();
  }

};
//win
var win = function(){
  message.innerHTML = "WOW YOU WIN";
  console.log("win function, omg you won ur so smart");
  message.innerHTML = " enter your initialz ";
  gameState = 2;
};
//lose
var die = function(){
  message.innerHTML = "WOW YOU SUCK press enter to continue";
  gameState = 3;
};
//replace a blank with a letter
var placeLetter = function(index,char){
  wordBox.innerHTML = "";
  for(var i = 0; i < correctlyGuessedLetters.length; i++){

    wordBox.innerHTML += " "+correctlyGuessedLetters[i]+" ";
  }
};
//place a part on the hangman guy
var placePart = function(){
  var parts = document.getElementById('parts');
  parts.innerHTML = failNumber;
};
//play again
var promptPlayAgain = function(){
  gameState = 4;
  message.innerHTML += "Wanna play again? (y/n)";

};
