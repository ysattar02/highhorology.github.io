const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const tickType = document.getElementById('tick-type');

let intervalId;

function setDate(){
    const now = new Date();
    const tickTypeValue = parseInt(tickType.value, 10);  
    console.log(tickTypeValue);
    
    let seconds;
    if (tickTypeValue === 1000){
        seconds = now.getSeconds();
    }
    else{
        seconds = now.getSeconds() + (now.getMilliseconds() / 1000);
    }
    const minutes = now.getMinutes();
    const hours = now.getHours();
    
    const secondsDegrees = seconds * 6;
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;

    console.log(secondsDegrees);
    
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    
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