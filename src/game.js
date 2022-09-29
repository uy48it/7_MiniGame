'use strict'

// 타이머 관련 함수를 만들었으면 좋겠음
// 여기도 JS 나눴으면 좋겠음
// 
export default class Game{
    constructor(PopupMessage,count,time){
        this.PopupMessage = PopupMessage
        this.PopupMessage.setClickListener(() => {
            this.gamestart(this.time);
        });
        this.score = 0;
        this.timeSec = 0;
        this.timerF;
        
        this.gamestage = document.querySelector(".gamestage");
        this.startmsg = document.querySelector(".start");
        this.scoremsg = document.querySelector("#score");
        this.timer = document.querySelector("#timer");
        
        //버튼 이벤트
        this.pauseBtn = document.querySelector("#pause");
        this.pauseBtn.addEventListener('click',() => {
            this.pauseGame();
        });
        this.pause = 0;

        this.StartBtn = document.querySelector("#start__btn");
        this.StartBtn.addEventListener('click', () => {
            this.gamestart(this.time);
        });


        // 사용자 입력 게임값
        this.count = count;
        this.time = time;
    }


    makeImg(Cname, Spath) {
        // 1. 이미지 생성
        const img = document.createElement('img');

        img.setAttribute('class',Cname);
        img.setAttribute('src', Spath);
    
        //2.이미지 배치
        const Wmax = this.gamestage.clientWidth*0.95;
        const Hmax = this.gamestage.clientHeight*0.9;   
        const W = Math.random() * Wmax;
        const H = Math.random() * Hmax;
        img.style.transform = `translate(${W}px,${H}px)`;
    
        this.gamestage.append(img);
    }
    
    //여러개 이미지 그리기
    drawImg(Cname, Sadress,num){
        for(num ; num > 0 ; num--){
            this.makeImg(Cname,Sadress);
        }
    }

    gamestart(t) {
        this.score = 0;
        this.scoremsg.innerHTML = this.score;
        //start 창 안보이게
        this.startmsg.classList.add('hide');
    
        // 벌레 & 당근 추가
        this.delImg();
        this.drawImg("cherry", "img/cherry.png",this.count);
        this.drawImg("enemy_1", "img/enemy_1.png",this.count/2);
        this.drawImg("enemy_2", "img/enemy_2.png",this.count/2);
    
        // 타이머가 가게 할거고 0이되면 모든 동작 멈추고 GameOver 동작
        this.timeSec = t;
        this.timer.innerHTML = `0:${this.timeSec}`;
        this.timeSec--;
        this.timerF = setInterval(()=>{
            timer.innerHTML = `0:${this.timeSec}`;
            this.timeSec--;    
            // 타임아웃시?
            if (this.timeSec < 0) { 
                clearInterval(this.timerF); 
                this.gameoverFunc();
            }
        },1000);
        // 벌레 & 당근 클릭 수에 맞춰서 Score를 나타낼거야
        // 그리고 클릭하면 사라지게 할거야!
        this.setScore(this.score);    
    }
    
    // 점수 함수
    setScore(score) {
        document.addEventListener('click',(e)=>{
            if(e.target.tagName == 'IMG'){
                if (e.target.className == 'enemy_1' || e.target.className == 'enemy_2' ) {
                    this.score = 0;
                    clearInterval(this.timerF);        
                    this.gameoverFunc();        
                } else if (e.target.className == 'cherry') {
                    e.target.classList.add('hide');
                    // carrot_audio.play();
                    ++this.score;
                    this.scoremsg.innerHTML = this.score;
                    if(this.score == this.count) {
                        this.score = 0;
                        clearInterval(this.timerF);
                        this.gameClear();
                        return;
                    }
                }
            }
        });
    }

    // 일시정지
    // 재시작 버튼으로 바꾸기
    pauseGame(){
        if (this.pause == 0) {
            clearInterval(this.timerF); 
            this.pause = 1;
            this.gamestage.classList.add('disabled');
        } else if (this.pause == 1) {
            this.gamestage.classList.remove('disabled');
            this.timerF = setInterval(()=>{
                timer.innerHTML = `0:${this.timeSec}`;
                this.timeSec--;    
                // 타임아웃시?
                if (this.timeSec < 0) { 
                    clearInterval(this.timerF); 
                    this.gameoverFunc();
                }
            },1000);
            this.pause = 0;
        }
    }
    
    

    gameoverFunc() {
        this.PopupMessage.setText("Game Over!");
        this.PopupMessage.hide_remove();
    
        this.delImg();
    }

    // GameClear()
    gameClear(){
        this.PopupMessage.setText("Game Clear!");
        this.PopupMessage.hide_remove();
        
        this.delImg();
    }      

    delImg() {
        const imgs = document.querySelectorAll("img");
        imgs.forEach(img=>{
            this.gamestage.removeChild(img);
        });
    }
}