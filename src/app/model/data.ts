export class Data {

    public bomb: number;
    public n_flag: number;
    public rowNum: number;
    public colNum: number;
    public rowArr: Array<number>;
    public colArr: Array<number>;
    public matrix: Array<Array<number>>;
    public clickedMatrix: Array<Array<boolean>>;

    public user: string;
    public result: string;
    public minutes: number;
    public seconds: number;
    public gameOver: boolean;

    constructor(){
        // Initialise values
        this.rowNum = 10;
        this.colNum = 10;
        this.bomb = 10;
        this.n_flag = 0;

        // Initialise values for dialog box
        this.user = "Deepanjan";
        this.result = "You Lost";
        this.gameOver = false;
        this.minutes = 0;
        this.seconds = 0;

        // Creating rowArr and colArr for iterating purpose in body.component.html
        this.rowArr = Array(this.rowNum).fill(0).map((x,i)=>i);
        this.colArr = Array(this.colNum).fill(0).map((x,i)=>i);

        // Initialising matrix
        this.matrix = Array(this.rowNum);
        for(let i=0; i<this.rowNum; i++){
            this.matrix[i] = Array(this.colNum).fill(0);
        }

        this.clickedMatrix = Array(this.rowNum);
        for(let i=0; i<this.rowNum; i++){
            this.clickedMatrix[i] = Array(this.colNum).fill(false);
        }

        // Setting bombs
        let bmb = 0;
        while(bmb<this.bomb){
            let r = Math.floor(Math.random()*10);
            let c = Math.floor(Math.random()*10);
            if(this.matrix[r][c] == 9){
                continue;
            }
            this.matrix[r][c] = 9;
            bmb++;
        }

        // Setting numbers
        for(let rowInd=0; rowInd<this.rowNum; rowInd++){
            for(let colInd=0; colInd<this.colNum; colInd++){
                let count = 0;
                if(this.matrix[rowInd][colInd] == 9){
                    continue;
                }
                for(let row = Math.max(0, rowInd-1); row<=Math.min(9, rowInd+1); row++){
                    for(let col = Math.max(0, colInd-1); col<=Math.min(9, colInd+1); col++){
                        if((row == rowInd) && (col == colInd)){
                            continue;
                        }
                        if(this.matrix[row][col] == 9){
                            count++;
                        }
                    }
                }
                this.matrix[rowInd][colInd] = count;
            }
        }
    }
}
