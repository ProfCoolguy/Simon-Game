var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=true;
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length===gamePattern.length) {
            setTimeout(function(){
                nextSequence();
                userClickedPattern=[];
            },1000)
        }
    }
    else{
        startOver();
        playSound('wrong');
        $("body").addClass("game-over")
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
    }
    }
    function startOver(){
        level=0;
        gamePattern=[];
        started=true;
    }
function playSound(name){
    var audio = new Audio("sounds/"+name + '.mp3');
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    },100)
}
$(document).on("keypress touchstart",function (){
    if (started===true) {
        nextSequence();
        $("h1").text("Level "+level);
        started=false;
    }
});
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
