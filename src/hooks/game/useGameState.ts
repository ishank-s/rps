import { create } from "zustand";
import { INITIAL_BALANCE, MOVE } from "../../utils/game/consts";
import {
  computeResults,
  generateAIMove,
  validateBet,
  wait,
} from "../../utils/game/game";
import { Optional } from "../../utils/types";

export type Bet = {
  move: MOVE;
  amount: number;
  id: string;
};

type GameState = {
  losingBets: Bet[];
  winningBets: Bet[];
  tieBets: Bet[];
  bets: Bet[];
  currentGameStage: GAME_STAGE;
  prevGames: SavedGame[];
  balance: number;
  lastAiMove?: MOVE;
};

type GameActions = {
  placeBet: (bet: Bet) => void;
  canPlaceBet: (bet: Optional<Bet, "id">) => boolean;
  playGame: () => void;
  clearBet: () => void;
};

export enum GAME_STAGE {
  BETTING = "BETTING",
  PLAYING = "PLAYING",
  MATCHUP = "MATCHUP",
  RESULT = "RESULT",
}

export type GameStore = GameState & GameActions;

export type SavedGame = {
  bets: Bet[];
  aiMove: MOVE;
  winningBets: Bet[];
  losingBets: Bet[];
  tieBets: Bet[];
};

const initGameState = {
  lastAiMove: undefined,
  bets: [],
  currentGameStage: GAME_STAGE.BETTING,
};

const useGameState = create<GameStore>((set, get) => ({
  balance: INITIAL_BALANCE,
  winningBets: [],
  losingBets: [],
  tieBets: [],
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
    const { winningBets, losingBets, tieBets } = computeResults(
      state.bets,
      aiMove
    );

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
          ) +
          tieBets.reduce(
            (accBetAmount, currentBet) => currentBet.amount + accBetAmount,
            0
          ),
        prevGames: [
          ...state.prevGames,
          {
            bets: state.bets,
            aiMove,
            winningRate,
            winningBets,
            losingBets,
            tieBets,
          },
        ],
        winningBets: [...state.winningBets, ...winningBets],
        losingBets: [...state.losingBets, ...losingBets],
        tieBets: [...state.tieBets, ...tieBets],
        currentGameStage: GAME_STAGE.MATCHUP,
      };
    });
    await wait(1000);
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
      const newBets = Array.from(state.bets);
      const sameMoveBet = newBets.find((bet) => bet.move === currentBet.move);
      if (sameMoveBet) {
        sameMoveBet.amount += currentBet.amount;
      } else {
        newBets.push(currentBet);
      }
      const newState = {
        balance: (state.balance -= currentBet.amount),
        bets: newBets,
      };
      return newState;
    });
  },
}));

export default useGameState;
