document.addEventListener('DOMContentLoaded', function() {
  const timerDisplay = document.getElementById('timer-text');
  const startButton = document.getElementById('start-btn');
  const circle = document.getElementById('timer');
  const innerCircle = document.getElementById('inner-timer');

  let timeLeft = 10; // Cambiado a 10 segundos
  let timerInterval;
  let outerCircleAnimationFrameId;
  let animationStartTime;

  function startTimer() {
    timerInterval = setInterval(countdown, 1000);
    startOuterCircleAnimation(); // Iniciar la animación del círculo exterior al mismo tiempo que la cuenta atrás
  }

  function countdown() {
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      startPulseAndRedAnimation(); // Iniciar las animaciones de pulso y cambio de color del círculo una vez que la cuenta atrás ha finalizado
      return;
    }
    timeLeft--;
    updateTimerDisplay();
    updateOuterCircleAnimation(); // Actualizar la animación del círculo exterior en cada intervalo de cuenta atrás
  }

  function startOuterCircleAnimation() {
    circle.style.backgroundImage = 'conic-gradient(green 0deg, green 0deg)'; // Reiniciar el color del círculo exterior
    animationStartTime = Date.now();
    outerCircleAnimationFrameId = requestAnimationFrame(updateOuterCircleAnimation);
  }

  function updateOuterCircleAnimation() {
    const elapsedTime = Date.now() - animationStartTime;
    const progress = elapsedTime / 10000; // 10000 milisegundos = 10 segundos
    const angle = 360 * progress;

    if (progress >= 1) {
      circle.style.backgroundImage = 'conic-gradient(green 0deg, green 0deg)'; // Reiniciar el color del círculo exterior
      return;
    }

    circle.style.backgroundImage = `conic-gradient(green ${angle}deg, red 0deg)`;
    outerCircleAnimationFrameId = requestAnimationFrame(updateOuterCircleAnimation);
  }

  function startPulseAndRedAnimation() {
    innerCircle.style.animationName = 'pulse';
    innerCircle.style.animationDuration = '1s';
    innerCircle.style.animationFillMode = 'forwards';

    circle.style.animationName = 'reverse-green-fill';
    circle.style.animationDuration = '1s';
    circle.style.animationFillMode = 'forwards';
    circle.style.animationTimingFunction = 'ease-out'; // Efecto "ease-out"

    innerCircle.addEventListener('animationend', function() {
      circle.style.backgroundImage = 'conic-gradient(red 0deg, red 0deg)'; // Cambiar el círculo exterior a rojo al finalizar la animación
      setTimeout(() => {
        resetTimer();
      }, 1000);
    }, { once: true }); // Asegurarse de que el evento solo se ejecute una vez
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    cancelAnimationFrame(outerCircleAnimationFrameId); // Detener la animación del círculo exterior
    timeLeft = 10; // Reiniciar el temporizador a 10 segundos
    updateTimerDisplay();
    startButton.disabled = false; // Habilitar el botón después de que finalice la cuenta atrás
  }

  function padZero(num) {
    return (num < 10 ? '0' : '') + num;
  }

  startButton.addEventListener('click', function() {
    startButton.disabled = true; // Deshabilitar el botón mientras se ejecuta la cuenta atrás
    resetTimer(); // Reiniciar todo antes de iniciar
    startTimer();
  });
});
