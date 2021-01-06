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
|___isPlaying:boolean
|___currentPlayer:number
|___currentRound:number
|___Players:BingoPlayerAreaInfo[]
        |___playerNumber: number;
	    |___isCurrentPlayer: boolean;
	    |___cells: CellInfo[][];
	    |___completedLine: CellInfo[][];

