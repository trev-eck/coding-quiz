console.log("Linked");

//lets have our queryselectors live here
var headerTimer = document.querySelector("#timerss");
var theQuestion = document.querySelector("#theQuestion");
var ulAnswers = document.querySelector("#theAnswer");
var wrongRight = document.querySelector("#wrongRight");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var gameWindow = document.querySelector("#gameWindow");
var button1 = document.querySelector("#button1");
var button2 = document.querySelector("#button2");
var userInitials = document.querySelector("#user-initials");
var submitScore = document.querySelector("#submit-score");
var userScore = document.querySelector("#user-score");
var highScores = document.querySelector("#highScores");

// the other variables we are going to need to play our game
var timer;
var timeLeft = 30;
var currentQuestion = 0;
var gameOver = false;
console.log(gameWindow);


//we dont need to see these forms or buttons when the page loads
button2.style.display = "none";
submitScore.style.display = "none";


//he is our array of question objects that also contain the answers and correct answer
var questionsArray = [
  {
    question: "The world is a vampire...",
    answer1: " The Smashing Oranges",
    answer2: "The Siamese Dream",
    answer3: "Smashing Walls",
    answer4: "The Smashing Pumpkins",
    correctAnswer: "The Smashing Pumpkins",
  },
  {
    question: "Black hole sun, won't you come...",
    answer1: " Soundplanet",
    answer2: "Soundpalace",
    answer3: "Soundgarden",
    answer4: "Soundworld",
    correctAnswer: "Soundgarden",
  },
  {
    question: "Load up on guns, bring your friends...",
    answer1: " Hurt Mobaine",
    answer2: "Nirvana",
    answer3: "The Foo Fighters",
    answer4: "Enlightenment",
    correctAnswer: "Nirvana",
  },
  {
    question: "When I look into your eyes, I can see a love restrained...",
    answer1: " Pearl Jam",
    answer2: "Led Zeppelin",
    answer3: "Guns N' Roses",
    answer4: "Alice in Chains",
    correctAnswer: "Guns N' Roses",
  },
  {
    question: "Say your prayers, little one Don't forget, my son...",
    answer1: "Metallica",
    answer2: "Megadeth",
    answer3: "Limp Bizkit",
    answer4: "Red Hot Chili Peppers",
    correctAnswer: "Metallica",
  },
];

//alright ladies and gentleman lets figure out what all we need to do to get this shit working.....

//what functions do we need....

//we need a function to display a question object and its possible answers on to the screen

function displayQuestion() {
  theQuestion.textContent = "";

  //lets check to make sure we still have some questions left and their is time on the clock
  if (currentQuestion < 5 && gameOver == false) {
//lets populate the screen with the current question and possible answers
    theQuestion.textContent = questionsArray[currentQuestion].question;
    answer1.textContent = questionsArray[currentQuestion].answer1;
    answer2.textContent = questionsArray[currentQuestion].answer2;
    answer3.textContent = questionsArray[currentQuestion].answer3;
    answer4.textContent = questionsArray[currentQuestion].answer4;
  } // looks like we've ran out of questions or time, and the game is over
  else {
    endGame();
  }
}

//we need a timer function that counts down every second and decreases by a greater increment if the incorrect answer is selected
function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  headerTimer.textContent = timeLeft + " seconds remaining";
  timer = setInterval(function () {
    timeLeft--;
    headerTimer.textContent = timeLeft + " seconds remaining";

    //if we run out of time or questions then what?
    if (timeLeft < 1 || currentQuestion > 4) {
      clearInterval(timer);
      gameOver = true;
    }
  }, 1000);
}

//lets create a function that can hide the list when we don't need it
function hideList() {
    answer1.style.display = "none";
    answer2.style.display = "none";
    answer3.style.display = "none";
    answer4.style.display = "none";
}
// and show the list when we do need it
function showList() {
    answer1.style.display = "list-item";
    answer2.style.display = "list-item";
    answer3.style.display = "list-item";
    answer4.style.display = "list-item";
}

//run this when the game is over, hide stuff were done with and show things we need for score submission
function endGame() {
    theQuestion.textContent = "All Done!";
    hideList();
    submitScore.style.display = "block";
    userScore.textContent = "Your final score: " + timeLeft;
}

// we need a start game function that we can call to run everything!
function startGame() {
    currentQuestion = 0;
    gameOver = false;
    button1.style.display="none";
    userScore.textContent = "";
    startTimer();
    showList();
    displayQuestion();
}


//we dont want to see the empy list when the page loads
hideList();



//the answers need to be clickable/buttons and inform the user if right or wrong
gameWindow.addEventListener("click", function (event) {
  var element = event.target;
  //user clicked on a button, we will only have a few different button elements within our program
  if(element.matches("button") === true) {
    //the user is ready to start the game
    if(element.textContent == "Start Quiz") {
        startGame();
    }
 // we have two other buttons, Go Back returns us to the title screen...
  if(element.textContent == "Go Back") {
    // we need to reset to the default display
      theQuestion.textContent = "Can you guess the 90's Band from the opening song lyrics?";
      button1.textContent = "Start Quiz";
      button2.style.display = "none";
      userScore.textContent = "";
  }
  // we need to clear local storage of scores
  if(element.textContent == "Clear Highscores") {
    localStorage.clear();
    userScore.textContent = "";
  }
  }
  //user clicked on a list item, we'll use this while the game is running
  if (element.matches("li") === true) {
    //the user clicked on the correct answer
    if (element.textContent == questionsArray[currentQuestion].correctAnswer) {
      wrongRight.textContent = "Correct!";
    } //user selected the wrong answer, we need to subtract time from the clock
    else {
      wrongRight.textContent = "Wrong!";
      timeLeft -= 5;
    }
    //lets move on to the next question
    currentQuestion++;
    displayQuestion();
  }
});

//we need to add the users score to the local memory and high score list
submitScore.addEventListener("submit", function(event) {
    event.preventDefault();
    //get the users intials from the form and make sure it isnt blank
    var userInput = userInitials.value.trim();
    console.log(userInput);
    if(userInput == "") {
        return;
    }
    //save the users initials and score to local storage
    localStorage.setItem("scores", JSON.stringify([userInput.toString(), timeLeft]));

    // looks like we dont need to see the form anymore and should create some options to move forward...
    submitScore.style.display = "none";
    wrongRight.textContent = "";
    button1.textContent = "Go Back";
    button1.style.display = "inline-block";
    button2.style.display = "inline-block";

    //lets display the list of scores from local storage
    userScore.textContent = JSON.parse(localStorage.getItem("scores"));
});

highScores.addEventListener("click", function(event) {
console.log("clicked on score");
userScore.textContent = JSON.parse(localStorage.getItem("scores"));
});