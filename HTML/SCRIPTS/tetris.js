const canvas = document.getElementById('game');
const nextTetr = document.getElementById('nextTetr');
const nextCtx = nextTetr.getContext('2d');
const ctx = canvas.getContext('2d');
let htmlScore = document.getElementById("score");
let BOARD_SIZE_X = 10;
let BOARD_SIZE_Y = 20;
let BLOCK_SIZE = 30;
let gameOn = true;

if(localStorage.getItem("|DEV|lvl") === '1') {
    BOARD_SIZE_X = 20;
    BOARD_SIZE_Y=20
}

const KEY = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    DOWN: 'ArrowDown',
    UP: 'ArrowUp'
}

const SHAPES = [
    [[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]],
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]],
    [[4, 4], [4, 4]],
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]],
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]],
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]],
    [[0, 0, 0], [0, 2, 0], [0, 0, 0]]
];


class Game {
    constructor() {
        this.score = 0;
        this.board = new Board(ctx, nextCtx);
        this.fallingShape = this.shapeGenerator();
        this.gameOver = false;
        this.initialize();
        this.nextShape = this.shapeGenerator();
    }

    initialize() {
        ctx.canvas.width = BOARD_SIZE_X * BLOCK_SIZE;
        ctx.canvas.height = BOARD_SIZE_Y * BLOCK_SIZE;

        this.board.getEmptyBoard();
        document.addEventListener('keydown', event => {
            if(!event.repeat && !this.gameOver) {
                this.fallingShape.move(event.key, true);
            }
        })
    }

    shapeGenerator() {
        return new Shape(this.board, SHAPES[Math.floor(Math.random()*SHAPES.length)], 4, 0);
    }

    onUpdate() {
        htmlScore.innerHTML = 'Score: ' + this.score;
        this.fallingShape.deleteShape();
        if(!this.fallingShape.canMove(this.fallingShape.x, this.fallingShape.y+1)) {
            this.fallingShape.setShape();

            while(this.board.checkBottomRow()) {
                this.score += BOARD_SIZE_X;
            }/*
            if(this.board.checkBottomRow()) {
                this.score += BOARD_SIZE_X;
            }*/

            console.log(this.board.grid);
            this.fallingShape = this.nextShape;
            this.nextShape = this.shapeGenerator();
            this.board.drawNext(this.nextShape.shape);

            if(!this.fallingShape.canMove(this.fallingShape.x, this.fallingShape.y+1)) {
                if(this.fallingShape.canMove(this.fallingShape.x, this.fallingShape.y)) {
                    this.fallingShape.setShape();
                }
                console.log("GAME OVER");
                //console.log(this.board);
                this.gameOver = true;
                this.board.update();
                //alert("END");
                return false;
            }
        }
        else {
            this.fallingShape.setShape();
            this.fallingShape.move(KEY.DOWN);
        }
        this.board.update();
        return true;
    }
}

let mainGame = new Game;
let timer;

if(localStorage.getItem('|DEV|lvl') === '1')
    timer = setInterval(start, 200);
else
    timer = setInterval(start, 200);



function start() {
    if(mainGame.score >= 40 && gameOn) {
        clearInterval(timer);
        timer = setInterval(start, 100);
    }

    if(!mainGame.onUpdate()) {
        clearInterval(timer);
        gameOver();
    }


}

function gameOver() {
    gameOn = false;
    ctx.fillStyle = 'black';
    ctx.fillRect(2, 5*BLOCK_SIZE, BOARD_SIZE_X*BLOCK_SIZE, 5*BLOCK_SIZE);
    ctx.font = '40px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', BLOCK_SIZE, 8*BLOCK_SIZE);

    let nameField = document.createElement('input');
    nameField.setAttribute('id', 'nameField');

    let loginButton = document.createElement('button');
    loginButton.setAttribute('id', 'loginButton');
    loginButton.innerHTML = "Save name";
    loginButton.onclick = () => {
        if(nameField.value!=='' && nameField.value!=='|DEV|lvl') {
            if(localStorage.getItem(nameField.value)) {
                if(mainGame.score > parseInt(localStorage.getItem(nameField.value)))
                    localStorage.setItem(nameField.value, mainGame.score.toString());
            }
            else
                localStorage.setItem(nameField.value, mainGame.score.toString());


            console.log(nameField.value + ' ' + mainGame.score.toString());
            mainGame.score = 0;
            window.location = "entrance.html";
        }
    };


    document.body.append(nameField); document.body.append(loginButton);

    /*document.addEventListener("keyup", function(event) {
        window.location = "entrance.html";
    });*/
}











