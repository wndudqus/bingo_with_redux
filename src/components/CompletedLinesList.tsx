import React from 'react';
import styled from 'styled-components';
import { CellInfo } from './Cell';

const CompletedLinesListSection = styled.section`
	display: flex;
	flex-flow: wrap column;
	justify-content: center;
	align-items: center;
	.completed-lines-header {
		font-size: 1.1rem;
	}
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

//props type
type CompletedLinesListProps = {
	completedLines: CellInfo[][];
};

//완성된 줄을 리스트로 보여주는 컴포넌트
export default function CompletedLinesList({
	completedLines,
}: CompletedLinesListProps) {
	return (
		<CompletedLinesListSection>
			<div className="completed-lines-header">
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
		</CompletedLinesListSection>
	);
}
