const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('next-btn');
const feedbackElement = document.getElementById('feedback');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('score-value');
const progressBar = document.getElementById('progress-bar');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 600;
let timer;

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Marketing Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Markup Leveler", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Creative Style Sheets", correct: false },
            { text: "Computer Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to define a footer for a document or section?",
        answers: [
            { text: "<footer>", correct: true },
            { text: "<bottom>", correct: false },
            { text: "<section>", correct: false },
            { text: "<foot>", correct: false }
        ]
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "<js>", correct: false },
            { text: "<script>", correct: true },
            { text: "<javascript>", correct: false },
            { text: "<scripting>", correct: false }
        ]
    },
    {
        question: "What is the correct CSS syntax?",
        answers: [
            { text: "body {color: black;}", correct: true },
            { text: "body:color=black;", correct: false },
            { text: "{body:color=black;}", correct: false },
            { text: "body:color(black);", correct: false }
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "msg('Hello World');", correct: false },
            { text: "alertBox('Hello World');", correct: false },
            { text: "msgBox('Hello World');", correct: false },
            { text: "alert('Hello World');", correct: true }
        ]
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        answers: [
            { text: "class", correct: false },
            { text: "font", correct: false },
            { text: "styles", correct: false },
            { text: "style", correct: true }
        ]
    },
    {
        question: "Which is the correct CSS syntax to change the font size?",
        answers: [
            { text: "font-size: 16px;", correct: true },
            { text: "font: size 16px;", correct: false },
            { text: "text-size: 16px;", correct: false },
            { text: "text: 16px;", correct: false }
        ]
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        answers: [
            { text: "<break>", correct: false },
            { text: "<lb>", correct: false },
            { text: "<br>", correct: true },
            { text: "<linebreak>", correct: false }
        ]
    },
    {
        question: "Which HTML element is used to specify a header for a section or page?",
        answers: [
            { text: "<header>", correct: true },
            { text: "<head>", correct: false },
            { text: "<section>", correct: false },
            { text: "<heading>", correct: false }
        ]
    }
];

function startQuiz() {
    showQuestion(currentQuestionIndex);
    startTimer();
    updateProgressBar();
}

function showQuestion(index) {
    resetState();
    const question = questions[index];
    const questionElement = document.createElement('div');
    questionElement.innerText = question.question;
    quizContainer.appendChild(questionElement);

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        quizContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    feedbackElement.classList.add('hidden');
    while (quizContainer.firstChild) {
        quizContainer.removeChild(quizContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    feedbackElement.classList.remove('hidden');
    if (correct) {
        score++;
        scoreElement.innerText = score;
        selectedButton.classList.add('correct');
        feedbackElement.innerText = "Correct!";
        feedbackElement.style.color = "#4CAF50";
        correctSound.play();
    } else {
        selectedButton.classList.add('incorrect');
        feedbackElement.innerText = "Incorrect!";
        feedbackElement.style.color = "#f44336";
        incorrectSound.play();
    }
    Array.from(quizContainer.children).forEach(button => {
        if (button.tagName === 'BUTTON') {
            button.disabled = true;
            if (button.dataset.correct) {
                button.classList.add('correct');
            }
        }
    });
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.classList.remove('hidden');
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    clearInterval(timer);
    resetState();
    const finalScoreElement = document.createElement('div');
    finalScoreElement.innerText = `Final Score: ${score}`;
    quizContainer.appendChild(finalScoreElement);
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
    updateProgressBar();
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showFinalScore();
        }
    }, 1000);
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

startQuiz();
