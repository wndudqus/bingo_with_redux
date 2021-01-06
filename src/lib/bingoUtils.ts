import { BingoPlayerAreaInfo } from "../components/BingoPlayerArea";
import { CellInfo } from "../components/Cell";
import { BingoGameState } from "../modules/bingoGame";

export const createEmptyBingoGame = (NumberOfPlayers: number = 2, boardSize: number = 5, initValues: boolean = false): BingoGameState => {

    let bingoPlayerAreaInfo: BingoPlayerAreaInfo[] = [];

    for (let i = 0; i < NumberOfPlayers; i++) {
        bingoPlayerAreaInfo.push(createEmptyPlayer(i + 1, boardSize, initValues));
    }

    const bingoGameSate: BingoGameState = {
        isPlaying: false,
        currentPlayer: 1,
        currentRound: 1,
        winner: -1,
        players: bingoPlayerAreaInfo
    }
    return bingoGameSate;
}

export const createEmptyPlayer = (playerNumber: number, boardSize: number = 5, initValues: boolean = false): BingoPlayerAreaInfo => {

    const initCells: CellInfo[][] = [];

    let randValues = createRandValues(1, boardSize * boardSize);
    for (let i = 0; i < boardSize; i++) {
        let row: CellInfo[] = [];
        for (let j = 0; j < boardSize; j++) {
            row.push({
                id: initValues ? randValues.pop() as number : 0,
                boardNumber: playerNumber,
                isChecked: false,
            })
        }
        initCells.push(row);
    }

    const player: BingoPlayerAreaInfo = {
        playerNumber,
        isCurrentPlayer: true,
        cells: initCells,
        completedLine: new Array<CellInfo[]>(0)
    }

    return player;
}

export const createRandValues = (start: number, end: number): number[] => {
    const values: number[] = [];

    for (let i = start; i <= end; i++) {
        values.push(i);
    }
    const shuffled = shuffle(values);
    return shuffled;
}

export const shuffle = (values: number[]) => {
    return values
        .map(value => ([Math.random(), value]))
        .sort((a, b) => a[0] - b[0])
        .map(value => value[1]);
};

//현 라운드와 사용자수를 이용해 다음 플레이어를 반환.
export const calcNextPlayer = (round: number, NumberOfPlayers: number = 2): number => {
    return ((round) % NumberOfPlayers + 1);
}

//bingo를 충족하는 cell의 array 를 return한다. 
export const getBingoLines = (boardSize: number, cells: CellInfo[][]): CellInfo[][] => {
    let totalBingoLines: CellInfo[][] = [];

    // 가로방향 bingo push
    for (let i = 0; i < boardSize; i++) {
        if (cells[i].reduce((bingo, cell) => bingo && cell.isChecked, true)) {
            totalBingoLines.push(cells[i]);
        }
    }
    // 세로방향 bingo push
    for (let i = 0; i < boardSize; i++) {
        let bingo = true;
        let bingoLine: CellInfo[] = [];
        for (let j = 0; j < boardSize; j++) {
            bingo = bingo && cells[j][i].isChecked;
            bingoLine.push(cells[j][i]);
        }
        if (bingo) {//빙고일 경우 i열 컬럼을 push
            totalBingoLines.push(bingoLine);
        }
    }
    // 대각선 bingo push
    let diagnalBingoOne = true;
    let diagnalCellsOne: CellInfo[] = [];
    let diagnalBingoTwo = true;
    let diagnalCellsTwo: CellInfo[] = [];
    for (let i = 0; i < boardSize; i++) {
        diagnalBingoOne = diagnalBingoOne && cells[i][boardSize - i - 1].isChecked;
        diagnalBingoTwo = diagnalBingoTwo && cells[i][i].isChecked;
        diagnalCellsOne.push(cells[i][boardSize - i - 1]);
        diagnalCellsTwo.push(cells[i][i]);
    }
    if (diagnalBingoOne) {
        totalBingoLines.push(diagnalCellsOne);
    }
    if (diagnalBingoTwo) {
        totalBingoLines.push(diagnalCellsTwo);
    }
    return totalBingoLines;
};

//board 중 해당하는 cell을 교체 한 후 return
export const checkCellInCells = (cells: CellInfo[][], targetCell: CellInfo): CellInfo[][] => {
    return cells.map((row) => {
        return row.map((cell) => {
            return (cell.id === targetCell.id) ? {
                ...cell,
                isChecked: true
            } : cell
        })
    });
}

export const checkWinner = (players: BingoPlayerAreaInfo[], onWin: () => void) => {
    let winner: number[] = [];
    players.forEach((player: BingoPlayerAreaInfo) => {
        if (5 <= player.completedLine.length) {
            winner.push(player.playerNumber);
        }
    });

    //해당 로직만 async로 넘겨 다른 로직은 실행될 수 있도록 
    const notifyWinner = async () => {
        let confirm: boolean = false;
        if (winner.length > 1) {
            confirm = await window.confirm("무승부!\n\n 확인을 누를 경우 게임이 초기화 됩니다.");
        }
        else if (winner.length) {
            confirm = await window.confirm(`Player - ${winner[0]}승리!\n\n 확인을 누를 경우 게임이 초기화 됩니다.`);
        }
        else {
            return
        }

        if (confirm) {
            onWin()
        }
    }

    notifyWinner();


}