let arr = ['+', '-', '/', '*'];
let hishtory = [];


let mainElement1 = document.querySelector('.main_span1') ;
let mainElement2 = document.querySelector('.main_span2');
let inputElement = document.querySelector('.mainInput');
let mathIcon = document.querySelector('.calculation');
let scoreElement = document.querySelector('.score');
let submitButton = document.querySelector('.submit');
let timerElement = document.querySelector('.timer');
let highScoreElement = document.querySelector('.HighScore');
let resetHighScore = document.querySelector('.reset-high-score');







let solution;
let point = 0;
let timeInterval;
let timeLeft;
let highScore;








onload()
 
function onload() {
    mainHighScore();
    generateQuection();
    buttonWork();
   // timeSlap();
    startTimer();
    
    
}

function generateQuection() {

    let random1 =Math.floor(Math.random()*100);
let random2=Math.floor(Math.random()*100);
let random3=Math.floor(Math.random()*arr.length);

let mainMath = arr[random3];

mainElement1.innerText = random1;
mainElement2.innerText = random2;
mathIcon.innerText = mainMath;


 
if(random3===0) {
    solution = Math.round( random1 + random2);
}else if (random3===1) {
    solution = Math.round(random1 - random2);
}else if (random3===2) {
    solution = Math.round( random1 / random2);
}else {
    solution = Math.round( random1 * random2);
}
console.log(solution);

}



function checkAnswer() {

let userAnswer=Number(inputElement.value.trim());
if(Number(inputElement.value.trim()) === "") return;

let quection = mainElement1.innerText + " " + mathIcon.innerText + " " + mainElement2.innerText;

 let correct = Number(userAnswer) === solution;
 
  let attempt = {
    quection: quection,
    userAnswer: userAnswer,
    correct: correct,
   }
   hishtory.push(attempt);

   if(hishtory.length > 5){
     hishtory.shift();
   }

 

   if(correct)
   {
      point++;
   }
   else{
     point--;
   }
   inputElement.value = '';
   displayScore();
   updateHighScore();
   generateQuection();
   renderHishtory()

}
console.log(hishtory)

function renderHishtory() {
    let box = document.querySelector('.hishtory-box');
    box.innerHTML = "";
   

    for (let i=0; i<hishtory.length; i++){
        let item = hishtory[i];
        let line = document.createElement('div')
        let symbol = item.correct ? "✔️" : "❌";

        line.textContent = symbol + " " + item.quection + " = " + item.userAnswer
        
        box.appendChild(line);
     }
}
function buttonWork() {
submitButton.addEventListener('click', checkAnswer);

 inputElement.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        checkAnswer();
    }
    
    
 })
}
//function timeSlap() {
   // setInterval(generateQuection, 15000)
//}

function displayScore(){
     scoreElement.textContent = 'Score:'+ point;
    
}

function startTimer() {
    clearInterval(timeInterval);
    timeLeft = 15;

    timerElement.textContent = `Time: ${timeLeft}`;

    timeInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}`;

        if(timeLeft === 0){
            clearInterval(timeInterval);
           // point--;
            displayScore();
            generateQuection();
            startTimer();
        }
    },1000);
}




function updateHighScore() {
    if(point > highScore){
        highScore = point;

        localStorage.setItem("highScore", JSON.stringify(highScore));

         highScoreElement.textContent = `HighScore = ${highScore}`;
    }
}

function mainHighScore() {
   let savedScore= localStorage.getItem('highScore');
     if(savedScore !== null){
        highScore= JSON.parse(savedScore);
     }else{
        highScore = 0
     }

    highScoreElement.textContent = `HighScore = ${highScore}`;

    }
    function resetingHighScore() {
     localStorage.removeItem('highScore')
     highScore=0;
     highScoreElement.textContent = `HighScore = ${highScore}`;
     
    }
    
     resetHighScore.addEventListener('click', resetingHighScore);
    

    

    

    

    










