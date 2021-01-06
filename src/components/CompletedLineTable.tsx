import React from 'react';
import styled from 'styled-components';
import { CellInfo } from './Cell';

const CompletedLinesTableSection = styled.section`
	display: flex;
	flex-flow: wrap column;
	justify-content: center;
	align-items: center;
	.completed-lines {
		display: flex;
		flex-flow: wrap column;
		margin: 1rem;
		.completed-lines-row {
			display: flex;
			flex-flow: row;
			justify-content: center;
			border: 1px;
			border-style: solid;
			.cell {
				margin: 0.4rem;
			}
		}
	}
`;

type CompletedLineTableProps = {
	completedLines: CellInfo[][];
};

export default function CompletedLineTable({
	completedLines,
}: CompletedLineTableProps) {
	return (
		<CompletedLinesTableSection>
			<div>
				<h1>Completed lines</h1>
			</div>
			<div className="completed-lines">
				{completedLines.map((line, index) => {
					return (
						<div
							className="completed-lines-row"
							key={`completed-row_${index}_${line[0].id}`}
						>
							{line.map((cell) => (
								<div
									className="cell"
									key={`completed-line-cell_${cell.id}_${cell.boardNumber}`}
								>
									{cell.id}
								</div>
							))}
						</div>
					);
				})}
			</div>
		</CompletedLinesTableSection>
	);
}
