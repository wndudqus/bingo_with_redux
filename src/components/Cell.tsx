import React from 'react';
import styled from 'styled-components';

const CellStyleButton = styled.button`
	width: 3vw;
	height: 3vw;
	min-width: 50px;
	min-height: 50px;
	margin: 0.2rem;
	border: none;
	color: rgb(41, 42, 45);
	font-size: 1rem;
	border-radius: 0.2rem;
	cursor: pointer;
	background-color: ${(props) => props.color || '#F82F62'};

	&:focus {
		outline: none;
	}
	&:active {
		outline: none;
		background-color: ${(props) => props.color || 'rgb(51, 52, 55);'};
	}
`;

export type CellProps = {
	id: number;
	boardNumber: number;
	isChecked: boolean;
	selectCell: (selectedCell: CellInfo) => void;
};
export type CellInfo = {
	id: number;
	boardNumber: number;
	isChecked: boolean;
};

export default function Cell({
	id,
	boardNumber,
	isChecked,
	selectCell,
}: CellProps) {
	return (
		<CellStyleButton
			color={isChecked ? '#F82F62' : 'white'}
			onClick={() => selectCell({ id, boardNumber, isChecked })}
		>
			{id ? id : ''}
		</CellStyleButton>
	);
}
