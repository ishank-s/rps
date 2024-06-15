import { useTotalBet, useTotalWin } from "../hooks/gameState/selectors";
import useGameState from "../hooks/gameState/useGameState";

const GameScoreBanner = () => {
  const balance = useGameState((state) => state.balance);
  const totalWin = useTotalWin();
  const totalBet = useTotalBet();
  return (
    <div className="flex justify-center gap-16 bg-black w-full py-1 text-white">
      <div className="flex">
        <h3 className="text-primary">BALANCE:</h3>
        <label>{balance}</label>
      </div>
      <div className="flex">
        <h3 className="text-primary">BET:</h3>
        <label>{totalBet}</label>
      </div>
      <div className="flex">
        <h3 className="text-primary">WIN:</h3>
        <label>{totalWin > 0 ? totalWin : 0}</label>
      </div>
    </div>
  );
};
export default GameScoreBanner;
