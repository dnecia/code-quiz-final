//adding in the var with an arrary object for the questions 
var questions = [
    {
        title: "commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses" 
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes" 
    },
    {
        title: "A very useful tool for use during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
];

//The decleared variables 
var score = 0;
var questionIndex = 0;

//more variables
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("wrapper");

//variables for the time left, interval & penalty time and new element
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

//listen for click on button
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time is up";
            }
        }, 1000);
    }
    render(questionIndex);
});

//Rendering questions to the page
function render(questionIndex) {
    questionsDiv. innerHTML = "";
    ulCreate.innerHTML = "";
    // loop through infor in the array
    for (var i = 0; i < questions.length; i++) {
        //appending the title of the questions 
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    });
}

//to compare the answer to right answer choice (correct or incorrect)
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        //correct cond
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct"
        } else {
            //deduct time for incorrect answer
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect"
        }
    }
   
    questionIndex++;
    
    if (questionIndex >= questions.length) {
        allDone(); //this will append the last page with the results
        createDiv.textContent = "Quiz is over" + " " + "You got  " + score + "/" + questions.length + "Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);


}

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML= "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done"

    questionsDiv.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    //time remaining calc
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your score is-" + timeRemaining;

        questionsDiv.appendChild(createP2);

    }
    //label for where to put initals 
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter initials"; 

    questionsDiv.appendChild(createLabel);

    //input 
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    //submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    //eventlistner for initials along wiht the local storage for reuslts 
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            console.log("please enter value")
            
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore)
            var allScores = localStorage.getItem("allScores");
            if (allScores === null ) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            //go to final page
            window.location.replace("./HighScores.html");
        }
           

    
    });





}
