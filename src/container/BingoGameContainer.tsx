import React from 'react';
import BingoGame, { BingoGameProps } from '../components/BingoGame';
import { connect } from 'react-redux';
import { GlobalStates } from '../modules';

//BingoGame에 props로 global state를 전달해주는 컨테이너 컴포넌트
function BingoGameContainer({
	isPlaying,
	currentPlayer,
	winner,
	players,
}: BingoGameProps) {
	return (
		<BingoGame
			isPlaying={isPlaying}
			currentPlayer={currentPlayer}
			winner={winner}
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

export default connect(mapStateToProps, {})(BingoGameContainer);
