import React from 'react';
import styled from 'styled-components';
import BingoGameHeader from './BingoGameHeader';
import BingoPlayerArea, { BingoPlayerAreaInfo } from './BingoPlayerArea';
import { CellInfo } from './Cell';

const BingoGameSection = styled.section`
	height: 100%;
	.bingo-game-body {
		height: 100%;
		display: flex;
		flex-flow: wrap column;
		justify-content: space-around;
	}
`;

export type BingoGameProps = {
	isPlaying: boolean;
	currentPlayer: number;
	winner: number;
	toggleGame: () => void;
	selectCell: (selectedCell: CellInfo) => void;
	players: BingoPlayerAreaInfo[];
};

export default function BingoGame({
	isPlaying,
	toggleGame,
	players,
	selectCell,
}: BingoGameProps) {
	return (
		<BingoGameSection>
			<BingoGameHeader isPlaying={isPlaying} onClick={toggleGame} />
			<div className="bingo-game-body">
				{players.map(
					({ playerNumber, isCurrentPlayer, cells, completedLine }) => {
						return (
							<BingoPlayerArea
								key={`player_area_${playerNumber}`}
								playerNumber={playerNumber}
								isCurrentPlayer={isCurrentPlayer}
								cells={cells}
								completedLine={completedLine}
								selectCell={selectCell}
							/>
						);
					},
				)}
			</div>
		</BingoGameSection>
	);
}
