var qContainer = document.querySelector("#quizContainer");
var qSec = document.querySelector("#question");
var answerSec = document.querySelector("#answers");

var Q1 = {
    question: "Which of the following is the correct JavaScript source declaration on a HTML page?",
    a: "<script src=\".\/assets\/js\/script.js\"><\/script>",
    b: "<script source=\".\/assets\/js\/script.js\"><\/script>",
    c: "<scripts src=\".\/assets\/js\/script.js\"><\/script>",
    d: "<scripted src=\".\/assets\/js\/script.js\"><\/scripted>",
    answer: "a"
};

var Q2 = {
    question: "Select the answer which contains all of the JavaScript data types.",
    a: "Number, Null, Undefined, Varchar, Constant",
    b: "Char, Int, Bool, Null, String, Blob",
    c: "String, Number, BigInt, Undefined, Null, Symbol",
    d: "Byte, Float, Long, string, Double, Void",
    answer: "c"
};

var Q3 = {
    question: "Explain \"this\" keyword.",
    a: "References my coffee cup.",
    b: "References a sibling DOM element.",
    c: "References the HTML page.",
    d: "References an object and in strict mode can be any value X.",
    answer: "d"
}
var Q4 = {
    question: "What are callbacks?",
    a: "Deja Vu",
    b: "Functions used as an argument to another function",
    c: "Local Storage",
    d: "Object reference",
    answer: "b"
}

var questionTemplate = function(object) {
    var theQuestion = document.createElement("span");
    theQuestion.setAttribute("id", "question");
    theQuestion.textContent = object.question;
    qContainer.appendChild(theQuestion);

    var answerSec = document.createElement("span");
    answerSec.setAttribute("id", "answers");
    qContainer.appendChild(answerSec);

    var answerUL = document.createElement("ul");
    answerSec.appendChild(answerUL);

    var qAnswer = object.answer;

    var aLI1 = document.createElement("li");
    aLI1.textContent = object.a;
    if (qAnswer == "a") {
        aLI1.setAttribute("data-answer", "correct");
    } else {
        aLI1.setAttribute("data-answer", "incorrect");
    }
    answerUL.appendChild(aLI1);
    //-----
    var aLI2 = document.createElement("li");
    aLI2.textContent = object.b;
    if (qAnswer == "b") {
        aLI2.setAttribute("data-answer", "correct");
    } else {
        aLI2.setAttribute("data-answer", "incorrect");
    }
    answerUL.appendChild(aLI2);
    //-----
    var aLI3 = document.createElement("li");
    aLI3.textContent = object.c;
    if (qAnswer == "c") {
        aLI3.setAttribute("data-answer", "correct");
    } else {
        aLI3.setAttribute("data-answer", "incorrect");
    }
    answerUL.appendChild(aLI3);
    //----
    var aLI4 = document.createElement("li");
    aLI4.textContent = object.d;
    if (qAnswer == "d") {
        aLI4.setAttribute("data-answer", "correct");
    } else {
        aLI4.setAttribute("data-answer", "incorrect");
    }
    answerUL.appendChild(aLI4);
}

function clearQuestionContainer() {
    var x = document.querySelector("#question");
    var y = document.querySelector("#answers");
    x.remove();
    y.remove();
}