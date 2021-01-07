# WATCHA BINGO

## 설명

react, typescript, redux, styled-components 등을 이용해 빙고 게임을 만들었습니다. 

게임 방법:
1. 게임 시작을 누른다.
2. 배경이 하이라이팅 되는 플레이어가 원하는 번호를 선택한다.
3. 5개 이상의 연결된 줄을 먼저 만드는 플레이어가 승리한다.

승리 조건:
먼저 5개 이상의 빙고를 완료한 사용자가 승리.
if 동시에 5개이상의 빙고를 완료하면 무승부로 처리

* [ -- 빙고게임 링크 --](https://wndudqus.github.io/bingo_with_redux/)

## 사용 스택
 * Typescript
 * React
 * styled-components
 * reset-css
 * redux
 * react-redux
 * redux-devtools-extension
 * gh-pages

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

