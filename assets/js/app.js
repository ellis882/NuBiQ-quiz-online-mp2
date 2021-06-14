
const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const answersIndicatorContainer = document.querySelector('.answers-indicator');
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const textBox = document.querySelector('.text-box');

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
