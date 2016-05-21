addEventListener('load',function(){
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
//variables
var initials = document.getElementById('initials');
var wordBox = document.getElementById('wordbox');
var message = document.getElementById("message");
var guessedLetterBox = document.getElementById("guessedLetterBox");
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


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

resetButton.addEventListener('click',function(){
	location.reload();
});

var runTimer = function(){
  //if timer > 60s, die
  intervalID = setInterval(
    function(){

      clock.innerHTML = time/1000;
      time -= 1000;
      if(time <= 0){
    	  stopTimer();
        die();
      };
    },1000
  )};

//get a word from the database
var getWord = function(d){
  //make restful call to database
  difficulty = d;
	
  var xhr = new XMLHttpRequest();

  xhr.open('POST','../HangmanSpring/rest/getword/' + difficulty);
  xhr.setRequestHeader('Content-type','application/json');
  xhr.onreadystatechange = function(){
  	if(xhr.readyState === 4 && xhr.status < 400){
  		//response test stuff
  		console.log(xhr.responseText);
  		console.log(JSON.parse(xhr.responseText));
  		secretWord = JSON.parse(xhr.responseText).name;
  		
  	
  	  var blankCount = secretWord.length;

  	  console.log("BLANKS TO WRITE: " + blankCount);
  	  for(var i = 0; i < blankCount; i++){

  	    secretWordLetters.push(secretWord[i].toUpperCase());
  	    correctlyGuessedLetters.push(" _ ");
  	  };
  	  //TODO test console printout
  	  for(var i = 0; i < secretWordLetters.length; i++){
  	    console.log(secretWordLetters[i]);
  	  };
  	  //print BLANKS (all that is in correctlyGuessedLetters is blanks rn)
  	  placeLetter();
  		
  		
  	}
  };
  
  //TODO comment this out to make it work
  xhr.send();
//   secretWord = "test";	
  console.log("RETURNING SECRET WORD: " + secretWord);
  return secretWord;
};

//get top scores from database
var getHighScores = function(){
  //call to database to return high scores
  //5? 10?
	var xhr = new XMLHttpRequest();

	xhr.open('GET','../HangmanSpring/rest/topscores');
	xhr.setRequestHeader('Content-type','application/json');
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status < 400){
			//response test stuff
			console.log(xhr.responseText);
			console.log(JSON.parse(xhr.responseText));
			highScores = JSON.parse(xhr.responseText);
			var ul = document.createElement('ul');
			ul.innerHTML = "TOP SCORES:";
			
			for(var i = 0; i < highScores.length; i++){
				var li = document.createElement('li');
				li.innerHTML = highScores[i].initials + " " + highScores[i].score;
				ul.appendChild(li);
			}
			
			topScores.appendChild(ul);
		}
	};
	

	xhr.send();
	
	
	
};


var setScore = function(){
    score = time;
}
//submit score to database
var submitScore = function(){
//  console.log(time*secretWord.length);
//  console.log(document.getElementById('initials').innerHTML);
//  console.log("SUBMITTED SCORE " + score);
  
  var submitInitial = document.getElementById('initials').innerHTML;
  console.log('submit initial: ' + submitInitial);
  var submitScore = document.getElementById('score').innerHTML;
  console.log('submit score: ' + submitScore);
  var newScore = {
		  initials:submitInitial,
		  score:Number(submitScore)
  		};
  document.getElementById('score').innerHTML = "0";
  console.log(newScore);
  var newScoreJSON = JSON.stringify(newScore);
  console.log(newScoreJSON);

  var xhr = new XMLHttpRequest();

  xhr.open('POST','../HangmanSpring/rest/submitscore');
  xhr.setRequestHeader('Content-type','application/json');
  xhr.onreadystatechange = function(){
  	if(xhr.readyState === 4 && xhr.status < 400){
  		//response test stuff
  		console.log('score submission done');
  /* 		console.log(xhr2.responseText);
  		console.log(JSON.parse(xhr2.responseText)); */
  	}
  };

  xhr.send(newScoreJSON);

 
  gameState = 4;

};

//key listener
//most of game logic will be run from here, because its all key event based (obviously)
addEventListener('keydown',function(e){
	e.preventDefault();
});

addEventListener('keyup',function(e){
  e.preventDefault();
  var characterPressed = "";
    if(e.keyCode < 91 && e.keyCode > 64){
      characterPressed =  String.fromCharCode(e.keyCode).toUpperCase();
    };
    console.log(characterPressed);

    if(gameState === 4 && e.keyCode === 13){
      gameState = 0;
      setupGame(difficulty);
    }

    if(gameState === 4 && e.keyCode === 27){
      message.innerHTML = "FINE";
      exitProgram();
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

      if(initials.innerHTML.length < 3) //why does this have to be 3!?!?
      {
      initials.innerHTML += characterPressed;
      }

    }

    
    
    //delete initials
    if(gameState === 2 && (e.keyCode == 8)){
    	
    	if(initials.innerHTML.length < 3) //why does this have to be 3!?!?
    	{
    		
    	    e.preventDefault();
    	    var divText = initials.innerHTML;
    	    divText = divText.slice(0,-1);
    	    initials.innerHTML = divText;
    	}
    	
    }
    
    
    
    //this needs to be above the start or it will automatically guess s
    if(gameState === 1 && (e.keyCode < 91 && e.keyCode > 64)){
      console.log("playing!");
      //check if letter has already been guessed
      if(guessedLetters.indexOf(characterPressed) === -1){
        guessedLetters.push(characterPressed);

        checkLetters(characterPressed);
      }else{
        message.innerHTML = "That letter was already guessed, try again stupid.";
      }

    }

  if(gameState === 0 && characterPressed === 'Q'){
    console.log("GAMESTATE:" + gameState);
    console.log("START PRESSED");
    setupGame(1);
  }
  if(gameState === 0 && characterPressed === 'W'){
	    console.log("GAMESTATE:" + gameState);
	    console.log("START PRESSED");
	    setupGame(2);
	  }
  if(gameState === 0 && characterPressed === 'E'){
	    console.log("GAMESTATE:" + gameState);
	    console.log("START PRESSED");
	    setupGame(3);
	  }
  if(gameState === 0 && characterPressed === 'R'){
	    console.log("GAMESTATE:" + gameState);
	    console.log("START PRESSED");
	    setupGame(4);
	  }
  if(gameState === 0 && characterPressed === 'T'){
	    console.log("GAMESTATE:" + gameState);
	    console.log("START PRESSED");
	    setupGame(5);
	  }




  //esc, are you sure you want to quit

});

var setupGame = function(d){
//  parts.innerHTML = "NUMBER OF FAILS: 0";
  guessedLetters = [];
  guessedLetterBox.innerHTML = "";
  initials.innerHTML = "";
  wordBox.innerHTML = "";
  message.innerHTML = "";
  console.log("failnumber IST " + failNumber);
    correctlyGuessedLetters = [];
    secretWordLetters = []
    secretWord = "";
  time = 60000; //1 min
  gameState = 0;
  //0 - waiting to play, 1 - in game, 2 - win, 3 - lose
  numberOfTurnsTaken = 0;
  score = 0;
  console.log("failnumber IST " + failNumber);
  setCanvasAndContext();
  //score is time left when won
   //i messed up somewhere so its gettign set to one when ethe player restarts
  resetHighScores();
  runTimer();
  displayBlanks(d);
  //switch gameState to in game;
  startPrompt.innerHTML = "";
  gameState = 1;
  failNumber = 0;
  console.log("gstate ist " + gameState);
  console.log("failnumber IST " + failNumber);

}

var resetHighScores = function(){
	topScores.innerHTML = ""
	getHighScores();
}

//display blank spaces based on number of letters in the word
var displayBlanks = function(d){
	//TODO refactor
	getWord(d);

};

//check if letters are in the word
var checkLetters = function(characterPressed){
  //put the guessed letter on the screeen
  guessedLetterBox.innerHTML += " " + characterPressed + " ";
  //send index to place letter thing foreach time the letter is in the thing
  console.log("checking letters now......");
  console.log("NUMBER OF MISSES = " + failNumber);
  var correctWordCountForTurn = 0;
  for(var i = 0; i<secretWordLetters.length; i++){
    if(secretWordLetters[i] === characterPressed){
      //place letter fuction
      correctlyGuessedLetters[i] = characterPressed;
      correctWordCountForTurn++;
    };
  };
  if(correctWordCountForTurn < 1){
    failNumber++; //TODO on restart, its incrementing here
    drawOnCanvas(failNumber);
    console.log("FAIL NUMBER IS NOW: " + failNumber);
//    placePart();
    //test
    for(var i = 0; i < correctlyGuessedLetters.length; i++){
      console.log(correctlyGuessedLetters[i]);
    };

  };
 
  placeLetter();
  //if correctly guessed letters contain no " _ "
  console.log('about to check stuff');
  if((correctlyGuessedLetters.indexOf(" _ ") === -1) && (failNumber < maxFails)){
    //stop timer
    stopTimer();
    win();
  };
  if(failNumber >= maxFails){
    //stop timer
    stopTimer();
    die();
  };

};
var stopTimer = function(){
    clearInterval(intervalID);

};

//win
var win = function(){
  message.innerHTML = "WOW YOU WIN!!!";
  console.log("win function, omg you won ur so smart");
  message.innerHTML = "Enter your initials, and press Enter.";
  setScore();
  console.log("SCORE:::: " + score);
//  var scoreout = "score: " + score;
  var scoreDiv = document.getElementById('score');
  scoreDiv.innerHTML = score;
  gameState = 2;
};
//lose
var die = function(){
  message.innerHTML = "YOU HAVE FAILED.  THE WORD WAS '" + secretWord.toUpperCase() +"'.<br>Press ENTER to continue.";
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


//TODO: delete this?
var placePart = function(){

  parts.innerHTML = "NUMBER OF FAILS: " + failNumber;
};


//play again
var promptPlayAgain = function(){
  gameState = 4;

  message.innerHTML = "Want to play again? ENTER for yes, ESC for no.";

};



/*
 * Canvas methods
 */

var setCanvasAndContext = function(){
  ctx.clearRect(0,0,400,400);
  drawSun();
  drawTree(20,175);
  drawTree(40,250);
  drawTree(-10,320);
  drawTree(70,300);
  drawTree(240,175);
  drawTree(250,300);
  drawTree(120,350);
  drawTree(160,325);
  drawTree(315,300);
  drawNoose();
};

var drawSun = function(){
  ctx.beginPath();
  var x = 50;
  var y = 50;
  ctx.arc(x,y,40,0,2*Math.PI);
  ctx.fillStyle = 'yellow';
  ctx.strokeStyle = 'black';
  ctx.fill();
  // ctx.stroke();
  //make sure it goes back to black
  ctx.fillStyle = 'black';
};

var drawTree = function(x,y){
  console.log("drawing tree")
  ctx.beginPath();
  var x = x;
  ctx.moveTo(x,375);
  ctx.lineTo(x+(y/6),(375-y));
  ctx.lineTo(x+y/3,375);


  ctx.fillStyle = "rgb(150,225,150)";
  ctx.strokeStyle = "rgb(0,50,0)";
  // ctx.fill()
  // ctx.stroke();
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
}

var drawNoose = function(){
  ctx.beginPath()
  ctx.moveTo(200,75);
  ctx.lineTo(200,25);
  ctx.lineTo(350,25);
  ctx.lineTo(350,375);
  ctx.stroke();
  ctx.moveTo(0,375);
  ctx.lineTo(400,375);
  ctx.stroke();
}

//1
var drawHead = function(){
  console.log('drawing head');
ctx.beginPath();
ctx.fillStyle = 'white';
ctx.strokeStyle = 'black';
// ctx.fillStyle = 'black';
ctx.arc(200,115,40,0,2*Math.PI)
ctx.stroke();
ctx.fill();
};
// ctx.fillStyle = 'black';

// ctx.fill();
//2
var drawBody = function(){
  ctx.beginPath();
  ctx.moveTo(200,155);
  ctx.lineTo(200,260);
  ctx.stroke();
};
//3
var drawLeftArm = function(){
  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo(130,160);
  ctx.stroke();
};
//4
var drawRightArm = function(){
  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo(270,160);
  ctx.stroke();
};
//5
var drawLeftLeg = function(){
  console.log('left leg');
  ctx.beginPath();
  ctx.moveTo(200,260);
  ctx.lineTo(150,330);
  ctx.stroke();
};
//6
var drawRightLeg = function(){
  console.log('left leg');
  ctx.beginPath();
  ctx.moveTo(200,260);
  ctx.lineTo(250,330);
  ctx.stroke();
};
//7
var drawRightHand = function(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  var x = (270 + 7.07106781187);
  var y = (160 - 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
};
//8
var drawLeftHand = function(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  var x = (130 - 7.07106781187);
  var y = (160 - 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
};
//9
var drawRightFoot = function(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  var x = (250 + 7.07106781187);
  var y = (330 + 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
};
//10
var drawLeftFoot = function(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  var x = (150 - 7.07106781187);
  var y = (330 + 7.07106781187);
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.stroke();
  ctx.fill();
};
//11
var drawLeftEye = function(){
  ctx.beginPath();
  var x = (190);
  var y = (105);
  ctx.arc(x,y,8,0,2*Math.PI);
  ctx.stroke();
};
//12
var drawRightEye = function(){
  ctx.beginPath();
  var x = (210);
  var y = (105);
  ctx.arc(x,y,8,0,2*Math.PI);
  ctx.stroke();
};
//13
var drawMouth = function(){
  ctx.beginPath();
  var x = (200);
  var y = (130);
  ctx.arc(x,y,8,0,Math.PI,true);
  ctx.stroke();
};

var exitProgram = function(){
  ctx.clearRect(0,0,400,400);

  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(75,75,30,0,2*Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(325,75,30,0,2*Math.PI);
  ctx.stroke();

    ctx.beginPath();

    ctx.arc(200,300,150,0,Math.PI,true);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "40px Arial";
    ctx.fillText("GOODBYE",90,350);

};

var drawAllTestDeleteThis = function(){
  setCanvasAndContext();


  drawHead();
  drawBody();
  drawLeftArm();
  drawRightArm();
  drawLeftLeg();
  drawRightLeg();
  drawRightHand();
  drawLeftHand();
  drawRightFoot();
  drawLeftFoot();
  drawLeftEye();
  drawRightEye();
  drawMouth();




};

//draw switch
var drawOnCanvas = function(failNumber){
  switch (failNumber) {
    case 1:drawHead();break;
    case 2:drawBody();break;
    case 3:drawLeftArm();break;
    case 4:drawRightArm();break;
    case 5:drawLeftLeg();break;
    case 6:drawRightLeg();break;
    case 7:drawLeftHand();break;
    case 8:drawRightHand();break;
    case 9:drawLeftFoot();break;
    case 10:drawRightFoot();break;
    case 11:drawLeftEye();break;
    case 12:drawRightEye();break;
    case 13:drawMouth();break;

    default:

  }
}

/*
 * End canvas methods
 */
