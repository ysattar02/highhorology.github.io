function index_goToAboutMe(){
    window.location.href = "html/about_me.html";
}

function index_goToSOTC(){
    window.location.href = "html/SOTC.html";
}

function index_openSideNav() {
  document.getElementById("mySideNav").style.width = "100%";
}

function index_closeSideNav() {
  document.getElementById("mySideNav").style.width = "0%";
}

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const tickType = document.getElementById('tick-type');

let intervalId;

function setDate(){
    const now = new Date();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    const minutes = now.getMinutes();
    const hours = now.getHours();
    console.log(hours);
    
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
//    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
    
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
//    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    
    //call to highlight current hour
    highlightCurrentHour(hours % 12);
}

function highlightCurrentHour(currentHour) {
    const allHours = document.querySelectorAll('.number');
    allHours.forEach(hour => hour.classList.remove('highlight'));
    const hourId = `hour${currentHour === 0 ? 12 : currentHour}`;
    const currentHourElement = document.getElementById(hourId);
    if (currentHourElement){
        currentHourElement.classList.add('highlight');
    }
}

function startClock(){
    const interval = parseInt(tickType.value, 10);
    
    if (intervalId){
        clearInterval(intervalId);
    }
    intervalId = setInterval(setDate, interval);
    setDate();
}

//init calls
startClock();
tickType.addEventListener('change', startClock);