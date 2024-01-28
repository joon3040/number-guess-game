//랜덤번호 지정
//유저가 번호를 입력한 후 go 라는 버튼을 누름
//만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다!
//랜덤 번호가 < 유저 번호 일 경우 DOWN!!! 표시
//랜덤 번호가 > 유저 번호 일 경우 UP!! 표시
// Reset버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 쓰면 게임이 끝난다. (더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 범위 밖에 숫자라고 알려주며 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 이미 입력한 숫자라고 알려주며 기회를 깎지 않는다.


let computerNum = 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")
let resetButton = document.getElementById("reset-button")
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history = []

playButton.addEventListener("click", play)
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function(){userInput.value=""})
//focus 이벤트에만 쓰이는 함수이므로 따로 함수 선언 후 불러오지 않고 바로 익명함수를 써서 메모리 절약을 하였다. 
function pickRandomNum(){
    computerNum = Math.floor(Math.random() * 100)+1;
    console.log("정답", computerNum )
}

function play(){
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultArea.textContent = "1과 100사이 숫자를 입력해 주세요" 
        //1과 100사이 범위의 숫자를 입력하지 않았을때 표시됨
        return; //어떠한 것도 return하지 않고 종료하므로 밑에 실행문들은 실행되지 않는다.
    }

    if(history.includes(userValue)){ 
        // includes 함수는 중복된 값이 있는지 판별하는 함수이다.
        resultArea.textContent = "이미 입력한 숫자입니다! 다른 숫자를 입력해 주세요~"
        return; //chance가 깎이지 않고 그대로 종료되게 만든다.
    }
    chances --;
    chanceArea.textContent = `남은기회:${chances}번`; //(``백틱은 동적인 값, ""는 정적인 값에 사용)
    console.log("chance", chances)
    if(userValue < computerNum){
        resultArea.textContent = "Up!!!"
    }else if(userValue > computerNum){
        resultArea.textContent = "DOWN!!!"
    }else {
        resultArea.textContent = "맞추셨습니다!!!"
        gameOver=true
    }

    history.push(userValue)
    console.log(history)

    if(chances < 1){
        gameOver=true
    }
    if (gameOver == true){
        playButton.disabled = true;
    }

}

function reset() {
    //user input 창이 깨끗하게 정리되고
    userInput.value = ""
    //새로운 번호가 생성되고
    pickRandomNum();
    resultArea.textContent = "결과값이 여기 나옵니다"
    chances = 5
    chanceArea.textContent = "남은기회:5번"; 
    playButton.disabled= false;
    gameOver=false;
    history = []
}

pickRandomNum()
