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
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}

//click for index page 
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});
