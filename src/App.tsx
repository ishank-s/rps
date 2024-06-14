import "./App.css";
import GameScoreBanner from "./components/GameScoreBanner";
import useGameState, { useHasEnoughBalance } from "./hooks/useGameState";
import { BET_UNIT_SIZE, MOVES_LIST } from "./utils/consts";

function App() {
  const placeBet = useGameState((state) => state.placeBet);
  const canPlaceBet = useGameState((state) => state.canPlaceBet);
  const bets = useGameState((state) => state.bets);
  return (
    <div className="flex flex-col h-full">
      <GameScoreBanner />
      {MOVES_LIST.map((move) => {
        const betDisabled = !canPlaceBet({ move });
        const totalBetOnMove =
          bets.filter((bet) => bet.move === move).length * BET_UNIT_SIZE;

        console.log({ move, betDisabled });
        return (
          <button
            disabled={betDisabled}
            onClick={() => {
              placeBet({ move });
            }}
          >
            {move} {totalBetOnMove}
          </button>
        );
      })}
    </div>
  );
}

export default App;
