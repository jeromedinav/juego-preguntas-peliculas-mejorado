// script.js

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("Document loaded");

  console.log("Script cargado correctamente");

  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;

  fetch("questions.json")
    .then((response) => {
      console.log("Fetch response:", response);
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      return response.json();
    })
    .then((data) => {
      console.log("JSON cargado correctamente:", data);
      questions = data;
      showNextQuestion();
    })
    .catch((error) => console.error("Error:", error));

  function showNextQuestion() {
    console.log("Mostrando la pregunta número", currentQuestionIndex);
    if (currentQuestionIndex < questions.length) {
      const questionData = questions[currentQuestionIndex];
      document.getElementById("question").textContent = questionData.question;
      const answersDiv = document.getElementById("answers");
      answersDiv.innerHTML = "";
      questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => {
          console.log("Respuesta seleccionada:", index);
          checkAnswer(index);
        };
        answersDiv.appendChild(button);
      });
      updateProgressBar();
    } else {
      console.log("Fin del cuestionario, puntuación final:", score);
      document.getElementById(
        "score"
      ).textContent = `Puntuación final: ${score}`;
    }
  }

  function checkAnswer(selectedIndex) {
    console.log("Verificando la respuesta seleccionada:", selectedIndex);
    if (questions[currentQuestionIndex].correctAnswer === selectedIndex) {
      console.log("Respuesta correcta");
      score++;
    } else {
      console.log("Respuesta incorrecta");
    }
    currentQuestionIndex++;
    showNextQuestion();
  }

  function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
});
