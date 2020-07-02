init();

function init() {
  resetValues();

  const magicSound = document.getElementById('magic-sound');
  let timerDisplay = document.querySelector('.timer');
  const startBtn = document.getElementById('start');
  const resetBtn = document.getElementById('reset');
  let clock;

  startBtn.addEventListener('click', setTime);
  resetBtn.addEventListener('click', stopTimer);

  //Check if inputs are empty
  function inputsEmpty(...inputs) {
    for (const value of inputs) {
      if (value.length > 0) return false;
    }

    return true;
  }

  //Convert time to seconds
  function returnSeconds(hrs, mins, secs) {
    let seconds = 0;

    if ( !isNaN(Number(hrs)) ) seconds += Number(hrs * 60 * 60);
    if ( !isNaN(Number(mins)) ) seconds += Number(mins * 60);
    if ( !isNaN(Number(secs)) ) seconds += Number(secs);

    return seconds;
  }

  //Configure and start timer
  function setTime() {
    const secondsInput = document.getElementById('seconds').value;
    const minutesInput = document.getElementById('minutes').value;
    const hoursInput = document.getElementById('hours').value;

    if ( inputsEmpty(secondsInput, minutesInput, hoursInput) ) {
      return;
    }

    let durationSeconds = returnSeconds(hoursInput, minutesInput, secondsInput);
    startTimer(durationSeconds, timerDisplay)
    resetValues();
  }

  //Reset
  function resetValues() {
    document.getElementById('seconds').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('hours').value = '';
  }

  function stopTimer() {
    clearInterval(clock);
    timerDisplay.textContent = '0:00:00';
    resetValues();
    startBtn.addEventListener('click', setTime);
  }

  //Timer function
  function startTimer(duration, display) {
    //Disable button
    startBtn.removeEventListener('click', setTime);

    let timer = duration;
    let hours, minutes, seconds;

    clock = setInterval(() => {

      hours = parseInt(timer / 60 / 60, 10);
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      if (hours > 0) {
        minutes -= hours * 60;
      }

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = hours + ':' + minutes + ':' + seconds;

      if (--timer < 0) {
        clearInterval(clock);
        magicSound.play();

        //Enable button
        startBtn.addEventListener('click', setTime);
      }
    }, 1000);
  }
}