class GameBoard {
    constructor() {
        this.cellsArr = [];
        this.init()
        this.curentPlayer = 1;
    }

    init() {
        for (let i = 0; i < 7; i++) {
            this.cellsArr.push([])
        }
    }

    getCells() {
        return this.cellsArr;
    }

    nextPlayer() {
        if (this.curentPlayer === 1) this.curentPlayer = 2
        else this.curentPlayer = 1
    }

    checkForWin(column, row) {
        let ifWin = false;
        // vertical
        const verticalColumn = this.cellsArr[column];
        const vertical = verticalColumn.reduce((acc, val) => {
            if (acc.inRow < 4) {
                if (acc.curent === val) {
                    acc.inRow++;
                } else if (val !== undefined) {
                    acc.inRow = 1;
                    acc.curent = val
                }
            }
            return acc;
        }, { inRow: 1, curent: 0 })
        if (vertical.inRow === 4) {
            ifWin = true;
        }

        // horizontal
        const horizontalRow = [
            this.cellsArr[0][row],
            this.cellsArr[1][row],
            this.cellsArr[2][row],
            this.cellsArr[3][row],
            this.cellsArr[4][row],
            this.cellsArr[5][row],
            this.cellsArr[6][row],
        ]
        const horizontal = horizontalRow.reduce((acc, val) => {
            if (acc.inRow < 4) {
                if (acc.curent === val) {
                    acc.inRow++;
                } else if (val !== undefined) {
                    acc.inRow = 1;
                    acc.curent = val
                }
            }
            return acc;
        }, { inRow: 1, curent: 0 })
        if (horizontal.inRow === 4) {
            ifWin = true;
        }

        // diagnal LR
        let leftArr = []
        let rightArr = []
        for (let i = 1; i < 4; i++) {
            if (this.cellsArr[column - i]) leftArr.push(this.cellsArr[column - i][row + i]);
            else leftArr.push(undefined);

            if (this.cellsArr[column + i]) rightArr.push(this.cellsArr[column + i][row - i]);
            else rightArr.push(undefined);
        }
        const diagLRRow = [
            ...leftArr,
            this.cellsArr[column][row],
            ...rightArr
        ]
        const diagLR = diagLRRow.reduce((acc, val) => {
            if (acc.inRow < 4) {
                if (acc.curent === val) {
                    acc.inRow++;
                } else if (val !== undefined) {
                    acc.inRow = 1;
                    acc.curent = val
                }
            }
            return acc;
        }, { inRow: 1, curent: 0 })
        if (diagLR.inRow === 4) {
            ifWin = true;
        }

        // diagnal RL
        leftArr = []
        rightArr = []
        for (let i = 1; i < 4; i++) {
            if (this.cellsArr[column - i]) leftArr.push(this.cellsArr[column - i][row - i]);
            else leftArr.push(undefined);

            if (this.cellsArr[column + i]) rightArr.push(this.cellsArr[column + i][row + i]);
            else rightArr.push(undefined);
        }
        const diagRLRow = [
            ...leftArr,
            this.cellsArr[column][row],
            ...rightArr
        ]
        const diagRL = diagRLRow.reduce((acc, val) => {
            if (acc.inRow < 4) {
                if (acc.curent === val) {
                    acc.inRow++;
                } else if (val !== undefined) {
                    acc.inRow = 1;
                    acc.curent = val
                }
            }
            return acc;
        }, { inRow: 1, curent: 0 })
        if (diagRL.inRow === 4) {
            ifWin = true;
        }

        if (ifWin) {
            return true;
        }
    }

    turn(column) {
        if (this.cellsArr[column].length === 6) {
            return alert("full column");
        }
        this.cellsArr[column].push(this.curentPlayer);
        const ifWin = this.checkForWin(column, this.cellsArr[column].length - 1)
        const returnedVal = [column, this.cellsArr[column].length - 1, ifWin, this.curentPlayer];
        this.nextPlayer();
        return returnedVal;
    }
}

const newGame = new GameBoard()

let player = 2
setTimeout(() => {
    const cellArr = document.getElementsByClassName("cell")
    for (const element of cellArr) {
        element.onclick = (e) => {
            const clas = e.target.className.split(" ")[1].split("-")[1];
            const bukavi = newGame.turn(+clas)
            let elem = document.getElementsByClassName(`column-${bukavi[0]} row-${bukavi[1]}`)
            if (player === 1) {
                elem[0].classList.add("yellow")
                player = 2
            } else if (player === 2) {
                elem[0].classList.add("red")
                player = 1
            }
            if (bukavi[2]) {
                setTimeout(() => {
                    alert(`winer winer chiken diner ${bukavi[3]}`)
                    location.reload();
                }, 100)
            }
        }
    }
}, 1000)
