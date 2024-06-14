import { MOVE, MOVES_LIST } from "./consts";

const PLAYOFF = [
  [ 0, 1, -1],
  [ -1, 0, 1],
  [ 1, -1, 0],
];

export enum RESULT {
  WIN = "WIN",
  LOSS = "LOSS",
  TIE = "TIE",
}

export const playRPS = (player1Choice: MOVE, player2Choice: MOVE) => {
  // Find the index of the player choices in the playoff matrix
  // Get the indices of the player choices
  const player1Index = MOVES_LIST.findIndex((move)=>move === player1Choice);
  const player2Index = MOVES_LIST.findIndex((move)=>move === player2Choice);

  // Check if either choice is invalid
  if (player1Index === -1 || player2Index === -1) {
    throw new Error("Invalid move");
  }

  // Determine the outcome from the playoff matrix
  const outcome = PLAYOFF[player1Index][player2Index];

  // Return the result based on the outcome
  if (outcome === 1) {
    return RESULT.WIN;
  } else if (outcome === 0) {
    return RESULT.TIE;
  } else {
    return RESULT.LOSS;
  }
};

export const generateAIMove = () => {
  const randomIndex = Math.floor(Math.random() * MOVES_LIST.length);
  return MOVES_LIST[randomIndex];
};


