// List of questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Mark Twain"],
        correctAnswer: "Harper Lee"
    },
    {
        question: "What animal do we refer to as the king of the jungle?",
        options: ["Lion", "Cheetah", "Mouse", "Dog"],
        correctAnswer: "Lion"
    },
    {
        question: "Which country is the largest by land area?",
        options: ["United States Of America", "China", "Russia", "India"],
        correctAnswer: "Russia"
    },
];

let currentQuestionIndex = 0;
let score = 0;
let failedQuestions = []; // Store failed questions

// Function to display the question and options
function loadQuestion() {
    const questionObj = questions[currentQuestionIndex];
    document.getElementById('question').textContent = questionObj.question;
    
    const optionsList = document.getElementById('options');
    optionsList.innerHTML = ""; // Clear previous options
    
    questionObj.options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.onclick = () => {
            checkAnswer(option);
            li.style.pointerEvents = 'none'; // Disable further clicks on options
        };
        optionsList.appendChild(li);
    });

    // Show the next button or finish button
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('next-btn').textContent = 'Finish Quiz';
    } else {
        document.getElementById('next-btn').textContent = 'Next Question';
    }
}

// Function to check the user's answer without immediate feedback
function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    // Store whether the user answered correctly or incorrectly
    if (selectedOption === correctAnswer) {
        score++;
    } else {
        failedQuestions.push({
            question: questions[currentQuestionIndex].question,
            correctAnswer: correctAnswer
        });
    }
}

// Function to move to the next question or finish the quiz
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

// Function to finish the quiz
function finishQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('final-score').textContent = `Your final score is: ${score}`;
    
    // Show failed questions if any
    if (failedQuestions.length > 0) {
        const failList = document.getElementById('failed-questions');
        failedQuestions.forEach(failed => {
            const li = document.createElement('li');
            li.textContent = `${failed.question} - Correct Answer: ${failed.correctAnswer}`;
            failList.appendChild(li);
        });
        document.getElementById('failures').style.display = 'block';
    } else {
        document.getElementById('failures').style.display = 'none';
    }
}

// Function to retake the quiz
function retakeQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    failedQuestions = [];
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}

// Function to view failed answers
function viewFailedAnswers() {
    alert('You can see the failed answers listed above. You can retake the quiz anytime.');
}

// Start the quiz
loadQuestion();
