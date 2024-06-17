import { useTotalBet, useTotalWin } from "../../hooks/game/selectors";
import useGameState from "../../hooks/game/useGameState";

const GameScoreBanner = () => {
  const balance = useGameState((state) => state.balance);
  const totalWin = useTotalWin();
  const totalBet = useTotalBet();
  return (
    <div className="flex justify-center gap-16 bg-black w-full py-1 text-white">
      <div className="grid grid-cols-3 gap-12">
        <div tabIndex={0} className="flex justify-end">
          <h3 className="text-primary">BALANCE:</h3>
          <label>{balance}</label>
        </div>
        <div tabIndex={0} className="flex justify-center">
          {/* If we capitalise this it will make the screen reader go 'B E T' */}
          <h3 className="text-primary">BET:</h3>
          <label>{totalBet}</label>
        </div>
        <div tabIndex={0} className="flex justify-start">
          <h3 className="text-primary">WIN:</h3>
          <label>{totalWin > 0 ? totalWin : 0}</label>
        </div>
      </div>
    </div>
  );
};
export default GameScoreBanner;
