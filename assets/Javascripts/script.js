// welcome page element
var welcome = document.querySelector("#intro");
var startBtn = document.querySelector("#start_button");
var introPage =document.querySelector("#intro_page");


// Question page element
var questionPage = document.querySelector("#question_page");
var askQuestion = document.querySelector("#ask_question");

// question element 
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");

// answer chose element
var reactButtons = document.querySelectorAll(".choices");

// score page element 
var finalScore = document.querySelector("#final_score");

// submit, check and initial page element 
var scoreBoard = document.querySelector("#submit_page");
var checkLine = document.querySelector("#check_line");
var userInitial =document.querySelector("#initial");


// view score, record, finish  page element 
var highScorePage =document.querySelector("#high_score_page");
var submitBtn =document.querySelector("#submit_btn");
var scoreCheck =document.querySelector("#score_check");
var scoreRecord =document.querySelector("#score_record");
var finish =document.querySelector("#finish");


// return page element 
var backBtn =document.querySelector("#back_btn");
var clearBtn=document.querySelector("#clear_btn");



 
var timeLeft = document.getElementById("time");

var timerCount = 60;


// start and update timer

function setTime() {
        // Sets interval in variable
        var timerInterval = setInterval(function () {

            timerCount--;
          timeLeft.textContent = timerCount + " seconds left"  ;
    
            if (secondsLeft === 0){
                clearInterval(timerInterval);
                
                timeLeft.textContent = "Time is up!"; 
                finish.textContent = "Time is up!";
                gameOver();

            } else  if(questionCount >= questionSource.length +1) {
                clearInterval(timerInterval);
                gameOver();
                } 
    }, 1000);
}
// Questions Source element 
var questionSource = [
    
    {
        question: "Questions 1 : JavaScript is an....... language?",
        choices: ["a. object-oriented ", "b. object-based", "c.  procedural.", "d. None of the above "],
        answer: "a"
    },
    {
        question: "Questions 2 :  Which attribute needs to be changed to make elements invisible?",
        choices: ["a. visible", "b.  visibility ", "c. invisible ", "d. None of the above "],
        answer: "b"
    },
    {
        question: "Questions 3 : What language defines the behavior of a web page?",
        choices: ["a.  HTML ", "b. CSS", "c. XML", "d. JavaScript"],
        answer: "d"
    },
    {
        question: "Questions 4 : Which of the following function of Number object returns the number's value?",
        choices: ["a. toString()", "b. valueOf()", "c. toLocaleString()", "d. toPrecision()"],
        answer: "b"
    },
    {
        question: "Questions 5 : How can you get the type of arguments passed to a function?",
        choices: ["a. using typeof operator ", "b. using getType function ", "c. Both of the above ", "d.  None of the above"],
        answer: "a"
    },
    {
        question: "Questions 6 : Which statement cannot be used to declare a variable in JavaScript?.",
        choices: ["a. Let", "b. Int", "c. Var", "d. Const"],
        answer: "b"
    },
    {
        question: "Questions 7 : What will '0 == false ' evaluate to??",
        choices: ["a. Null", "b. Undefined", "c. Throws error", "d.true"],
        answer: "d"
    },
    {
        question: "Questions 8 : Which of the following is the right way to add a single line comment in JavaScript??",
        choices: ["a. #This is a comment", "b. ##This is a comment ", "c./This is a comment", "d. //This is a comment"],
        answer: "d"
    },

];

var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

    // start the quiz Game
function startGame () {
        introPage.style.display = "none";
        questionPage.style.display = "block";
        questionNumber = 0
        setTime();
        showQuestion(questionNumber);
      
}
    //Questions and answers
function showQuestion (n) {
        askQuestion.textContent = questionSource[n].question;
        answerBtn1.textContent = questionSource[n].choices[0];
        answerBtn2.textContent = questionSource[n].choices[1];
        answerBtn3.textContent = questionSource[n].choices[2];
        answerBtn4.textContent = questionSource[n].choices[3];
        questionNumber = n;
    }

    //WHEN I answer a question 
function checkAnswer(e) {
    e.preventDefault();
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = 'none';
    }, 1000);

    // answer check
    if (questionSource[questionNumber].answer == e.target.value) {
        checkLine.textContent = "Correct!"; 
        totalScore = totalScore + 1;

    } else {
        timerCount = timerCount - 1;
        checkLine.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer + " .";
    }
         
    if (questionNumber < questionSource.length -1 ) {
    
        showQuestion(questionNumber +1);
    } else {
    gameOver();
}
questionCount++;
}
   //stop game
function gameOver() {

        questionPage.style.display = "none";
        scoreBoard.style.display = "block";
        console.log(scoreBoard);
        
        finalScore.textContent = "Your final score is :" + totalScore ;
        timeLeft.style.display = "none"; 
};

// get current score and initials from local storage
function getScore () {
    var currentList =localStorage.getItem("ScoreList");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};


// render score 
function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display ="block";
    var highScores = sort();   
    var topFive = highScores.slice(0,5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
   
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
    }
};

function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}}; 

// push new score and initial 
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

//score save 
function saveScore () {
    var scoreItem ={
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

//Add event listeners

startBtn.addEventListener("click", startGame);

//click the  choices button and go to the next question
reactButtons.forEach(function(click){

    click.addEventListener("click", checkAnswer);
});

//save and go to next page
submitBtn.addEventListener("click", function(e) {
    e.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    saveScore();
});

// check high score ranking list
scoreCheck.addEventListener("click", function(e) {
    e.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    renderScore();
});

//go back to main page
backBtn.addEventListener("click",function(e){
        e.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "block";
        highScorePage.style.display = "none";
        questionPage.style.display ="none";
        location.reload();
});

//clear local storage and  page shows
clearBtn.addEventListener("click",function(e) {
    e.preventDefault();
    localStorage.clear();
    renderScore();
});