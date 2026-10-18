// Cкопіюй код з минулого уроку
document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "На якому факультеті навчався Гаррі Поттер?",
            answers: ["Слизерин", "Грифіндор", "Рейвенклов", "Гафелпаф"],
            correct: 1
        },
        {
            question: "Якої форми шрам на лобі у Гаррі?",
            answers: ["Зірка", "Хрест", "Блискавка", "Коло"],
            correct: 2
        },
        {
            question: "У який вид спорту грають на мітлах?",
            answers: ["Футбол", "Регбі", "Квідич", "Поло"],
            correct: 2
        },
        {
            question: "Як звати найкращого друга Гаррі?",
            answers: ["Драко Малфой", "Рон Візлі", "Невіл Лонгботом", "Седрик Дігорі"],
            correct: 1
        }
    ];

    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');

    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const hintBtn = document.querySelector('#hint-btn');

    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const scoreDisplay = document.querySelector('#score-display');
    const timerDisplay = document.querySelector('#timer');
    const resultText = document.querySelector('#result-text');

    let questionIndex = 0;
    let score = 0;
    let timeLeft = 15;
    let interval;
    let hintUsed = false;

    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');

        questionIndex = 0;
        score = 0;
        hintUsed = false;

        scoreDisplay.innerText = "Бали: 0";

        showQuestion();
    }

    function showQuestion() {
        clearInterval(interval);

        const currentQuestion = questions[questionIndex];

        questionText.innerText = currentQuestion.question;
        answersContainer.innerHTML = '';
        hintBtn.disabled = hintUsed;

        for (let i = 0; i < currentQuestion.answers.length; i++) {
            const button = document.createElement('button');

            button.innerText = currentQuestion.answers[i];
            button.classList.add('answer-btn');

            button.addEventListener('click', function () {
                checkAnswer(button, i);
            });

            answersContainer.appendChild(button);
        }

        startTimer();
    }

    function checkAnswer(button, answerIndex) {
        clearInterval(interval);

        if (answerIndex === questions[questionIndex].correct) {
            button.classList.add('correct');
            score++;
        } else {
            button.classList.add('wrong');
        }

        scoreDisplay.innerText = "Бали: " + score;

        const buttons = answersContainer.querySelectorAll('.answer-btn');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }

        hintBtn.disabled = true;

        setTimeout(function () {
            nextQuestion();
        }, 1000);
    }

    function nextQuestion() {
        questionIndex++;

        if (questionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        clearInterval(interval);

        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');

        const percentage = Math.round(
            score / questions.length * 100
        );

        resultText.innerText =
            "Твій результат: " + score + " з " +
            questions.length + " (" + percentage + "%)";
    }

    function startTimer() {
        timeLeft = 15;
        timerDisplay.innerText = "Час: " + timeLeft;

        interval = setInterval(function () {
            timeLeft--;
            timerDisplay.innerText = "Час: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    hintBtn.addEventListener('click', function () {
        if (hintUsed === true) {
            return;
        }

        hintUsed = true;
        hintBtn.disabled = true;

        const buttons = answersContainer.querySelectorAll('.answer-btn');
        const correct = questions[questionIndex].correct;
        let hiddenCount = 0;

        for (let i = 0; i < buttons.length; i++) {
            if (i !== correct && hiddenCount < 2) {
                buttons[i].style.display = 'none';
                hiddenCount++;
            }
        }
    });

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

});