class Shape {
    constructor(board, shape, x, y) {
        this.board = board;
        //this.color = color;
        this.shape = shape;
        this.x = x;
        this.y = y;
    }

    setShape() {
        for(let x = 0; x<this.shape.length; x++) {
            for(let y = 0; y<this.shape[x].length; y++) {
                if(this.shape[y][x]>0)
                    this.board.grid[this.x+x][this.y+y] = this.shape[y][x];
            }
        }
    }
    deleteShape() {
        for(let x = 0; x<this.shape.length; x++) {
            for(let y = 0; y<this.shape[x].length; y++) {
                if(this.shape[y][x]>0)
                    this.board.grid[this.x+x][this.y+y] = 0;
            }
        }
    }

    isInsideGrid(x, y) {
        return x >= 0 && x < BOARD_SIZE_X && y >= 0 && y <= BOARD_SIZE_Y;
    }

    isCellEmpty(x, y) {
        //console.log(x+' ' +y);
        return this.board.grid[x][y] === 0;
    }
    //if((x+dest_x+1 > this.shape.length || y+dest_y+1 > this.shape[x].length) || x+dest_x < this.x ) {//do not count internal blocks

    ///access to shape by shape[y][x]
    canMove(dest_x, dest_y, shape = this.shape) {
        //console.log(shape);
        //console.log(this.board);
        for(let x = 0; x<shape.length; x++) {
            for(let y = 0; y<shape[x].length; y++) {
                //console.table(shape);
                if(shape[y][x]>0) {
                    if(x+dest_x >= 0 && y+dest_y < BOARD_SIZE_Y && x+dest_x < BOARD_SIZE_X) {
                        console.log("COND TRUE");
                        if (this.board.grid[x + dest_x][y + dest_y] > 0) {
                            return false
                        }
                    }
                    else
                        return false
                }
            }
        }
        return true
    }

    move(key, fastDrop = false) {
        this.deleteShape();
        //console.log("INSIDE LOOP");
        if(key == KEY.LEFT && this.canMove(this.x-1, this.y))
            this.x = this.x - 1;
        else if(key == KEY.RIGHT && this.canMove(this.x+1, this.y))
            this.x = this.x+1;
        else if(key == KEY.DOWN && this.canMove(this.x, this.y+1))
            if(fastDrop) {
                while(this.canMove(this.x, this.y+1))
                    this.y = this.y+1;
            }
            else
                this.y = this.y+1;
        else if(key == KEY.UP) {
            this.rotate();
        }
        //console.log("END OF THE LOOP");
        this.setShape();
        this.board.update();
    }

    rotate() {
        let tempShape = new Array(this.shape[0].length);
        for(let i=0; i<this.shape.length; i++) {
            tempShape[i] = new Array(this.shape.length);
        }

        for(let x = 0; x<this.shape.length; x++) {
            for(let y = 0; y<this.shape[x].length; y++) {
                tempShape[this.shape.length-1-x][y] = this.shape[y][x];
            }
        }
        if(this.canMove(this.x, this.y, tempShape)) {
            this.shape = tempShape;
        }
    }
}