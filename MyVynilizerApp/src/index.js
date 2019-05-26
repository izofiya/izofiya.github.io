let plate = document.getElementById("img1");
let startButton = document.getElementById("startButton");
let myAudio = document.getElementById("myAudio");
let divInfo = document.getElementById("info");
let selectAudio = document.getElementById("audioList");
let spanTextOfTrack = document.getElementById("spanTextOfTrack");
let char1 = document.getElementById("char1");
let optionClass = document.querySelectorAll("li");
let arrOfOptions = Array.from(optionClass);
let deg = 0;
let time;
let timer_is_on = 0;
let arrTracks = ["audio/bruno.mp3", "audio/dzhios.mp3", "audio/moonligh.mp3", "audio/youngistaan.mp3"];

function funcCurrentTime() {
  divInfo.innerHTML = "Track time: " + (myAudio.currentTime.toFixed(2));
}

function getSelectAudio(arr) {
  for(let i = 0; i < arr.length; i++) {
    var liElement = document.createElement("li");
    liElement.className = "liClass";
    liElement.textContent = arr[i];
    liElement.addEventListener('click', function (e) {
      getSrcForAudio(e.target.textContent);
      clearTimeout(time);
      timer_is_on = 0;
      spanTextOfTrack.innerHTML = e.target.textContent;
    });
    selectAudio.appendChild(liElement);
  }
  return selectAudio;
}

function transformRotate() {
    if(deg > 359) {
        deg = 0;
    }
  plate.style.transform = "rotate(" + deg + "deg)";
  spanTextOfTrack.style.transform = "rotate(" + deg + "deg)";
  deg += 1;
  time = setTimeout(transformRotate, 40);
}

startButton.addEventListener("click", function() {
    if (!timer_is_on) {
        timer_is_on = 1;
        transformRotate();
        myAudio.play();
      } else if(timer_is_on === 1) {
        clearTimeout(time);
        timer_is_on = 0;
        myAudio.pause();
      } 
    });

function getSrcForAudio(audioSrc) {
  myAudio.src = audioSrc;
} 

function funcOnended() {
  clearTimeout(time);
  timer_is_on = 0;
}

spanTextOfTrack.innerHTML = arrTracks[0];
myAudio.onended = function() {funcOnended()};
getSelectAudio(arrTracks);
myAudio.ontimeupdate = function() {funcCurrentTime()};





//divInfo.innerHTML = myAudio.currentSrc; ссылку вытащить
// divInfo.innerHTML = myAudio.duration; получить точную длину (продолжительность) звука в секундах
// divInfo.innerHTML = myAudio.ended; Узнайте, закончился ли звук
// myAudio.muted = true; включить и выключить звук
// divInfo.innerHTML = myAudio.networkState; получить состояние сети аудио
// divInfo.innerHTML = myAudio.paused; возвращает информацию о приостановке звука.
// divInfo.innerHTML = myAudio.start(0) + " and " + myAudio.played.end(0);
// divInfo.innerHTML =  "Start: " + myAudio.played.start(0) + " End: " + myAudio.played.end(0); получить первый проигранный диапазон (часть) звука в секундах.
// disabled"|"hidden"|"showing"

