
// GRUMPY C(H)AT

// create images

let grumpyCatImg = document.createElement('img');
grumpyCatImg.src = 'images/grumpyCat.png';

let followerImg = document.createElement('img');
followerImg.src = 'images/follower.png';

let like = document.createElement('img');
like.src = 'images/like.png';

let alien = document.createElement('img');
alien.src = 'images/alien.png';

let finger = document.createElement('img');
finger.src = 'images/finger.png';

let aubergine = document.createElement('img');
aubergine.src = 'images/aubergine.png';

let kiss = document.createElement('img');
kiss.src = 'images/kiss.png';

let teeth = document.createElement('img');
teeth.src = 'images/teeth.png';

let laugh = document.createElement('img');
laugh.src = 'images/laugh.png';

let sunnies = document.createElement('img');
sunnies.src = 'images/sunnies.png';

let monkey = document.createElement('img');
monkey.src = 'images/monkey.png';

let poo = document.createElement('img');
poo.src = 'images/poo.png';

let heart = document.createElement('img');
heart.src = 'images/heart.png';

// left images

let lNetflix = document.createElement('img');
lNetflix.src = 'images/mLNetflix.png';

let lTrump = document.createElement('img');
lTrump.src = 'images/mLDonald.png';

let lDress = document.createElement('img');
lDress.src = 'images/mLDress.png';

let lFurreal = document.createElement('img');
lFurreal.src = 'images/mLFurreal.png';

let lOnly = document.createElement('img');
lOnly.src = 'images/mLOnly.png';

// right messages

let rMondays = document.createElement('img');
rMondays.src = 'images/mRMondays.png';

let rCool = document.createElement('img');
rCool.src = 'images/mRCool.png';

let rRofl = document.createElement('img');
rRofl.src = 'images/mRRofl.png';

let rStartup = document.createElement('img');
rStartup.src = 'images/mRStartup.png';

let rTikTok = document.createElement('img');
rTikTok.src = 'images/mRTikTok.png';

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
let messagesCenter = [];
let messagesCenterTimer = 5;


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
        ctx.drawImage(messagesRight[i].image, messagesRight[i].x, messagesRight[i].y); 
        messagesRight[i].x = messagesRight[i].x - 1; 

        // collision detection messages right and player

        if(playerX + 95 >= messagesRight[i].x && playerX <= messagesRight[i].x + messagesRight[i].image.width && playerY <= messagesRight[i].y + messagesRight[i].image.height && playerY + 95 >= messagesRight[i].y){
            clearInterval(intervalID);
            gameOver() 
        }

        if(messagesRight[i].x == 0){
            noScore++ 
        }
    }

    // create random countdown to push messages 

    messagesRightTimer--;

    if(messagesRightTimer == 0){

        // create random message image

        let randomNum = getRandom(1,6);

        if (randomNum == 1)
            randomImage = rMondays;
        else if (randomNum == 2)
            randomImage = rCool;
        else if (randomNum == 3)
            randomImage = rRofl;
        else if (randomNum == 4)
            randomImage = rStartup;
        else if (randomNum == 5)
            randomImage = rTikTok;
            else if (randomNum == 6)
            randomImage = alien;
        else if (randomNum == 7)
            randomImage = finger;
        else if (randomNum == 8)
            randomImage = aubergine;
        else if (randomNum == 9)
            randomImage = kiss;
        else if (randomNum == 10)
            randomImage = teeth;
        else if (randomNum == 11)
            randomImage = laugh;
        else if (randomNum == 12)
            randomImage = sunnies;
        else if (randomNum == 13)
            randomImage = poo;
        else if (randomNum == 14)
            randomImage = heart;
        else if (randomNum == 15)
            randomImage = monkey;
        else 
            randomImage = like;
        
        

        messagesRight.push({
            x: canvas.width, 
            y: groundHeight + 50,
            image : randomImage
        });
        messagesRightTimer = getRandom(300,1200);
    }

    // messages left

    // loop over messages draws them and moves them to the right

    for (let i = 0; i < messagesLeft.length; i++){
       
         ctx.drawImage(messagesLeft[i].image, messagesLeft[i].x, messagesLeft[i].y); 

        messagesLeft[i].x = messagesLeft[i].x + 0.8;

        // collision detection messages and player

        if(playerX + 95 >= messagesLeft[i].x && playerX <= messagesLeft[i].x + messagesLeft[i].image.width && playerY <= messagesLeft[i].y + messagesLeft[i].image.height && playerY + 95 >= messagesLeft[i].y){
            clearInterval(intervalID);
            gameOver() 
        }

        if(messagesLeft[i].x + messagesLeft[i].image.width == canvas.width){
            noScore++;   
        }
    }

    // create random countdown to push messages 

    messagesLeftTimer = messagesLeftTimer - 0.5;

    if(messagesLeftTimer == 0){

        // create random message image

        let randomNum = getRandom(1,16);

        if (randomNum == 1)
            randomImage = lTrump;
        else if (randomNum == 2)
            randomImage = lNetflix;
        else if (randomNum == 3)
            randomImage = lOnly;
        else if (randomNum == 4)
            randomImage = lDress;
        else if (randomNum == 5)
            randomImage = lFurreal;
        else if (randomNum == 6)
            randomImage = alien;
        else if (randomNum == 7)
            randomImage = finger;
        else if (randomNum == 8)
            randomImage = aubergine;
        else if (randomNum == 9)
            randomImage = kiss;
        else if (randomNum == 10)
            randomImage = teeth;
        else if (randomNum == 11)
            randomImage = laugh;
        else if (randomNum == 12)
            randomImage = sunnies;
        else if (randomNum == 13)
            randomImage = poo;
        else if (randomNum == 14)
            randomImage = heart;
        else if (randomNum == 15)
            randomImage = monkey;
        else 
            randomImage = like;

        messagesLeft.push({
            x: 0 - randomImage.width, 
            y: canvas.height - 400,
            image : randomImage
        });
        messagesLeftTimer = getRandom(600,1200);
        console.log(randomImage.width);
    }

    // messages center

    for (let i = 0; i < messagesCenter.length; i++){
       
        ctx.drawImage(messagesCenter[i].image, messagesCenter[i].x, messagesCenter[i].y); 

       messagesCenter[i].x = messagesCenter[i].x + 0.8;

       // collision detection messages and player

       if(playerX + 95 >= messagesCenter[i].x && playerX <= messagesCenter[i].x + messagesCenter[i].image.width && playerY <= messagesCenter[i].y + messagesCenter[i].image.height && playerY + 95 >= messagesCenter[i].y){
           clearInterval(intervalID);
           // This is only for explanations:
           gameOver() 
       }

       if(messagesCenter[i].x + messagesCenter[i].image.width == canvas.width){
           noScore++;   
       }
   }

   // create random countdown to push messages 

   messagesCenterTimer = messagesCenterTimer - 0.5;

   if(messagesCenterTimer == 0){

       // create random message image

       let randomNum = getRandom(1,16);

       if (randomNum == 1)
           randomImage = lTrump;
       else if (randomNum == 2)
           randomImage = lNetflix;
       else if (randomNum == 3)
           randomImage = lOnly;
       else if (randomNum == 4)
           randomImage = lDress;
       else if (randomNum == 5)
           randomImage = lFurreal;
       else if (randomNum == 6)
           randomImage = alien;
       else if (randomNum == 7)
           randomImage = finger;
       else if (randomNum == 8)
           randomImage = aubergine;
       else if (randomNum == 9)
           randomImage = kiss;
       else if (randomNum == 10)
           randomImage = teeth;
       else if (randomNum == 11)
           randomImage = laugh;
       else if (randomNum == 12)
           randomImage = sunnies;
       else if (randomNum == 13)
           randomImage = poo;
       else if (randomNum == 14)
           randomImage = heart;
       else if (randomNum == 15)
           randomImage = monkey;
       else 
           randomImage = like;

       messagesCenter.push({
           x: 0 - randomImage.width, 
           y: canvas.height - 220,
           image : randomImage
       });
       messagesCenterTimer = getRandom(600,1200);
       console.log(randomImage.width);
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

