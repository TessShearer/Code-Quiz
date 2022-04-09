// Layout of questions, answers, and starting time
let questionsArray = [{text:"what is the most common web development programming language?",answers:["Javascript",'React','Java','Python'], correctAnswer:"Javascript"},{text:"Where do you link a CSS file into your code?",answers:["At the top of the CSS file",'In the HTML head','At the bottom of the CSS file','in the HTML body'], correctAnswer:"In the HTML head"},{text:"Which of the following would target an element with a class of information in CSS?",answers:["#information",'information','class=information','.information'], correctAnswer:".information"},{text:"What does a ul element refer to?",answers:["an interactive element",'unalphabetized letters','an unordered list','elements within a list'], correctAnswer:"an unordered list"},{text:"Will I get a good score on my project?",answers:["no",'Yes - this is the right answer I hope','no','no'], correctAnswer:"Yes - this is the right answer I hope"}];

let currentPosition = 0;
let time = 60;

let question = document.querySelector("#question");

let highScores = JSON.parse(localStorage.getItem("scoreName")) || []

// function that runs the quiz
function startQuiz () {

    // Starts the timer
const timerInterval = setInterval(timer, 1000);
    
    function timer (){
        if(time>0){
            time--;
            console.log("time")
            console.log(currentPosition)
            document.getElementById("time").innerText=time;
        }
    }
function timerFunction (){
    timerInterval;
}
timerFunction();

    // removes extra starting html and places new html to accomodate questions
const description = document.getElementById("description");
description.remove();
startQuizBtn.remove();
viewScoresDiv.remove();

const answers = document.createElement("ol");
document.getElementsByTagName("main")[0].appendChild(answers);
answers.classList.add("answers");

const firstAnswer = document.createElement("li");
answers.appendChild(firstAnswer);
firstAnswer.classList.add("first-answer");
const secondAnswer = document.createElement("li");
answers.appendChild(secondAnswer);
secondAnswer.classList.add("second-answer");
const thirdAnswer = document.createElement("li");
answers.appendChild(thirdAnswer);
thirdAnswer.classList.add("third-answer");
const fourthAnswer = document.createElement("li");
answers.appendChild(fourthAnswer);
fourthAnswer.classList.add("fourth-answer");

    //asks questions
    function newQuestion() {
question.innerText=questionsArray[currentPosition].text;
firstAnswer.innerText=questionsArray[currentPosition].answers[0];
secondAnswer.innerText=questionsArray[currentPosition].answers[1];
thirdAnswer.innerText=questionsArray[currentPosition].answers[2];
fourthAnswer.innerText=questionsArray[currentPosition].answers[3];
    }
newQuestion();

// function for once all the questions have been answered or you run out of time
function endQuiz (){
    // stops timer
        clearInterval(timerInterval);

        // removes question elements and adds text box
        firstAnswer.remove();
        secondAnswer.remove();
        thirdAnswer.remove();
        fourthAnswer.remove();
        answers.remove();
        question.innerText=("Game Over! Your score is " + time + "! Enter Your Initials Below.")

        const enterScore = document.createElement("form");
        document.getElementsByTagName("main")[0].appendChild(enterScore);
        const scoresInput = document.createElement("input");
        const scoresBtn = document.createElement("button");
        enterScore.append(scoresInput,scoresBtn);
        scoresBtn.innerText="Submit";

        scoresBtn.addEventListener("click", function (event){
            let userName = event.target.previousElementSibling.value
            let scoreListItem = {name:userName, score:time}
            highScores.push(scoreListItem)
            highScores.sort(function(a,b){return b.score-a.score});
            localStorage.setItem("scoreName",JSON.stringify(highScores));
        }) 

}
// Check if clicked answer was correct and asks next question or ends quiz
function clickAnswer(event){
    var element = event.target;
    if(!(questionsArray[currentPosition].correctAnswer === element.innerText)){
    time = (time - 10);
    }
currentPosition++ 
    if (currentPosition < questionsArray.length && time > 0) {
newQuestion(); 
}
else
endQuiz();
}

// Event listeners for quiz questions
firstAnswer.addEventListener('click',clickAnswer);
secondAnswer.addEventListener('click',clickAnswer);
thirdAnswer.addEventListener('click',clickAnswer);
fourthAnswer.addEventListener('click',clickAnswer);
}


// View the high scores
function viewScores () {

const description = document.getElementById("description");
description.remove();
startQuizBtn.remove();
question.innerText=("High Scores");
const highScoresList = document.createElement("ol");
console.log(highScoresList);
document.getElementsByTagName("main")[0].appendChild(highScoresList);
for(i=0;i<highScores.length;i++){
    let highScoresli = document.createElement("li")
    highScoresli.innerText = "Name: "+highScores[i].name+" Score: "+highScores[i].score;
    console.log(highScoresli);
    highScoresList.appendChild(highScoresli);
};



localStorage.getItem("scoreName")
}

// Find and add event listener to the #startquiz button and the #scores div
var startQuizBtn = document.querySelector("#startquiz");
startQuizBtn.addEventListener("click", startQuiz);
var viewScoresDiv = document.querySelector("#scores");
viewScoresDiv.addEventListener("click", viewScores);

