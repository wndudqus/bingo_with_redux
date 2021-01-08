import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleGame } from '../modules/bingoGame';
import Button from './Button';
const StyledHeader = styled.header`
	display: flex;
	height: 10%;
	background-color: rgb(51, 52, 55);

	.header_title {
		margin: 1rem;
		font-size: 2rem;
	}
`;

//props type
type BingoGameHeaderProps = {
	isPlaying: boolean;
};

export default function BingoGameHeader({ isPlaying }: BingoGameHeaderProps) {
	const dispatch = useDispatch();

	const onClick = useCallback(() => {
		dispatch(toggleGame());
	}, []);

	return (
		<StyledHeader>
			<h1 className="header_title">WATCHA BINGO</h1>
			<div>
				<Button color={isPlaying ? 'gray' : ''} onClick={onClick}>
					{isPlaying ? '재시작' : '시작'}
				</Button>
			</div>
		</StyledHeader>
	);
}
