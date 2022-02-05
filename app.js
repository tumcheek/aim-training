const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#e3291b','#edb832','#afed32','#2be31e','#46dbb9','#186fd9','#6505ff','#fc0aa4','#fc0a12'];
let timerId = null;
let score =0;
let time = 0;
startBtn.addEventListener('click',(event)=>{
event.preventDefault();
screens[0].classList.add('up');
})

timeList.addEventListener('click',event =>{
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click',event=>{
    if(event.target.classList.contains('circle')){
        score++;
        event.target.remove();
        createRandomCircle();
    }else if(event.target.classList.contains('repeat')){
        clearInterval(timerId);
        screens[1].classList.remove('up');
        board.innerHTML='';
        
        score=0;    
        timeEl.parentNode.classList.remove('hide'); 
    }})



function startGame(){
    timerId = setInterval(decreaseTime,1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime(){
    if(time === 0){
        finishGame();
    }else{
        let current = --time;
        if(current<10){
            current = `0${current}`
        }
        setTime(current)
    }
    
}

function setTime(value){
    timeEl.innerHTML=`00:${value}`;  
}

function finishGame(){
    timeEl.parentNode.classList.add('hide');
    board.innerHTML=`<h1 style='flex-basis:100%'>Счет: <span class='primary'>${score}</span></h1> <button class='repeat' type='button'>Сыграть еще</button>`
}

function createRandomCircle(){
    const circle = document.createElement('div');
    const size =getRandomNumber(10,60);
    const {width,height} = board.getBoundingClientRect();
    const x = getRandomNumber(0,width-size);
    const y = getRandomNumber(0,height-size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top= `${y}px`;
    circle.style.left= `${x}px`;
    circle.style.background=getRandomColor();
    board.append(circle)
}

function getRandomNumber(min,max){
   return Math.round(Math.random() * (max-min) + min)

}

function getRandomColor(){
    return colors[Math.floor(Math.random()*(colors.length-1))];
}