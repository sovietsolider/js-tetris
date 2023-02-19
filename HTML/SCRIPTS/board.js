class Board {
    constructor(ctx, nextCtx) {
        this.contex = ctx;
        this.c = nextCtx;
    }


    grid = new Array(BOARD_SIZE_X);

    getEmptyBoard() {
        for(let x=0; x<BOARD_SIZE_X; x++) {
            this.grid[x] = new Array(BOARD_SIZE_Y);
        }
        for(let x=0; x<BOARD_SIZE_X; x++) {
            for(let y=0; y<BOARD_SIZE_Y; y++) {
                this.grid[x][y] = 0;
            }
        }
    }

    update() {
        for(let x = 0; x<BOARD_SIZE_X; x++) {
            for(let y = 0; y<BOARD_SIZE_Y; y++) {
                if (this.grid[x][y]>0) {
                    if(this.grid[x][y]===1)
                        this.contex.fillStyle = "red";
                    else if(this.grid[x][y]===2)
                        this.contex.fillStyle = "blue";
                    else if(this.grid[x][y]===3)
                        this.contex.fillStyle = "orange";
                    else if(this.grid[x][y]===4)
                        this.contex.fillStyle = "purple";
                    else if(this.grid[x][y]===5)
                        this.contex.fillStyle = "pink";
                    else if(this.grid[x][y]===6)
                        this.contex.fillStyle = "green";
                    else
                        this.contex.fillStyle = "yellow";
                    this.contex.fillRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
                else {
                    this.contex.clearRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }

    drawNext(shape)
    {
        this.c.reset();
        for(let x = 0; x<shape[0].length; x++) {
            for(let y = 0; y<shape.length; y++) {
                if (shape[y][x]>0) {
                    if(shape[y][x]===1)
                        this.c.fillStyle = "red";
                    else if(shape[y][x]===2)
                        this.c.fillStyle = "blue";
                    else if(shape[y][x]===3)
                        this.c.fillStyle = "orange";
                    else if(shape[y][x]===4)
                        this.c.fillStyle = "purple";
                    else if(shape[y][x]===5)
                        this.c.fillStyle = "pink";
                    else if(shape[y][x]===6)
                        this.c.fillStyle = "green";
                    else
                        this.c.fillStyle = "yellow";
                    this.c.fillRect(x*BLOCK_SIZE, y*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
                else {
                    this.c.clearRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }

    }

    checkBottomRow() {
        let count = 0;
        for (let y = 0; y < BOARD_SIZE_Y; y++) {
            count = 0;
            for (let x = 0; x < BOARD_SIZE_X; x++) {
                if(this.grid[x][y]>0)
                count++;
            }
            if (count === BOARD_SIZE_X) {
                for(let i=0; i<BOARD_SIZE_X; i++)
                    this.grid[i][y] = 0;
                for(let dx = 0; dx < BOARD_SIZE_X; dx++) {
                    for(let dy = y-1; dy >= 0; dy--) {
                        this.grid[dx][dy+1] = this.grid[dx][dy];
                    }
                }
                return true
            }
        }
        return false
    }
}
