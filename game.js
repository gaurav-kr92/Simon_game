var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = true;


function nextSequence() {
    userClickedPattern=[];
    var n = Math.random() * 4;
    var randomNumber = Math.floor(n);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);

}



$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}

$(document).keypress(function () {

    if (started == true) {
        nextSequence();
        // $("#level-title").text("Level 0");
    }
    started = false;
})

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    
    else{
        playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart\nYour Score "+(level-1));

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
    level=0;
    gamePattern=[];
    started=true;
}


