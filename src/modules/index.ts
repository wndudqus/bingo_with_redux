import { combineReducers } from 'redux';
import bingoGameReducer from './bingoGame';
import { BingoGameState } from './bingoGame';


export type GlobalStates = {
    bingoGameReducer: BingoGameState;
}

const rootReducer = combineReducers({
    bingoGameReducer
});

export default rootReducer;