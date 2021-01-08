import React from 'react';
import styled from 'styled-components';
import BingoBoard from './BingoBoard';
import { CellInfo } from './Cell';
import CompletedLinesList from './CompletedLinesList';

const BingoPlayerAreaSection = styled.section`
	height: 45%;
	display: flex;
	flex-flow: nowrap column;
	justify-content: flex-start;
	align-items: space-around;
	background-color: ${(props) => props.color};

	margin: 1rem;
	.player-name {
		text-align: center;
		margin: 1rem 0 0.5rem 0;
		font-size: 1.5rem;
	}
	.game-area {
		display: flex;
		justify-content: space-around;
		margin: 1rem 0 1rem 0;
	}
`;

export type BingoPlayerAreaInfo = {
	playerNumber: number;
	isCurrentPlayer: boolean;
	cells: CellInfo[][];
	completedLine: CellInfo[][];
};

//props type
export type BingoPlayerAreaProps = {
	isPlaying: boolean;
	playerNumber: number;
	isCurrentPlayer: boolean;
	cells: CellInfo[][];
	completedLine: CellInfo[][];
};

// 한 사용자가 이용하는 영역을 랜더링 하는 컴포넌트
export default function BingoPlayerArea({
	isPlaying,
	playerNumber,
	isCurrentPlayer,
	cells,
	completedLine,
}: BingoPlayerAreaProps) {
	return (
		<BingoPlayerAreaSection
			color={isCurrentPlayer ? 'rgba(255,255,255,0.15)' : ''}
		>
			<h1 className="player-name">player : {playerNumber}</h1>
			<div className="game-area">
				<BingoBoard
					isPlaying={isPlaying}
					isActive={isCurrentPlayer}
					cells={cells}
				/>
				<CompletedLinesList completedLines={completedLine} />
			</div>
		</BingoPlayerAreaSection>
	);
}
