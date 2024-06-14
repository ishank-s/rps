import { MOVE, MOVES_LIST } from "./consts";

const PLAYOFF = [
  [MOVE.ROCK, -1, 1, 1],
  [MOVE.PAPER, 1, -1, -1],
  [MOVE.SCISSORS, -1, 1, 0],
];

enum RESULT {
  FIRST = "FIRST",
  SECOND = "SECOND",
  TIE = "TIE",
}

export const playRPS = (player2Choice: MOVE, player1Choice: MOVE) => {
  const player1Index = PLAYOFF.findIndex((row) => row[0] === player1Choice);
  const player2Index = PLAYOFF[0].findIndex(
    (choice) => choice === player2Choice
  );

  if (player1Index === -1 || player2Index === -1) {
    return;
  }

  const outcome = PLAYOFF[player1Index][player2Index + 1];

  if (outcome === 1) {
    return RESULT.FIRST;
  } else if (outcome === 0) {
    return RESULT.TIE;
  } else {
    return RESULT.SECOND;
  }
};

export const generateAIMove = () => {
  const randomIndex = Math.floor(Math.random() * MOVES_LIST.length);
  return MOVES_LIST[randomIndex];
};
