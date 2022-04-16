var qContainer = document.querySelector("#quizContainer");
var qSec = document.querySelector("#question");
var answerSec = document.querySelector("#answers");
var hsLink = document.querySelector("#highScoreLink");
var timer = document.querySelector("#timerDiv");
var numUserCorrect = 0;
var timerInterval;

var Q1 = {
    question: "Which of the following is the correct JavaScript source declaration on a HTML page?",
    a: "<script src=\".\/assets\/js\/script.js\"><\/script>",
    b: "<script source=\".\/assets\/js\/script.js\"><\/script>",
    c: "<scripts src=\".\/assets\/js\/script.js\"><\/script>",
    d: "<scripted src=\".\/assets\/js\/script.js\"><\/scripted>",
    answer: "a",
    id: "Q1"
};

var Q2 = {
    question: "Select the answer which contains all of the JavaScript data types.",
    a: "Number, Null, Undefined, Varchar, Constant",
    b: "Char, Int, Bool, Null, String, Blob",
    c: "String, Number, BigInt, Undefined, Null, Symbol",
    d: "Byte, Float, Long, string, Double, Void",
    answer: "c",
    id: "Q2"
};

var Q3 = {
    question: "Explain \"this\" keyword.",
    a: "References my coffee cup.",
    b: "References a sibling DOM element.",
    c: "References the HTML page.",
    d: "References an object and in strict mode can be any value X.",
    answer: "d",
    id: "Q3"
}
var Q4 = {
    question: "What are callbacks?",
    a: "Deja Vu",
    b: "Functions used as an argument to another function",
    c: "Local Storage",
    d: "Object reference",
    answer: "b",
    id: "Q4"
}

var questionTemplate = function(object) {
    var theQuestion = document.createElement("span");
    theQuestion.setAttribute("id", object.id);
    theQuestion.textContent = object.question;
    qContainer.appendChild(theQuestion);
    //-----
    var answerSec = document.createElement("span");
    answerSec.setAttribute("id", "answers");
    qContainer.appendChild(answerSec);
    //-----
    var answerUL = document.createElement("ul");
    answerSec.appendChild(answerUL);
    //-----
    var qAnswer = object.answer;
    //----
    var aLI1 = document.createElement("li");
    aLI1.textContent = object.a;
    aLI1.setAttribute("id", "a");
    if (qAnswer == "a") {
        aLI1.setAttribute("data-answer", "correct");
    } else {
        aLI1.setAttribute("data-answer", "incorrect");
    }
    answerUL.appendChild(aLI1);
    //-----
    var aLI2 = document.createElement("li");
    aLI2.textContent = object.b;
    aLI2.setAttribute("id", "b");
    if (qAnswer == "b") {
        aLI2.setAttribute("data-answer", "correct");
    } else {
        aLI2.setAttribute("data-answer", "incorrect");
    }
    answerUL.appendChild(aLI2);
    //-----
    var aLI3 = document.createElement("li");
    aLI3.textContent = object.c;
    aLI3.setAttribute("id", "c");
    if (qAnswer == "c") {
        aLI3.setAttribute("data-answer", "correct");
    } else {
        aLI3.setAttribute("data-answer", "incorrect");
    }
    answerUL.appendChild(aLI3);
    //----
    var aLI4 = document.createElement("li");
    aLI4.textContent = object.d;
    aLI4.setAttribute("id", "d");
    if (qAnswer == "d") {
        aLI4.setAttribute("data-answer", "correct");
    } else {
        aLI4.setAttribute("data-answer", "incorrect");
    }
    answerUL.appendChild(aLI4);
}

//while quiz running
function clearQuizContainerQuiz(questionUp_id) {
    var x = document.querySelector("#quizContainer span");
    var y = document.querySelector("#answers");
    var z = document.querySelector("#response");
    x.remove();
    y.remove();
    z.innerHTML = "";
    z.setAttribute("style", "border:none;");
    getNextQuestion(questionUp_id);
}

//while quiz not running
function clearQuizContainerNonQuiz() {
    try {
        while (qContainer.firstChild) {
            qContainer.removeChild(qContainer.firstChild);
        }
    } catch (error) {}
}


var gradeUserAnswer = function(li_id) {
    var questionUp = document.querySelector("#quizContainer span");
    var questionUp_id = questionUp.getAttribute("id");
    var questionCorrAnswer = eval(questionUp_id + ".answer");
    var grade = li_id == questionCorrAnswer ? true : false;
    if (!grade) {
        reactToUserAnswer(grade);
        deductTime();
        setTimeout(function() {
            clearQuizContainerQuiz(questionUp_id);
        }, 2000);

    } else if (grade) {
        reactToUserAnswer(grade);
        numUserCorrect++;
        setTimeout(function() {
            clearQuizContainerQuiz(questionUp_id)
        }, 2000);
    }
}

var reactToUserAnswer = function(option) {
    var respSec = document.querySelector("#response");
    if (option == true) {
        respSec.textContent = "CORRECT";
        respSec.setAttribute("style", "color:green; border-bottom:2px black solid;");
    } else if (option == false) {
        respSec.textContent = "INCORRECT";
        respSec.setAttribute("style", "color:red; border-bottom:2px black solid;");
    }
}

var getLI_id = function(event) {
    var qTarget = event.target;
    if (qTarget.matches("li")) {
        var li_id = qTarget.getAttribute("id");
        gradeUserAnswer(li_id);
    }
}


//TIMER
var sec = 65;
deductTime();

function startTimer() {
    console.log('timer suppose to go')
    timerInterval = setInterval(function() {
        sec--;
        document.getElementById('timerDiv').innerHTML = '00:' + sec;
        if (sec < 0) {
            clearInterval(timerInterval);
            qContainer.textContent = "Time is up.";
            clearQuizContainerNonQuiz();
            showStartBtn();
        }
    }, 1000);
}


function deductTime() {
    sec -= 5;
    document.getElementById('timerDiv').innerHTML = '00:' + sec;
};
//

//POST QUIZ
var showOutcome = function() {
    clearInterval(timerInterval);
    timer.setAttribute("style", "color:white;");
    var timeDiv = document.querySelector("#timerDiv");
    var timeRemaining = timeDiv.textContent;
    var score = "Score: " + numUserCorrect + "/4 @ " + timeRemaining + "";
    var scoreSpan = document.createElement("span");
    scoreSpan.setAttribute("id", "score");
    scoreSpan.textContent = score;
    qContainer.appendChild(scoreSpan);
    promptToSaveHighScore();
}

var promptToSaveHighScore = function() {
    var hsForm = document.createElement("form");
    hsForm.setAttribute("id", "highScoreForm");
    qContainer.appendChild(hsForm);
    hsForm.innerHTML = "<label for='playerName'>Enter Name:</label></br><input type='text' placeholder='Your Name' name='playerName'  class='formInput'\/></br><button type='submit' id='btn' class='btnAlignment'>Save Score</button>";
    showStartBtn();
}

var highScoreController = function(event) {
        event.preventDefault();
        var nameInput = document.querySelector("input[name='playerName']").value;
        var playerScoreRaw = document.querySelector("#score").textContent;
        var playerScore = playerScoreRaw.substring(6);
        var tempName = "Player";
        if (nameInput.length == 0 || nameInput == undefined) {
            window.alert("You didn't enter a name.\n I saw that.\nYour name is \"Player.\"");
        } else {
            tempName = nameInput;
        }
        var player = {
            playerName: tempName.trim(),
            score: playerScore.trim()
        };
        localStorage.setItem("player", JSON.stringify(player));
    }
    //

var showHighScore = function() {
    clearQuizContainerNonQuiz();
    try {
        var player = localStorage.getItem("player");
        var translated = JSON.parse(player);
        var hs = document.createElement("span");
        hs.setAttribute("id", "highScore");
        hs.textContent = translated.playerName + ": " + translated.score;
        qContainer.appendChild(hs);
        showStartBtn();
    } catch (error) {
        window.alert("No score to display.")
    }
}

var showStartBtn = function() {
    var startBtn = document.createElement("button");
    startBtn.setAttribute("id", "startBtn");
    startBtn.setAttribute("class", "btnAlignment");
    startBtn.setAttribute("onclick", "startQuiz()");
    startBtn.textContent = "Start Quiz";
    qContainer.appendChild(startBtn);
}

var getNextQuestion = function(currentQuestion) {
    switch (currentQuestion) {
        case "Q1":
            questionTemplate(Q2);
            break;
        case "Q2":
            questionTemplate(Q3);
            break;
        case "Q3":
            questionTemplate(Q4);
            break;
        case "Q4":
            showOutcome();
    }
}


var startQuiz = function() {
    sec = 60;
    numUserCorrect = 0;
    document.getElementById('timerDiv').innerHTML = '00:' + sec;
    clearQuizContainerNonQuiz();
    timer.setAttribute("style", "color:black;");
    startTimer();
    questionTemplate(Q1);
}

showStartBtn();

qContainer.addEventListener("click", getLI_id);
qContainer.addEventListener("submit", highScoreController);
hsLink.addEventListener("click", showHighScore);