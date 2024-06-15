import { MOVE, MOVES_LIST } from "./consts";

const PLAYOFF = [
  [0, 1, -1],
  [-1, 0, 1],
  [1, -1, 0],
];

export enum RESULT {
  WIN = "WIN",
  LOSS = "LOSS",
  TIE = "TIE",
}

export const playRPS = (player1Choice: MOVE, player2Choice: MOVE) => {
  const player1Index = MOVES_LIST.findIndex((move) => move === player1Choice);
  const player2Index = MOVES_LIST.findIndex((move) => move === player2Choice);

  if (player1Index === -1 || player2Index === -1) {
    throw new Error("Invalid move");
  }

  const outcome = PLAYOFF[player1Index][player2Index];

  if (outcome === -1) {
    return RESULT.WIN;
  } else if (outcome === 0) {
    return RESULT.TIE;
  } else {
    return RESULT.LOSS;
  }
};

export const generateAIMove = () => {
  const randomIndex = Math.floor(Math.random() * MOVES_LIST.length);
  return new Promise<MOVE>((resolve) => {
    setTimeout(() => {
      // resolve(MOVE.SCISSORS);
      resolve(MOVES_LIST[randomIndex]);
    }, 500);
  });
};


export const wait = (timeout:number)=>{
  return new Promise<void>((resolve)=>{
    setTimeout(()=>resolve(),timeout)
  })
}