import { BingoPlayerAreaInfo } from "../components/BingoPlayerArea";
import { CellInfo } from "../components/Cell";
import { calcNextPlayer, checkCellInCells, createEmptyBingoGame, getBingoLines } from "../lib/bingoUtils";

//action types
const TOGGLE_GAME = 'bingoGame/TOGGLE_GAME' as const;
const SELECT_CELL = 'bingoGame/SELECT_CELL' as const;
const RESET_GAME = 'bingoGame/RESET_GAME' as const;

//actions
export const toggleGame = () => ({ type: TOGGLE_GAME });
export const selectCell = (selectedCell: CellInfo) => ({ type: SELECT_CELL, selectedCell });
export const resetGame = () => ({ type: RESET_GAME });

//빙고게임의 state를 변화시키는 액션 타입
type BingoGameAction =
    | ReturnType<typeof toggleGame>
    | ReturnType<typeof selectCell>
    | ReturnType<typeof resetGame>

//빙고게임의 global state
export type BingoGameState = {
    isPlaying: boolean;
    currentPlayer: number;
    currentRound: number;
    players: BingoPlayerAreaInfo[];
}

//initialState
const initialBingoGameState: BingoGameState = createEmptyBingoGame(2, 5);

const bingoGameReducer = (state: BingoGameState = initialBingoGameState, action: BingoGameAction): BingoGameState => {

    let newState: BingoGameState;

    switch (action.type) {

        case TOGGLE_GAME:

            newState = {
                ...state,
                ...createEmptyBingoGame(2, 5, true),
                isPlaying: true,
            };
            return newState;

        case SELECT_CELL:

            if (state.currentPlayer !== action.selectedCell.boardNumber || !state.isPlaying) {
                return state;
            }

            newState = {
                ...state,
                currentRound: state.currentRound + 1,
                currentPlayer: calcNextPlayer(state.currentRound, state.players.length),
                players: state.players.map((player) => {
                    const checkedCells: CellInfo[][] = checkCellInCells(player.cells, action.selectedCell);
                    return {
                        ...player,
                        isCurrentPlayer: calcNextPlayer(state.currentRound, state.players.length) === player.playerNumber,
                        cells: checkedCells,
                        completedLine: getBingoLines(player.cells.length, checkedCells)
                    }

                })
            };
            return newState;

        case RESET_GAME:
            newState = createEmptyBingoGame(2, 5, false);
            return newState;

        default:
            return state;
    }
}

export default bingoGameReducer;