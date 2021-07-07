import React from 'react';
import styled from 'styled-components';
import BingoGameHeader from './BingoGameHeader';
import BingoPlayerArea, { BingoPlayerAreaInfo } from './BingoPlayerArea';

const BingoGameSection = styled.section`
	height: 100%;
	.bingo-game-body {
		height: 100%;
		display: flex;
		flex-flow: wrap column;
		justify-content: space-around;
	}
`;

//props type
export type BingoGameProps = {
	isPlaying: boolean;
	currentPlayer: number;
	winner: number;
	players: BingoPlayerAreaInfo[];
};

export default function BingoGame({ isPlaying, players }: BingoGameProps) {
	return (
		<BingoGameSection>
			<BingoGameHeader isPlaying={isPlaying} />
			<div className="bingo-game-body">
				{players.map(
					({ playerNumber, isCurrentPlayer, cells, completedLine }) => {
						return (
							<BingoPlayerArea
								key={`player_area_${playerNumber}`}
								isPlaying={isPlaying}
								playerNumber={playerNumber}
								isCurrentPlayer={isCurrentPlayer}
								cells={cells}
								completedLine={completedLine}
							/>
						);
					},
				)}
			</div>
		</BingoGameSection>
	);
}
