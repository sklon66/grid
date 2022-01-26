const randomColor = () => {
    const
        r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
}

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

class gameFactory {
    games = []

    new () {
        const game = new GameBoard()
        const hash = `${randomColor()}|${randomColor()}`
        this.games[hash] = game;
        return {
            id: hash,
            game
        }
    }

    get (hash) {
        return this.games[hash];
    }

    delete (hash) {
        delete this.games[hash];
    }
}

module.exports.factory = new gameFactory();