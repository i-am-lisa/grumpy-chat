# Grumpy C(h)at

[Click here to see deployed game](http://github.com)

## Description
Sometimes social media can get just too much. Even for internet celeb grumpy cat. In this game, Grumpy Cat is saying: NO. The player (Grumpy Cat) finds itself in an oh-so-familiar messenger chat themed environment and has to avoid getting hit by messages that keep popping up onto the screen. The player can do so by jumping or ducking using the arrow keys. Once Grumpy Cat gets hit by a message, the game is over.


## MVP
- game has a player that can (move horizontally and) jump up and duck down
- messages appear randomly from both sides of the screen
- messages appear on 3 different levels of height
- messages have 3 different sizes
- collusion with the messages will end the game
- display of high score


## Backlog
- add variation of score: jumping or actively punching the messages
- add scoreboard


## Data structure

# index.html
- basic structure

# style.css
- styling

# main.js

- buildStartScreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}

# game.js

- Game () {}
- starLoop () {}
- checkCollisions () {}
- addMessages () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- GameOver () {}

# grumpyCat.js 

- Grumpy Cat () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkScreenCollision () {}

# Message.js 

- Message () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}

## States y States Transitions
- startScreen
- gameScreen
- gameOverScreen


## Task
- images - prepare images
- html - basic structure
- main - buildDom
- main - buildStartScreen
- main - buildGameScreen
- main - buildGameOverScreen
- main - addEventListener
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- grumpyCat - draw
- grumpyCat - move
- message - draw
- message - move
- game - addMessage
- game - addGrumpyCat
- game - checkCollision
- game - GameOver
- game - addEventListener


## Links
Link to game:
https://i-am-lisa.github.io/grumpy-chat/

