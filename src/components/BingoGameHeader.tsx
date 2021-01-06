import React from 'react';
import styled from 'styled-components';
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

type BingoGameHeaderProps = {
	isPlaying: boolean;
	onClick: () => void;
};
export default function BingoGameHeader({
	isPlaying,
	onClick,
}: BingoGameHeaderProps) {
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
