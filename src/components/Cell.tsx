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
	&:hover {
		color: rgb(61, 62, 65);
		border-style: solid;
		border-color: rgb(248, 47, 98);
		border-width: 2px;
	}
`;

//cell을 저장 할 때 타입.
export type CellInfo = {
	id: number;
	boardNumber: number;
	isChecked: boolean;
};

//props type
export type CellProps = {
	id: number;
	boardNumber: number;
	isChecked: boolean;
	selectCell: (selectedCell: CellInfo) => void;
};

export default function Cell({
	id,
	boardNumber,
	isChecked,
	selectCell,
}: CellProps) {
	const onClick = () => {
		return isChecked ? () => {} : selectCell({ id, boardNumber, isChecked });
	};
	return (
		<CellStyleButton color={isChecked ? '#F82F62' : 'white'} onClick={onClick}>
			{id ? id : ''}
		</CellStyleButton>
	);
}
