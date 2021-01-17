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
* [-- 프로젝트 설명 --](https://wndudqus.github.io/Blog-Around/project/bingo_with_redux/)

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
BINGO
|
isPlaying:boolean; // 현재 게임이 시작된 상태인지 나타낸다.
|
currentPlayer:number;// 현재 시점에 게임을 하고 있는 플레이어
|
currentRound:number// 현재 게임이 시작된 후 몇 라운드째 인지
|
Players:BingoPlayerAreaInfo[]// 한 플레이어가 소유한 게임의 화면 영역(플레이어 번호, 보드영역 컴포넌트, 완성된 줄 컴포넌트)들의state
|____playerNumber: number; //플레이어 번호
|____isCurrentPlayer: boolean;// 현재 차례의 플레이어인지 (없었어도 될 것 같긴 함.. 이제 와서 보니 데이터 중복)
|____cells: CellInfo[][];// 플레이어가 가지는
    |____id: number //각 셀에 할당되는 번호 (한 보드 내에서 유일하다.)
    |____boardNumber:number; //해당 셀이 속하는 보드 번호
    |____isChecked:boolean; //해당 셀이 체크가 되었는지
|____completedLine: CellInfo[][]; //본 사용자가 완성한 줄 목록
