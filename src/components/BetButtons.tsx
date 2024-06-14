import { nanoid } from "nanoid";
import useGameState from "../hooks/useGameState";
import { BET_UNIT_SIZE, MOVES_LIST } from "../utils/consts";

const BetButtons = () => {
  const placeBet = useGameState((state) => state.placeBet);
  const canPlaceBet = useGameState((state) => state.canPlaceBet);
  const bets = useGameState((state) => state.bets);

  return MOVES_LIST.map((move) => {
    const betDisabled = !canPlaceBet({ move, amount: BET_UNIT_SIZE });
    const totalBetOnMove =
      bets.filter((bet) => bet.move === move).length * BET_UNIT_SIZE;
    return (
      <button
        disabled={betDisabled}
        onClick={() => {
          placeBet({ move, amount: BET_UNIT_SIZE, id: nanoid() });
        }}
      >
        {move} {totalBetOnMove}
      </button>
    );
  });
};
export default BetButtons;
