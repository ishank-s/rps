import { INITIAL_BALANCE } from "../../utils/consts";
import useGameState from "./useGameState";

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

export const useTotalWin = () =>
  useGameState((state) => state.balance - INITIAL_BALANCE);

export const useLastGame = () =>
  useGameState((state) => state.prevGames[state.prevGames.length - 1]);
