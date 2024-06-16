import { nanoid } from "nanoid";
import useGameState, { GAME_STAGE } from "../hooks/game/useGameState";
import { BET_UNIT_SIZE, MOVE, MOVES_LIST } from "../utils/game/consts";
import { useLastGame } from "../hooks/game/selectors";

const MoveColors = {
  [MOVE.ROCK]: "blue",
  [MOVE.PAPER]: "green",
  [MOVE.SCISSORS]: "red",
};

const colorClassMap = MOVES_LIST.reduce<
  Record<string, { bg: string; border: string; color: string }>
>((colorClassMap, move) => {
  const classes = {
    bg: `bg-${MoveColors[move]}-950`,
    border: `border-${MoveColors[move]}-600`,
    color: `text-${MoveColors[move]}-600`,
  };
  colorClassMap[move] = classes;
  return colorClassMap;
}, {});

const BetButtons = () => {
  const placeBet = useGameState((state) => state.placeBet);
  const canPlaceBet = useGameState((state) => state.canPlaceBet);
  const bets = useGameState((state) => state.bets);
  const currentGameStage = useGameState((state) => state.currentGameStage);
  const {winningMove } = useLastGame() || {};

  return (
    <div className="flex flex-row justify-center gap-4">
      {MOVES_LIST.map((move) => {
        const betDisabled = currentGameStage !== GAME_STAGE.BETTING || !canPlaceBet({ move, amount: BET_UNIT_SIZE });
        const betWithCurrentMove = bets.find((bet) => bet.move === move);
        const classes = colorClassMap[move];
        const isWinningMove = winningMove === move 
        return (
          <button
            className={`h-44 w-56 border-solid ${isWinningMove ? 'border-[6px]' : 'border-2'} font-bold ${classes.border} ${classes.bg}`}
            key={move}
            disabled={betDisabled}
            onClick={() => {
              placeBet({ move, amount: BET_UNIT_SIZE, id: nanoid() });
            }}
          >
            <div className="flex flex-col gap-3">
              <div
                aria-label={`${betWithCurrentMove?.amount || "nothing"} on`}
                className={`${
                  !betWithCurrentMove?.amount && `opacity-0`
                } flex items-center justify-center rounded-full bg-white h-12 w-12 m-auto border-solid border-4 ${
                  classes.border
                } text-black`}
              >
                {betWithCurrentMove?.amount}
              </div>
              <div className={`text-2xl ${classes.color}`}>{move}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
export default BetButtons;
