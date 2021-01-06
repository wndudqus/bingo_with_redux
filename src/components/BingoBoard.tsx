import React, { useCallback } from 'react';
import styled from 'styled-components';
import Cell, { CellInfo } from './Cell';

const BingoBoardSection = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	.cells-area {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: wrap column;
	}
	.cells-row {
		display: flex;
		justify-content: center;
	}
`;
type BingoBoardProps = {
	isActive: boolean;
	cells: CellInfo[][];
	selectCell: (selectedCell: CellInfo) => void;
};

export default function BingoBoard({
	isActive,
	cells,
	selectCell,
}: BingoBoardProps) {
	const onClickBoard = useCallback(
		(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
			if (isActive) return;
			else alert('올바른 차례가 아닙니다.');
		},
		[isActive],
	);

	return (
		<BingoBoardSection onClick={onClickBoard}>
			<div className="cells-area">
				{cells.map((row: CellInfo[], index) => {
					return (
						<div
							className="cells-row"
							key={`board_row:${row[0].boardNumber}_${index}`}
						>
							{row.map(({ id, boardNumber, isChecked }: CellInfo, index) => (
								<Cell
									key={`cell_${boardNumber}_${id}_${index}`}
									id={id}
									boardNumber={boardNumber}
									isChecked={isChecked}
									selectCell={selectCell}
								/>
							))}
						</div>
					);
				})}
			</div>
		</BingoBoardSection>
	);
}
