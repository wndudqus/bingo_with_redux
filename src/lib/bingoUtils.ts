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
    console.log(shuffled);
    return shuffled;
}

export const shuffle = (values: number[]) => {
    return values
        .map(value => ([Math.random(), value]))
        .sort((a, b) => a[0] - b[0])
        .map(value => value[1]);
};

export const calcNextPlayer = (round: number, NumberOfPlayers: number = 2): number => {
    return ((round) % NumberOfPlayers + 1);
}