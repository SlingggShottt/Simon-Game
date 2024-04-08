var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false; // toggle to know the game has started

// Check for existing high score
var highScore = localStorage.getItem("highScore") || 0;
$("#high-score").text("High Score: " + highScore);

// uncomment when need to clear high score from localStorage
//localStorage.removeItem("highScore");

// Update high score if new level is a high score
function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        $("#high-score").text("High Score: " + highScore);
    }
}

if (window.innerWidth < 600) {
    // starting new sequence by click for touch screens

    // changing the title to click
    $("#level-title").text("Click ANYWHERE to Start");

    $(document).click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        newSequence();
        started = true;
    }
  });
  } else {
    // starting new sequence and making a level for big screens
    $(document).keypress(function(event) {
        if (!started && (event.key == " ")) {
    
        $("#level-title").text("Level " + level);
        newSequence();
        started = true;
        }
    });
  }
// button click event
$(".btn").click(function(event){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    //playing sound
    playSound(userChosenColour);

    // animation
    animatePress(userChosenColour);

    // check answer
    checkAnswer(userClickedPattern.length-1); 
})

//checking the sequence
function checkAnswer(currentLevel){
    
    // first if to check the most recent ans
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              newSequence();
            }, 1000);
          }
    } else{

        //audio for wrong sequence
        playSound("wrong");

        // red alert
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 250);

        //Game over title
        $("#level-title").text("Game Over, Press Space to Restart");
        
        startOver();            
    }         
}

function newSequence(){

    userClickedPattern = [];
    
    level++;
    updateHighScore();
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(150).fadeIn(150);
    playSound(randomChosenColour);
    
}

function playSound(colour){
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function animatePress(colour){
    $("#" + colour).addClass("pressed");
    setTimeout(function () {
        $("#" + colour).removeClass("pressed");}, 100);
}

// to restart the game
function startOver(){
    // reset everything
    level = 0;
    gamePattern = [];
    started = false;
    $("#high-score").text("High Score: " + highScore);  // Update display to current high score
}

$("#rules-container").hide();

// how to play button
$("#how-to-play").click(function(event){
    // animation
    animatePress("how-to-play");

    //play soung
    playSound("how-to-play");

    //slinding the rule box
    $("#rules-container").slideToggle();
})





