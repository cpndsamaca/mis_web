const missions = [
  {
    section: "Seccion 1",
    title: "Mision 1: Acceso Inicial",
    scenario: "La puerta inicial del sistema exige calcular el total de un rango.",
    question: "Que formula calcula el total?",
    options: ["=PROMEDIO(A1:A3)", "=SUMA(A1:A3)", "=MAX(A1:A3)"],
    answer: "=SUMA(A1:A3)",
    code: "7",
    hint: "Total en Excel significa sumar los valores seleccionados."
  },
  {
    section: "Seccion 2",
    title: "Mision 2: Usuario Sospechoso",
    scenario: "Texto detectado: HACKER. Necesitas extraer las primeras 4 letras.",
    question: "Que funcion extrae las primeras 4 letras?",
    options: ["=IZQUIERDA(A1,4)", "=DERECHA(A1,4)", "=LARGO(A1)"],
    answer: "=IZQUIERDA(A1,4)",
    code: "3",
    hint: "Si necesitas letras del inicio, mira hacia la izquierda."
  },
  {
    section: "Seccion 3",
    title: "Mision 3: Servidor Central",
    scenario: "El servidor pide analizar el rendimiento promedio de datos.",
    question: "Que funcion calcula el promedio?",
    options: ["=PROMEDIO()", "=SUMA()", "=CONTAR()"],
    answer: "=PROMEDIO()",
    code: "1",
    hint: "La palabra de la funcion coincide con lo que quieres calcular."
  },
  {
    section: "Seccion 4",
    title: "Mision 4: Base de Datos",
    scenario: "La base de datos esta organizada en columnas verticales.",
    question: "Que funcion busca datos en tabla vertical?",
    options: ["=BUSCARV()", "=MAX()", "=SI()"],
    answer: "=BUSCARV()",
    code: "9",
    hint: "La V significa vertical."
  },
  {
    section: "Seccion 5",
    title: "Mision 5: Mensaje Encriptado",
    scenario: "Palabra interceptada: SEGURIDAD.",
    question: "Que funcion cuenta caracteres?",
    options: ["=LARGO()", "=CONTAR()", "=IZQUIERDA()"],
    answer: "=LARGO()",
    code: "4",
    hint: "Para saber cuantos caracteres tiene un texto, mide su largo."
  },
  {
    section: "Seccion 6",
    title: "Mision 6: Camaras de Seguridad",
    scenario: "Datos de las camaras: 2, 5, 3, 4.",
    question: "Que funcion encuentra el valor mayor?",
    options: ["=MAX()", "=MIN()", "=PROMEDIO()"],
    answer: "=MAX()",
    code: "6",
    hint: "El mayor valor es el maximo."
  },
  {
    section: "Seccion 7",
    title: "Mision 7: Puerta Biometrica",
    scenario: "La puerta solo acepta una funcion que cuente celdas numericas.",
    question: "Que funcion cuenta celdas numericas?",
    options: ["=CONTAR()", "=SI()", "=SUMA()"],
    answer: "=CONTAR()",
    code: "8",
    hint: "Contar valores numericos no es lo mismo que sumarlos."
  },
  {
    section: "Seccion 8",
    title: "Mision 8: Inteligencia Artificial",
    scenario: "La IA necesita decidir que hacer segun una condicion logica.",
    question: "Que funcion permite condicion logica?",
    options: ["=SI()", "=BUSCARV()", "=LARGO()"],
    answer: "=SI()",
    code: "2",
    hint: "Esta funcion responde algo si la condicion se cumple."
  },
  {
    section: "Seccion 9",
    title: "Mision 9: Satelite de Rastreo",
    scenario: "El satelite detecta el numero 9,6 y debe convertirlo a entero.",
    question: "Que formula redondea 9,6 a entero?",
    options: ["=REDONDEAR(9,6,0)", "=SUMA(9,6)", "=PROMEDIO()"],
    answer: "=REDONDEAR(9,6,0)",
    code: "5",
    hint: "La funcion debe redondear y usar 0 decimales."
  },
  {
    section: "Seccion 10",
    title: "Mision 10: Autor del Ataque",
    scenario: "Pistas: el usuario empieza por HACK y entro al sistema principal.",
    question: "Quien fue?",
    options: ["Profesor", "Hacker externo", "Bibliotecario", "Estudiante nuevo"],
    answer: "Hacker externo",
    code: "0",
    hint: "La pista HACK apunta al atacante externo."
  }
];

const masterKey = "7319468250";
const totalSeconds = 30 * 60;

const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");
const playAgainBtn = document.querySelector("#playAgainBtn");
const hintBtn = document.querySelector("#hintBtn");
const nextBtn = document.querySelector("#nextBtn");
const unlockBtn = document.querySelector("#unlockBtn");
const gamePanel = document.querySelector("#gamePanel");
const victoryPanel = document.querySelector("#victoryPanel");
const missionTitle = document.querySelector("#missionTitle");
const sectionLabel = document.querySelector("#sectionLabel");
const missionStatus = document.querySelector("#missionStatus");
const questionText = document.querySelector("#questionText");
const scenarioText = document.querySelector("#scenarioText");
const options = document.querySelector("#options");
const hintText = document.querySelector("#hintText");
const message = document.querySelector("#message");
const timer = document.querySelector("#timer");
const progressText = document.querySelector("#progressText");
const codeSlots = document.querySelector("#codeSlots");
const finalAnswer = document.querySelector("#finalAnswer");
const masterKeyInput = document.querySelector("#masterKey");

let currentIndex = 0;
let solvedCodes = [];
let secondsLeft = totalSeconds;
let intervalId = null;
let running = false;

function initializeSlots() {
  codeSlots.innerHTML = "";
  missions.forEach((_, index) => {
    const slot = document.createElement("span");
    slot.textContent = index + 1;
    codeSlots.appendChild(slot);
  });
}

function startGame() {
  running = true;
  currentIndex = 0;
  solvedCodes = [];
  secondsLeft = totalSeconds;
  victoryPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  setControlsDisabled(false);
  initializeSlots();
  renderMission();
  updateTimer();
  updateProgress();
  setMessage("Alerta roja activada. Resuelve las 10 misiones de Excel.");
  window.clearInterval(intervalId);
  intervalId = window.setInterval(tick, 1000);
}

function resetGame() {
  window.clearInterval(intervalId);
  intervalId = null;
  running = false;
  currentIndex = 0;
  solvedCodes = [];
  secondsLeft = totalSeconds;
  victoryPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  setControlsDisabled(false);
  initializeSlots();
  renderMission();
  updateTimer();
  updateProgress();
  setMessage("Pulsa iniciar mision para comenzar.");
  nextBtn.disabled = true;
}

function setControlsDisabled(disabled) {
  document.querySelectorAll(".option-btn, #hintBtn, #nextBtn, #unlockBtn, #masterKey").forEach((control) => {
    control.disabled = disabled;
  });
}

function tick() {
  secondsLeft -= 1;
  updateTimer();

  if (secondsLeft <= 0) {
    window.clearInterval(intervalId);
    running = false;
    setControlsDisabled(true);
    setMessage("Tiempo agotado. El sistema sigue bloqueado.");
  }
}

function updateTimer() {
  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");
  timer.textContent = `${minutes}:${seconds}`;
}

function updateProgress() {
  progressText.textContent = `${solvedCodes.length}/10 misiones`;
  [...codeSlots.children].forEach((slot, index) => {
    if (solvedCodes[index]) {
      slot.textContent = solvedCodes[index];
      slot.classList.add("filled");
    } else {
      slot.textContent = index + 1;
      slot.classList.remove("filled");
    }
  });
}

function renderMission() {
  const mission = missions[currentIndex];
  const finalMode = currentIndex >= missions.length;

  finalAnswer.classList.toggle("hidden", !finalMode);
  options.classList.toggle("hidden", finalMode);
  nextBtn.disabled = true;
  masterKeyInput.value = "";

  if (finalMode) {
    missionTitle.textContent = "Restaurar Sistema";
    sectionLabel.textContent = "Seccion final";
    missionStatus.textContent = "Clave maestra requerida";
    missionStatus.classList.remove("open");
    questionText.textContent = "Introduce la clave maestra con los codigos recuperados.";
    scenarioText.textContent = "Ordena los diez digitos obtenidos en las misiones para recuperar la base de datos.";
    hintText.textContent = "La clave se forma en el mismo orden de las misiones.";
    setMessage("Introduce la clave maestra para desbloquear el sistema.");
    return;
  }

  missionTitle.textContent = mission.title;
  sectionLabel.textContent = mission.section;
  missionStatus.textContent = "Sistema bloqueado";
  missionStatus.classList.remove("open");
  questionText.textContent = mission.question;
  scenarioText.textContent = mission.scenario;
  hintText.textContent = "Lee la pregunta y elige la funcion correcta.";
  options.innerHTML = "";

  mission.options.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(button, choice));
    options.appendChild(button);
  });
}

function checkAnswer(button, choice) {
  if (!running) {
    setMessage("Pulsa iniciar mision para activar el temporizador.");
    return;
  }

  const mission = missions[currentIndex];
  const buttons = [...options.querySelectorAll("button")];

  if (choice === mission.answer) {
    button.classList.add("correct");
    buttons.forEach((item) => item.disabled = true);
    solvedCodes.push(mission.code);
    missionStatus.textContent = `Codigo obtenido: ${mission.code}`;
    missionStatus.classList.add("open");
    nextBtn.disabled = false;
    setMessage(`Correcto. Codigo obtenido: ${mission.code}`);
    updateProgress();
  } else {
    button.classList.add("wrong");
    shakeCard();
    setMessage("Respuesta incorrecta. Revisa la pista y prueba otra vez.");
    window.setTimeout(() => button.classList.remove("wrong"), 550);
  }
}

function goNext() {
  if (currentIndex < missions.length) {
    currentIndex += 1;
    renderMission();
  }
}

function showHint() {
  if (currentIndex >= missions.length) {
    hintText.textContent = "Une los codigos tal como aparecen en el panel.";
    return;
  }

  hintText.textContent = missions[currentIndex].hint;
}

function unlockSystem() {
  if (masterKeyInput.value.trim() === masterKey) {
    window.clearInterval(intervalId);
    running = false;
    gamePanel.classList.add("hidden");
    victoryPanel.classList.remove("hidden");
  } else {
    shakeCard();
    setMessage("Codigo incorrecto. El sistema sigue bloqueado.");
  }
}

function setMessage(text) {
  message.textContent = text;
}

function shakeCard() {
  const card = document.querySelector(".mission-card");
  card.classList.remove("shake");
  void card.offsetWidth;
  card.classList.add("shake");
}

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", startGame);
hintBtn.addEventListener("click", showHint);
nextBtn.addEventListener("click", goNext);
unlockBtn.addEventListener("click", unlockSystem);
masterKeyInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    unlockSystem();
  }
});

initializeSlots();
renderMission();
updateTimer();
updateProgress();
