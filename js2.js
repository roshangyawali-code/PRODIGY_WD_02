let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = 'Pause';
    resetBtn.disabled = false;
    lapBtn.disabled = false;
    running = true;
}

function pauseStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startStopBtn.textContent = 'Start';
    running = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    running = false;
    lapCounter = 0;
    updateDisplay();
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapsList.innerHTML = '';
}

function updateDisplay() {
    if (running) {
        elapsedTime = Date.now() - startTime;
    }
    const time = new Date(elapsedTime);
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(time.getUTCMilliseconds() / 10)).padStart(2, '0');
    display.textContent = `${minutes}:${seconds}.${milliseconds}`;
}

function recordLap() {
    const lapTime = display.textContent;
    lapCounter++;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

startStopBtn.addEventListener('click', () => {
    if (running) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

// Initial display update to set the correct format
resetStopwatch();
