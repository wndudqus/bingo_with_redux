import { BingoPlayerAreaInfo } from "../components/BingoPlayerArea";
import { CellInfo } from "../components/Cell";
import { BingoGameState } from "../modules/bingoGame";

//initValues 값에 따라 완전히 빈 game을 만들거나 값이 초기화되어있는 시작된 게임을 만든다.
export const createEmptyBingoGame = (NumberOfPlayers: number = 2, boardSize: number = 5, initValues: boolean = false): BingoGameState => {

    let bingoPlayerAreaInfo: BingoPlayerAreaInfo[] = [];

    for (let i = 0; i < NumberOfPlayers; i++) {
        bingoPlayerAreaInfo.push(createEmptyPlayer(i + 1, boardSize, initValues));
    }

    const bingoGameSate: BingoGameState = {
        isPlaying: initValues,
        currentPlayer: 1,
        currentRound: 1,
        players: bingoPlayerAreaInfo
    }
    return bingoGameSate;
}

//플레이어 정보를 초기화 한다. initValues에 따라 cell들에 값을 할당할지 결정한다. 
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
        isCurrentPlayer: (playerNumber === 1) ? true : false,
        cells: initCells,
        completedLine: new Array<CellInfo[]>(0)
    }

    return player;
}

//newLines-prevLines  B cells에서 A cells의 특정 ROW와 같은 값이 있는 ROW를  제외시키는 함수
export const intersectionCells = (prevLines: CellInfo[][], newLines: CellInfo[][]): CellInfo[][] => {
    return newLines.filter((newLine) => {
        return !prevLines.some((prevLine) => isSameValuedCellArray(prevLine, newLine));
    });
}

//두 배열을 문자열화 시켜 비교
export const isSameValuedCellArray = (cellA: CellInfo[], cellB: CellInfo[]): boolean => {
    return JSON.stringify(cellA) === JSON.stringify(cellB);
}

//start-end 범위의 값을 1차원 배열에 랜덤한 순서로 넣어준다.
export const createRandValues = (start: number, end: number): number[] => {
    const values: number[] = [];

    for (let i = start; i <= end; i++) {
        values.push(i);
    }
    const shuffled = shuffle(values);
    return shuffled;
}

//입력된 배열내의 숫자들을 랜덤한 순서로 섞어준다.
export const shuffle = (values: number[]): number[] => {
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

//board 중 해당하는 cell을 교체 한 cell array를 새로 생성해 return
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

//action이 호출 된 후 승자가 나왔는지 확인하는 listener함수
export const checkWinner = (players: BingoPlayerAreaInfo[], onWin: () => void) => {
    let winner: number[] = [];
    players.forEach((player: BingoPlayerAreaInfo) => {
        if (5 <= player.completedLine.length) {
            winner.push(player.playerNumber);
        }
    });

    //내부 함수로 사용. 
    const notifyWinner = async () => {
        if (winner.length > 1) {
            await window.confirm("무승부!\n\n 본 팝업이 꺼지면 게임이 초기화 됩니다.");
        }
        else if (winner.length) {
            await window.confirm(`Player - ${winner[0]}승리!\n\n 본 팝업이 꺼지면 게임이 초기화 됩니다.`);
        }
        else {
            return;
        }
        onWin()
    }

    //setTimeout으로 감싸서 함수의 우선순위를 낮춰준다.
    setTimeout(notifyWinner, 0);


}