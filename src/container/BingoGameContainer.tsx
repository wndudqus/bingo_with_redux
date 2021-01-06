import React from 'react';
import BingoGame, { BingoGameProps } from '../components/BingoGame';
import { connect } from 'react-redux';
import { toggleGame, selectCell } from '../modules/bingoGame';
import { GlobalStates } from '../modules';

function BingoGameContainer({
	isPlaying,
	currentPlayer,
	winner,
	toggleGame,
	selectCell,
	players,
}: BingoGameProps) {
	return (
		<BingoGame
			isPlaying={isPlaying}
			currentPlayer={currentPlayer}
			winner={winner}
			toggleGame={toggleGame}
			selectCell={selectCell}
			players={players}
		/>
	);
}

const mapStateToProps = (state: GlobalStates) => ({
	isPlaying: state.bingoGameReducer.isPlaying,
	currentPlayer: state.bingoGameReducer.currentPlayer,
	winner: state.bingoGameReducer.currentPlayer,
	players: state.bingoGameReducer.players,
});

export default connect(mapStateToProps, { toggleGame, selectCell })(
	BingoGameContainer,
);
