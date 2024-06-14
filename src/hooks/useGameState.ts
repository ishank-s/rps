import { create } from "zustand";
import { BET_UNIT_SIZE, MOVE, MOVES_LIST } from "../utils/consts";

type Bet = {
  move: MOVE;
};

type GameState = { bets: Bet[]; balance: number };
type GameActions = {
  placeBet: (bet: Bet) => void;
  canPlaceBet: (bet:Bet) => boolean;
};

type GameStore = GameState & GameActions;

const useGameState = create<GameStore>((set, get) => ({
  balance: 5000,
  bets: [],
  canPlaceBet: (bet) => {
    const state = get();
    return validateBet(state,bet);
  },
  placeBet: (bet: Bet) => {
    const state = get();
    validateBet(state,bet);
    set((state) => {
      const newState = {
        balance: (state.balance -= BET_UNIT_SIZE),
        bets: [...state.bets, bet],
      };
      console.log(newState);
      return newState;
    });
  },
}));

const validateBet = (state: GameStore,bet:Bet) => {
  if (state.balance < BET_UNIT_SIZE) {
    return false;
  }
  const allMoves = [...state.bets.map(({ move }) => move),bet.move]
  const uniqueMoves = new Set(allMoves);
  if (MOVES_LIST.length === uniqueMoves.size) {
    return false;
  }
  return true;
};

export const useHasEnoughBalance = () =>
  useGameState((state) => {
    return state.balance >= BET_UNIT_SIZE;
  });

export default useGameState;


export const useRockBets =  ()=>useGameState((state) => {
  return state.balance >= BET_UNIT_SIZE;
});
