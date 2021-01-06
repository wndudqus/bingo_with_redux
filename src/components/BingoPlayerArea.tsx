import React from 'react';
import styled from 'styled-components';
import BingoBoard from './BingoBoard';
import { CellInfo } from './Cell';
import CompletedLineTable from './CompletedLineTable';
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

export type BingoPlayerAreaProps = {
	playerNumber: number;
	isCurrentPlayer: boolean;
	cells: CellInfo[][];
	completedLine: CellInfo[][];
	selectCell: (selectedCell: CellInfo) => void;
};

export default function BingoPlayerArea({
	playerNumber,
	isCurrentPlayer,
	cells,
	completedLine,
	selectCell,
}: BingoPlayerAreaProps) {
	return (
		<BingoPlayerAreaSection
			color={isCurrentPlayer ? 'rgba(255,255,255,0.15)' : ''}
		>
			<h1 className="player-name">player : {playerNumber}</h1>
			<div className="game-area">
				<BingoBoard
					isActive={isCurrentPlayer}
					cells={cells}
					selectCell={selectCell}
				/>
				<CompletedLineTable completedLines={completedLine} />
			</div>
		</BingoPlayerAreaSection>
	);
}
