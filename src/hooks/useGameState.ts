import { create } from "zustand";
import { BET_UNIT_SIZE, MOVE, MOVES_LIST } from "../utils/consts";
import { generateAIMove, playRPS, RESULT } from "../utils/game";

export type Bet = {
  move: MOVE;
  amount: number;
  id: string;
};

type GameState = {
  losingBets: Bet[];
  winningBets: Bet[];
  bets: Bet[];
  currentGameStage: GAME_STAGE;
  prevGames: PrevGame[];
  balance: number;
  lastAiMove?: MOVE;
};
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type GameActions = {
  placeBet: (bet: Bet) => void;
  canPlaceBet: (bet: Optional<Bet, "id">) => boolean;
  playGame: () => void;
  clearBet: () => void;
};

export enum GAME_STAGE {
  BETTING = "BETTING",
  PLAYING = "PLAYING",
  RESULT = "RESULT",
}

type GameStore = GameState & GameActions;

type PrevGame = {
  bets: Bet[];
  aiMove: MOVE;
};

const initGameState = {
  lastAiMove: undefined,
  bets:[],
  currentGameStage: GAME_STAGE.BETTING,
}

const useGameState = create<GameStore>((set, get) => ({
  balance: 5000,
  winningBets: [],
  losingBets: [],
  prevGames: [],
  ...initGameState,
  playGame: async () => {
    const state = get();
    set(() => ({
      currentGameStage: GAME_STAGE.PLAYING,
    }));
    const aiMove = await generateAIMove();
    set(() => ({
      lastAiMove: aiMove,
    }));
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

    set((state) => {
      let winningRate;
      const uniqueBets = new Set(state.bets).size;
      if (uniqueBets === 1) {
        winningRate = 14;
      } else {
        winningRate = 3;
      }
      return {
        balance:
          state.balance +
          winningBets.reduce(
            (accBetAmount, currentBet) =>
              currentBet.amount * winningRate + accBetAmount,
            0
          ),
        prevGames: [
          ...state.prevGames,
          { bets: state.bets, aiMove, winningRate },
        ],
        winningBets: [...state.winningBets, ...winningBets],
        losingBets: [...state.losingBets, ...losingBets],
      };
    });
    set(() => ({
      currentGameStage: GAME_STAGE.RESULT,
    }));
  },
  clearBet: () => {
    set(() => initGameState);
  },
  canPlaceBet: (bet) => {
    const state = get();
    return validateBet(state, bet);
  },
  placeBet: (currentBet: Bet) => {
    const state = get();
    validateBet(state, currentBet);
    set((state) => {
      const newBets = Array.from(state.bets)
      const sameMoveBet = newBets.find((bet)=> bet.move === currentBet.move)
      if(sameMoveBet){
        sameMoveBet.amount+=currentBet.amount
      }else{
        newBets.push(currentBet)
      }
      const newState = {
        balance: (state.balance -= currentBet.amount),
        bets: newBets,
      };
      return newState;
    });
  },
}));

const validateBet = (state: GameStore, bet: Optional<Bet, "id">) => {
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
