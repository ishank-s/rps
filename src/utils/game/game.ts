import { Bet, GameStore } from "../../hooks/game/useGameState";
import { DOUBLE_WINNING_RATE, MOVE, MOVES_LIST, SINGLE_WINNING_RATE } from "./consts";
import { Optional } from "../types";


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
      resolve(MOVES_LIST[randomIndex]);
    }, 500);
  });
};

export const wait = (timeout: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
};

export const validateBet = (state: GameStore, bet: Optional<Bet, "id">) => {
  if (state.balance < bet.amount) {
    return false;
  }
  const allMoves = [...state.bets.map(({ move }) => move), bet.move];
  const uniqueMoves = new Set(allMoves);
  if (MOVES_LIST.length === uniqueMoves.size) {
    return false;
  }
  return true;
};

const getWinningRate = (bets: Bet[]) => {
  let winningRate;
  const uniqueBets = new Set(bets).size;
  if (uniqueBets === 1) {
    winningRate = SINGLE_WINNING_RATE;
  } else {
    winningRate = DOUBLE_WINNING_RATE;
  }
  return winningRate;
};

export const computeResults = (bets: Bet[], aiMove: MOVE) => {
  const winningBets: Bet[] = [];
  const losingBets: Bet[] = [];
  const tieBets: Bet[] = [];
  let winningMove: MOVE | undefined;
  let winningAmount = 0;
  let betAmount = 0;
  const winningRate = getWinningRate(bets);
  for (const bet of bets) {
    const result = playRPS(bet.move, aiMove);
    betAmount += bet.amount;
    if (result === RESULT.WIN) {
      winningBets.push(bet);
      winningMove = bet.move;
      winningAmount = bet.amount * winningRate;
    } else if (result === RESULT.TIE) {
      if (bets.length === 1) {
        tieBets.push(bet);
        betAmount -= bet.amount;
      } else {
        losingBets.push(bet);
      }
      if (!winningMove && bets.length === 1) {
        winningMove = aiMove;
      }
    } else {
      losingBets.push(bet);
      if (!winningMove) {
        winningMove = aiMove;
      }
    }
  }
  return {
    winningBets,
    losingBets,
    tieBets,
    winningMove,
    winningAmount: winningAmount - betAmount,
  };
};
