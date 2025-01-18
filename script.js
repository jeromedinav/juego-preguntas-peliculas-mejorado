// script.js

console.log("Script cargado correctamente");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

fetch("questions.json")
  .then((response) => {
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
  if (currentQuestionIndex < questions.length) {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    questionData.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.onclick = () => checkAnswer(index);
      answersDiv.appendChild(button);
    });
  } else {
    document.getElementById("score").textContent = `Puntuación final: ${score}`;
  }
}

function checkAnswer(selectedIndex) {
  if (questions[currentQuestionIndex].correctAnswer === selectedIndex) {
    score++;
  }
  currentQuestionIndex++;
  showNextQuestion();
}
