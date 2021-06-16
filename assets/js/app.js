
const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const answersIndicatorContainer = document.querySelector('.answers-indicator');
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const textBox = document.querySelector('.text-box');
const formElement = document.querySelector('.form-element');

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

// push the questions into availableQuestions Array
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i = 0; i < totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }    

}

// set question number and question and options
function getNewQuestion(){
    // set question number
    questionNumber.innerHTML = 'Question' + (questionCounter + 1) + 'of' + quiz.length;

    // set question text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    // get the position of 'questionIndex' from availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);
    // remove the questionIndex from the availableQuestion Array, so that the question does not repeat
    availableQuestions.splice(index1,1);

    // set options
    // get the lenght of options
    const optionLen = currentQuestion.options.length
    // push options into availableOptions Array
    for(let i = 0; i < optionLen; i++){
        availableOptions.push(i);
    }

    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // create options in html
    for(let i = 0; i < optionLen; i++){
        // random option
        const optonIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of optonIndex from the availableOptions Array
        const index2 = availableOptions.indexOf(optonIndex);
        // remove the optonIndex from the availableOptions Array, so that the option does not repeat
        availableOptions.splice(index2,1);
        const option = document.createElement('div');
        option.innerHTML = currentQuestion.options[optonIndex];
        option.id = optonIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = 'option';
        optionContainer.appendChild(option)
        option.setAttribute('onclick', 'getResult(this)');
    }

    questionCounter++

   }

// get the result of current attempt question
function getResult(element){
    const id = parseInt(element.id);
    // get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer){
        // set green color to correct option
        element.classList.add('correct');
        // add the indicator to correct mark
        updateAnswerIndicator('correct');
        correctAnswers++;
    }
    else{
        // set red color to wrong option
        element.classList.add('wrong');
        // add the indicator to wrong mark
        updateAnswerIndicator('wrong');

        // if the answer is incorrect show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for(let i = 0; i < optionLen; i++ ){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add('correct');

            }
        }


    }
    attempt++;
    unclickableOptions();

}

// make all the options unclickable once the user select a option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i = 0; i < optionLen; i++){
        optionContainer.children[i].classList.add('already-answered');

    }

}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for( let i = 0; i < totalQuestion; i++){
        const indicator = document.createElement('div');
        answersIndicatorContainer.appendChild(indicator);
    }

}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);

}

function next(){
    if (questionCounter === quiz.length){
        console.log('quiz over');
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    // hide quiz box
    quizBox.classList.add('hide');
    // show result box
    resultBox.classList.remove('hide');

    yourResult();


}

// get the quiz result
function yourResult(){
    resultBox.querySelector('.total-question').innerHTML = quiz.length; 
    resultBox.querySelector('.total-attempt').innerHTML = attempt;
    resultBox.querySelector('.total-correct').innerHTML = correctAnswers;
    resultBox.querySelector('.total-wrong').innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector('.percentage').innerHTML = percentage.toFixed(2) + '%';
    resultBox.querySelector('.total-score').innerHTML = correctAnswers + '/' + quiz.length;
    textBox.classList.remove('hide');
    textBox.querySelector('.greeting').innerHTML = 'Thanks For Playing and Subscribe to our Newsletter!';

}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    
}


function tryAgainQuiz(){
    // hide the resultbox
    resultBox.classList.add('hide');    
    // show the quizbox
    quizBox.classList.remove('hide');
    // hide text box and text
    textBox.classList.add('hide');
    textBox.querySelector('.greeting').innerHTML = '';
            
    resetQuiz();
    startQuiz();
    
}

function goToHome(){
    // hide result box
    resultBox.classList.add('hide');    
    // show home box
    homeBox.classList.remove('hide');
    // hide text box and text
    textBox.classList.add('hide');
    textBox.querySelector('.greeting').innerHTML = '';      
    resetQuiz();    

}


// #### STARTING POINT ####

function startQuiz(){
    
    // hide home box
    homeBox.classList.add('hide');
    // show quiz box
    quizBox.classList.remove('hide');
        
    // set questions in availableQuestions Array
    setAvailableQuestions();
    // call getNewQuestion(); function
    getNewQuestion();
    // to create indicator of answers
    answersIndicator();
    
}

window.onload = function (){
    homeBox.querySelector('.total-question').innerHTML = quiz.length;
    
}








