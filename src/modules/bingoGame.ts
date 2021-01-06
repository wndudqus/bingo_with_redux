import { BingoPlayerAreaInfo } from "../components/BingoPlayerArea";
import { CellInfo } from "../components/Cell";
import { calcNextPlayer, createEmptyBingoGame } from "../lib/bingoUtils";

const TOGGLE_GAME = 'bingoGame/TOGGLE_GAME' as const;
const SELECT_CELL = 'bingoGame/SELECT_CELL' as const;
const RESET_GAME = 'bingoGame/RESET_GAME' as const;


export const toggleGame = () => ({ type: TOGGLE_GAME });
export const selectCell = (selectedCell: CellInfo) => ({ type: SELECT_CELL, selectedCell });
export const resetGame = () => ({ type: RESET_GAME });

type BingoGameAction =
    | ReturnType<typeof toggleGame>
    | ReturnType<typeof selectCell>
    | ReturnType<typeof resetGame>


export type BingoGameState = {
    isPlaying: boolean;
    currentPlayer: number;
    currentRound: number;
    winner: number;
    players: BingoPlayerAreaInfo[];
}

const initialBingoGameState: BingoGameState = createEmptyBingoGame(2, 5);

const bingoGameReducer = (state: BingoGameState = initialBingoGameState, action: BingoGameAction) => {

    let newState: BingoGameState = initialBingoGameState;

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
                    return {
                        ...player,
                        isCurrentPlayer: calcNextPlayer(state.currentRound, state.players.length) === player.playerNumber,
                        cells: player.cells.map((row) => {
                            return row.map((cell) => {
                                return (cell.id === action.selectedCell.id) ? {
                                    ...cell,
                                    isChecked: true
                                } : cell
                            })
                        })
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