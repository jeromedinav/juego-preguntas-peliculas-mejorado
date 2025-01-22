// Variables globales
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

// Cargar preguntas desde el JSON
function loadQuestions() {
  fetch("questions.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      showNextQuestion();
    })
    .catch((error) => console.error("Error al cargar las preguntas:", error));
}

// Mostrar la siguiente pregunta
function showNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    questionData.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;

      const icon = document.createElement("img");
      icon.classList.add("answer-icon");

      button.appendChild(icon);

      button.onclick = () => checkAnswer(button, answer, questionData.correct);
      answersDiv.appendChild(button);
    });

    currentQuestionIndex++;
    startTimer();
  } else {
    showScore();
  }
}

// Verificar la respuesta del usuario
function checkAnswer(button, selected, correct) {
  // Deshabilitar todos los botones de respuesta
  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach((btn) => (btn.disabled = true));

  const icon = button.querySelector(".answer-icon");
  if (selected === correct) {
    score++;
    document.getElementById("score").textContent = `Puntuación: ${score}`;
    icon.src = "assets/check.svg";
  } else {
    icon.src = "assets/cross.svg";
  }
  icon.style.display = "inline-block";

  setTimeout(() => {
    showNextQuestion();
  }, 1000);
}

// Iniciar el temporizador
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  document.getElementById(
    "timer"
  ).textContent = `Tiempo restante: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById(
      "timer"
    ).textContent = `Tiempo restante: ${timeLeft}s`;

    const container = document.getElementById("question-container");
    if (timeLeft > 20) {
      container.style.borderColor = "green";
    } else if (timeLeft > 10) {
      container.style.borderColor = "orange";
    } else {
      container.style.borderColor = "red";
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showNextQuestion();
    }
  }, 1000);
}

// Mostrar la puntuación final
function showScore() {
  document.getElementById(
    "question-container"
  ).innerHTML = `<h2>Tu puntuación final es ${score}</h2>`;
}

// Iniciar el juego
loadQuestions();
