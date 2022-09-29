'use strict'
import Game from './game.js';
import PopUp from './popup.js'

const op_startBtn = document.querySelector(".op_startBtn");
const start = document.querySelector(".start");
const opening = document.querySelector(".opening");

op_startBtn.addEventListener('click',()=>{
    start.classList.remove('hide');
    opening.classList.add('hide');
    const PopupMessage = new PopUp();
    // game(팝업창, 개수, 시간초)
    const game = new Game(PopupMessage,20,10);
});

