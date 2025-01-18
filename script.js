// Variables globales
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Elementos del DOM
const questionContainer = document.getElementById("question-container");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-button");
const scoreContainer = document.getElementById("score-container");

// Función para cargar las preguntas desde el JSON
async function loadQuestions() {
  try {
    const response = await fetch(
      "https://gist.github.com/bertez/2528edb2ab7857dae29c39d1fb669d31"
    ); // Ajusta la ruta según sea necesario
    questions = await response.json();
    startGame();
  } catch (error) {
    console.error("Error al cargar las preguntas:", error);
  }
}

// Función para iniciar el juego
function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.addEventListener("click", nextQuestion);
  displayQuestion();
}

// Función para mostrar una pregunta
function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.innerHTML = `<h2>${question.question}</h2>`;
  answersContainer.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(button);
  });

  nextButton.style.display = "none";
}

// Función para seleccionar una respuesta
function selectAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];
  const buttons = answersContainer.getElementsByTagName("button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
    if (i === question.correctAnswer) {
      buttons[i].style.backgroundColor = "green";
    } else if (i === selectedIndex) {
      buttons[i].style.backgroundColor = "red";
    }
  }

  if (selectedIndex === question.correctAnswer) {
    score++;
  }

  nextButton.style.display = "inline-block";
}

// Función para pasar a la siguiente pregunta
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endGame();
  }
}

// Función para finalizar el juego
function endGame() {
  questionContainer.innerHTML = "<h2>¡Juego terminado!</h2>";
  answersContainer.innerHTML = "";
  nextButton.style.display = "none";
  scoreContainer.innerHTML = `<p>Tu puntuación final es: ${score} de ${questions.length}</p>`;
}

// Iniciar el juego cargando las preguntas
loadQuestions();
