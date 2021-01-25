
// GRUMPY C(H)AT

// create images

let grumpyCatImg = document.createElement('img');
grumpyCatImg.src = 'images/grumpyCat.png';

let followerImg = document.createElement('img');
followerImg.src = 'images/follower.png';

let messageLeftImg = document.createElement('img');
messageLeftImg.src = 'images/mLNetflix.png';

let messageRightImg = document.createElement('img');
messageRightImg.src = 'images/mRMondays.png';

// create canvas & defaults

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let isLeftArrow = false;
let isRightArrow = false;
let isUpArrow = false;
let isDownArrow = false;
let isSpace = false;
let noScore = 0;
let startBtn = document.querySelector('#start');

// create sounds

let grumpyChatMoving = document.createElement('audio');
grumpyChatMoving.src = 'sounds/grumpyChatMoving.mp3';

// player size and position

let playerWidth = 100;
let playerHeight = playerWidth;
let playerY = 280 ;
let playerX = 350 - playerWidth/2;
let incrementPlayer = 1.5;
let ySpeed = 0; // the pixels you move in the y axis to jump
let gravity = 0.05  ;
let groundHeight = 280;
let jumpStrength = -4 ;


// player moves

// event listener keeps track of wich key is clicked
document.addEventListener('keydown', (event) => {
    if(event.keyCode == 39 || event.key == "ArrowRight"){
        //isLeftArrow = false;
        isRightArrow = true;
    }
    else if (event.keyCode == 37 || event.key == "ArrowLeft"){
        isLeftArrow = true;
        //isRightArrow = false;
    }

    if(event.keyCode == 38 || event.key == "ArrowUp"){
        //isUpArrow = false;
        isDownArrow = true;
    }
    else if (event.keyCode == 40 || event.key == "ArrowDown"){
        isUpArrow = true;
        //isDownArrow = false;
    }

    if((event.keyCode == 32 || event.key == "Space") && playerY == groundHeight){
        ySpeed = jumpStrength;        grumpyChatMoving.play();
    }
    
    console.log(event.key);
});


document.addEventListener('keyup', (event) => {
    isLeftArrow = false;
    isRightArrow = false;
    isUpArrow = false;
    isDownArrow = false;
});
 
// messages left size and position

// let mLeftWidth = messageLeftImg.width;
// let mLeftHeight = messageLeftImg.height;
// let mLeftY = 200;
// let mLeftX = 10;

let messagesLeftTimer = 100;
let messagesLeft = [];

// messages right size and position

// let mRightWidth = messageRightImg.width;
// let mRightHeight = messageRightImg.height;
// let mRightY = 250;
// let mRightX = 400;

let messagesRightTimer = 1;
let messagesRight = [];


// create random number for timer and store it in variable

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//draw images

function draw (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(grumpyCatImg, playerX, playerY, playerWidth, playerHeight); 
    ctx.drawImage(followerImg, 30, 30, playerWidth, playerHeight); 
    
    // message right
    // loop over messages draws them and moves them to the left

    for (let i = 0; i < messagesRight.length; i++){
        ctx.drawImage(messageRightImg, messagesRight[i].x, messagesRight[i].y); 
        messagesRight[i].x = messagesRight[i].x - 2; 
;
        // collision detection messages right and player

        if(playerX + 95 >= messagesRight[i].x && playerX <= messagesRight[i].x + messageRightImg.width && playerY <= messagesRight[i].y + messageRightImg.height && playerY + 95 >= messagesRight[i].y){
            ctx.font = '20px Verdana';
            ctx.fillText("Collision", 30, 30);
        }

        if(messagesRight[i].x == 0){
            noScore++ 
        }
    }

    // create random countdown to push messages 

    messagesRightTimer--;

    if(messagesRightTimer == 0){
        messagesRight.push({
            x: canvas.width, 
            y: 300
        });
        messagesRightTimer = getRandom(300,800);
    }

    // messages left

    // loop over messages draws them and moves them to the left

    for (let i = 0; i < messagesLeft.length; i++){
        ctx.drawImage(messageLeftImg, messagesLeft[i].x, messagesLeft[i].y); 

        messagesLeft[i].x = messagesLeft[i].x + 1;

        // collision detection messages and player

        if(playerX + 95 >= messagesLeft[i].x && playerX <= messagesLeft[i].x + messageLeftImg.width && playerY <= messagesLeft[i].y + messageLeftImg.height && playerY + 95 >= messagesLeft[i].y){
            ctx.font = '20px Verdana';
            ctx.fillText("Collision", 30, 30);
        }

        if(messagesLeft[i].x + messageLeftImg.width == 700){
            noScore++   
        }
    }

    // create random countdown to push messages 

    messagesLeftTimer = messagesLeftTimer - 0.5;

    if(messagesLeftTimer == 0){
        messagesLeft.push({
            x: 0, 
            y: 150
        });
        messagesLeftTimer = getRandom(300,800);
    }

    
    // move player left and right

    if (isRightArrow && (playerX + playerWidth < canvas.width)){
        playerX += incrementPlayer;
    }
    else if (isLeftArrow && (playerX > 0)){
        playerX -= incrementPlayer;
    }

    // move player up and down

    // if (isUpArrow && (playerY + playerHeight < canvas.height)){
    //     playerY += incrementPlayer;
    //     grumpyChatMoving.play();
    // }
    // else if (isDownArrow && (playerY > 0)){
    //     playerY -= incrementPlayer;
    // }

    // player jump (you don't see the affect until pressing space)
    if(playerY <= groundHeight){
    playerY += ySpeed;
    ySpeed += gravity;
    }

    if (playerY > groundHeight){
        ySpeed = 0;
        playerY = groundHeight;
    }

    // draw Highscore on screen
    ctx.font = '20px Verdana';
    ctx.fillText('NO-Score: '+ noScore, 500, 50);

    // just for developer to check thingsss
    // ctx.fillText('playerY: '+ playerY, 10, canvas.height - 20);
    // ctx.fillText('leftTimer: '+ messagesRightTimer, 10, canvas.height - 20);
    // ctx.fillText('rightTimer: '+ messagesLeftTimer, 10, canvas.height - 60);
    // ctx.fillText('rightTimer: '+ messagesLeftTimer, 10, canvas.height - 60);
}

// call draw function
draw();

// create interval

// window.addEventListener('load', () => {
//     intervalID = setInterval(() => {
//         requestAnimationFrame(draw)
//      }, 10)
// })

function startGame(){
    canvas.style.display = 'block'
    startBtn.style.display = 'none';
    intervalID = setInterval(() => {
    requestAnimationFrame(draw)
    }, 10)
}

// hides canvas
window.addEventListener('load', () => {
    canvas.style.display = 'none';

    startBtn.addEventListener('click', () => {
        startGame()
    })
    
})