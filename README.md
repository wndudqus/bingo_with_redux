# WATCHA BINGO

## 설명

react, typescript, redux, styled-components 등을 이용해 빙고 게임을 만들었습니다. 

## 사용 스택
 * Typescript
 * React
 * styled-components
 * reset-css
 * redux
 * react-redux
 * redux-devtools-extension

## redux store data structure

BingoGameState
* isPlaying:boolean
* currentPlayer:number
* currentRound:number
* Players:BingoPlayerAreaInfo[]
	* playerNumber: number;
	    * isCurrentPlayer: boolean;
	    * cells: CellInfo[][];
	    * completedLine: CellInfo[][];

