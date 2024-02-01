var WORDS = ["example", "keyboard", "long", "challenge", "speed", "test", "region", "road",
    "apple", "banana", "chocolate", "elephant", "giraffe", "umbrella", "mountain", "computer",
    "joy", "development", "ocean", "penguin", "sunshine", "moonlight", "star", "galaxy",
    "happiness", "optimism", "inspiration", "journey", "laughter", "island", "robot", "creative",
    "solution", "strategy", "innovation", "imagination", "network", "database", "ice-cream", "science",
    "knowledge", "discovery", "fantasy", "synergy", "technology", "progress", "communication", "unity"];

var elapsed = 0;
var words = [];
var charSumNet = 0;
var charSumGross = 0;
var peak = Number.NEGATIVE_INFINITY; 
var inputWord = document.getElementById("input-word");
var startButton = document.getElementById("startButton");
var gameInterval;

var labelElapsedTime = document.getElementById("labelElapsedTime");
var labelAverageWpm = document.getElementById("labelAverageWpm");
var labelPeakWpm = document.getElementById("labelPeakWpm");
var labelCpm = document.getElementById("labelCpm");
var labelAccuracy = document.getElementById("labelAccuracy");
var labelWord0 = document.getElementById("labelWord0");

function updateUI() {
    inputWord.disabled = !active;
    labelElapsedTime.innerText = `${elapsed} s`;
    labelAverageWpm.innerText = `${wpmNet()} wpm (Average)`;
    labelPeakWpm.innerText = `${peak} wpm (Peak)`;
    labelCpm.innerText = `${cpmNet()} cpm`;
    labelAccuracy.innerText = `${accuracy()} %`;
    labelWord0.innerText = words.length > 0 ? words[0] : '';
}
function generateWord() {
    var w = WORDS[Math.floor(Math.random() * WORDS.length)];
    words = [w];
    updateUI();
}
function countCorrectChar(w, s) {
    return Array.from(w).reduce((acc, char, i) => (char === s[i] ? acc + 1 : acc), 0);
}
function check() {
    if (inputWord.value.endsWith(' ')) {
        charSumGross += inputWord.value.length;
        charSumNet += countCorrectChar(words[0], inputWord.value.trim());
        generateWord();
        inputWord.value = '';
    }
}
function cpmNet() {
    return Math.round(charSumNet / (elapsed / 60));
}
function wpmNet() {
    var wpm = Math.round((charSumNet /5) / (elapsed / 60) / 5);
    peak = (wpm > peak) ? wpm : peak;
    return wpm;
}
function accuracy() {
    return Math.round((charSumNet / charSumGross) * 100);
}
var active = false;
function startGame() {
    if (!active) {
        elapsed = 0;
        words = [];
        charSumNet = 0;
        charSumGross = 0;
        peak = 0;
        inputWord.value = '';
        active = true;
        inputWord.disabled = false;
        startButton.disabled = true;

        generateWord();

        gameInterval = setInterval(function () {
            elapsed++;
            updateUI();

            if (elapsed === 60) {
                clearInterval(gameInterval);
                active = false;
                startButton.disabled = false;
                words = [];
                updateUI();
            }
        }, 1000);
    }
}
