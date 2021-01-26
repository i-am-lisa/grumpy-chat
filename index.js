
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

let emojisImg = document.createElement('img');
emojisImg.src = 'images/like.png';

// create sounds

let grumpyChatMoving = document.createElement('audio');
grumpyChatMoving.src = 'sounds/grumpyChatMoving.mp3';

// create canvas & declare valiables

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
let restartBtn = document.querySelector('#restart');

// player size, position and moves
let playerWidth = 100;
let playerHeight = playerWidth;
let playerY = canvas.height + 200;
let playerX = canvas.width/2 - playerWidth/2;
let incrementPlayer = 1.5;
let ySpeed = 0; // the pixels you move in the y axis to jump
let gravity = 0.05;
let groundHeight = canvas.height - 150;
let jumpStrength = -5;

// messages 
let messagesLeftTimer = 100;
let messagesLeft = []; 
let messagesRightTimer = 1;
let messagesRight = [];
let emojis = [];
let emojisTimer = 5;


// create random number for timer and store it in variable

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


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
        ySpeed = jumpStrength;        
        grumpyChatMoving.play();
    }
    
    console.log(event.key);
});

document.addEventListener('keyup', (event) => {
    isLeftArrow = false;
    isRightArrow = false;
    isUpArrow = false;
    isDownArrow = false;
});
 


//draw images

function draw (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(grumpyCatImg, playerX, playerY, playerWidth, playerHeight); 
    ctx.drawImage(followerImg, 30, 30, playerWidth, playerHeight); 
    
    // message right
    // loop over messages draws them and moves them to the left

    for (let i = 0; i < messagesRight.length; i++){
        ctx.drawImage(messageRightImg, messagesRight[i].x, messagesRight[i].y); 
        messagesRight[i].x = messagesRight[i].x - 1; 

        // collision detection messages right and player

        if(playerX + 95 >= messagesRight[i].x && playerX <= messagesRight[i].x + messageRightImg.width && playerY <= messagesRight[i].y + messageRightImg.height && playerY + 95 >= messagesRight[i].y){
            ctx.font = '20px Verdana';
            ctx.fillText("COLLISION!!!", 30, 160);
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
            y: groundHeight + 50
        });
        messagesRightTimer = getRandom(300,1200);
    }

    // messages left

    // loop over messages draws them and moves them to the right

    for (let i = 0; i < messagesLeft.length; i++){
        ctx.drawImage(messageLeftImg, messagesLeft[i].x, messagesLeft[i].y); 

        messagesLeft[i].x = messagesLeft[i].x + 0.8;

        // collision detection messages and player

        if(playerX + 95 >= messagesLeft[i].x && playerX <= messagesLeft[i].x + messageLeftImg.width && playerY <= messagesLeft[i].y + messageLeftImg.height && playerY + 95 >= messagesLeft[i].y){
            clearInterval(intervalID);
            // This is only for explanations:
            gameOver() 
        }

        if(messagesLeft[i].x + messageLeftImg.width == 700){
            noScore++   
        }
    }

    // create random countdown to push messages 

    messagesLeftTimer = messagesLeftTimer - 0.5;

    if(messagesLeftTimer == 0){
        messagesLeft.push({
            x: 0 - messageLeftImg.width, 
            y: canvas.height - 400
        });
        messagesLeftTimer = getRandom(600,1200);
    }

    // emojis

    // loop over messages draws them and moves them to the right

    for (let i = 0; i < emojis.length; i++){
        ctx.drawImage(emojisImg, emojis[i].x, emojis[i].y); 

        emojis[i].x = emojis[i].x + 0.2;

        // collision detection messages and player

        if(playerX + 95 >= emojis[i].x && playerX <= emojis[i].x + emojisImg.width && playerY <= emojis[i].y + emojisImg.height && playerY + 95 >= emojis[i].y){
            // clearInterval(intervalID);
            // // This is only for explanations:
            // gameOver() 
        }

        if(emojis[i].x + emojisImg.width == canvas.width){
            noScore++   
        }
    }

    // create random countdown to push emojis

    emojisTimer = emojisTimer - 0.5;

    if(emojisTimer == 0){
        emojis.push({
            x: 0 - emojisImg.width, 
            y: canvas.height - 230
        });
        emojisTimer = getRandom(1000,1200);
    }


    
    // move player left and right

    if (isRightArrow && (playerX + playerWidth < canvas.width)){
        playerX += incrementPlayer;
    }
    else if (isLeftArrow && (playerX > 0)){
        playerX -= incrementPlayer;
    }


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
    ctx.fillText('NO-Score: '+ noScore, 1000, 50);

    // just for developer to check thingsss
    // ctx.fillText('playerY: '+ playerY, 10, canvas.height - 20);
    // ctx.fillText('leftTimer: '+ messagesRightTimer, 10, canvas.height - 20);
    // ctx.fillText('rightTimer: '+ messagesLeftTimer, 10, canvas.height - 60);
    // ctx.fillText('rightTimer: '+ messagesLeftTimer, 10, canvas.height - 60);
}

// call draw function
draw();

// game over function

function gameOver(){
    endScreen.style.display = 'block';
    background.style.display = 'none';
    canvas.style.display = 'none';

    restartBtn.addEventListener('click', () => {
        location.reload();
    })   
}

// create interval and start game 

function startGame(){
    startScreen.style.display = 'none';
    background.style.display = 'block';
    canvas.style.display = 'block';
    startBtn.style.display = 'none';
    intervalID = setInterval(() => {
    requestAnimationFrame(draw)
    }, 10)
}

// hides canvas
window.addEventListener('load', () => {
    endScreen.style.display = 'none';
    startScreen.style.display = 'block';
    background.style.display = 'none';
    canvas.style.display = 'none';

    startBtn.addEventListener('click', () => {
        startGame()
    })
    
})


// things I might need  otherwise delete

 // move player up and down

    // if (isUpArrow && (playerY + playerHeight < canvas.height)){
    //     playerY += incrementPlayer;
    //     grumpyChatMoving.play();
    // }
    // else if (isDownArrow && (playerY > 0)){
    //     playerY -= incrementPlayer;
    // }

    // create interval

// window.addEventListener('load', () => {
//     intervalID = setInterval(() => {
//         requestAnimationFrame(draw)
//      }, 10)
// })