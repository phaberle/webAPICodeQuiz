var qContainer = document.querySelector("#quizContainer");
var qSec = document.querySelector("#question");
var answerSec = document.querySelector("#answers");

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

function clearForNextQuestion() {
    var x = document.querySelector("#quizContainer span");
    var y = document.querySelector("#answers");
    var z = document.querySelector("#response");
    x.remove();
    y.remove();
    z.innerHTML = "";
    z.setAttribute("style", "border:none;");
}


var gradeUserAnswer = function(li_id) {
    var questionUp = document.querySelector("#quizContainer span");
    var questionUp_id = questionUp.getAttribute("id");
    var questionCorrAnswer = eval(questionUp_id + ".answer");
    var grade = li_id == questionCorrAnswer ? true : false;
    if (!grade) {
        reactToUserAnswer(grade);
        deductTime();
        setTimeout(clearForNextQuestion, 2000);
        getNextQuestion(questionUp_id);
    } else if (grade) {
        reactToUserAnswer(grade);
        setTimeout(clearForNextQuestion, 2000);
        getNextQuestion(questionUp_id);
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
var sec = 60;
deductTime();

function startTimer() {
    console.log('timer suppose to go')
    var timer = setInterval(function() {
        sec--;
        document.getElementById('timerDiv').innerHTML = '00:' + sec;
        if (sec < 0) {
            clearInterval(timer);
            alert("Time is up!")
        }
    }, 1000);
}

function deductTime() {
    sec -= 5;
    document.getElementById('timerDiv').innerHTML = '00:' + sec;
};
//


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
    }
}

startTimer();
questionTemplate(Q1);

qContainer.addEventListener("click", getLI_id);