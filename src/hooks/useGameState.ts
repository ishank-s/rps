import { create } from "zustand";
import { BET_UNIT_SIZE, MOVE, MOVES_LIST } from "../utils/consts";
import { generateAIMove, playRPS, RESULT } from "../utils/game";

export type Bet = {
  move: MOVE;
  amount: number;
};

type GameState = {
  losingBets: Bet[];
  winningBets: Bet[];
  bets: Bet[];
  prevGames: PrevGame[];
  balance: number;
};
type GameActions = {
  placeBet: (bet: Bet) => void;
  canPlaceBet: (bet: Bet) => boolean;
  playGame: () => void;
};

type GameStore = GameState & GameActions;

type PrevGame = {
  bets: Bet[];
  aiMove: MOVE;
};

const useGameState = create<GameStore>((set, get) => ({
  balance: 5000,
  bets: [],
  winningBets: [],
  losingBets: [],
  prevGames: [],
  playGame: () => {
    const state = get();
    const aiMove = generateAIMove();
    
    const winningBets: Bet[] = [];
    const losingBets: Bet[] = [];
    for (const bet of state.bets) {
      const result = playRPS(bet.move, aiMove);
      if (result === RESULT.WIN) {
        winningBets.push(bet);
      } else {
        losingBets.push(bet);
      }
    }
    set((state) => ({
      prevGames: [...state.prevGames, { bets: state.bets, aiMove }],
      balance:
        state.balance +
        winningBets.reduce(
          (accBetAmount, currentBet) => currentBet.amount + accBetAmount,
          0
        ),
      winningBets: [...state.winningBets, ...winningBets],
      losingBets: [...state.losingBets, ...losingBets],
      bets: [],
    }));
  },
  canPlaceBet: (bet) => {
    const state = get();
    return validateBet(state, bet);
  },
  placeBet: (bet: Bet) => {
    const state = get();
    validateBet(state, bet);
    set((state) => {
      const newState = {
        balance: (state.balance -= bet.amount),
        bets: [...state.bets, bet],
      };
      return newState;
    });
  },
}));

const validateBet = (state: GameStore, bet: Bet) => {
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

export default useGameState;

export const useRockBets = () =>
  useGameState((state) => {
    return state.balance >= BET_UNIT_SIZE;
  });

export const useTotalBet = () =>
  useGameState((state) => {
    return state.bets.reduce(
      (accBetAmount, currBet) => accBetAmount + currBet.amount,
      0
    );
  });

export const useBetMoves = () =>
  useGameState((state) => {
    const allMoves = [...state.bets.map(({ move }) => move)];
    const uniqueMoves = new Set(allMoves);
    return [...uniqueMoves];
  });
