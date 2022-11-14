//add variables
var highScore = document.querySelector("#highscore");
var clear = document.querySelector("clear");
var goBack = document.querySelector("goBack");

//event listner click to clear score
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();

});

//local storage
