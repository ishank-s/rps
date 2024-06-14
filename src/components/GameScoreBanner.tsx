import useGameState, { useTotalBet } from "../hooks/useGameState";

const GameScoreBanner = () => {
  const balance = useGameState((state) => state.balance);
  const winningBets = useGameState((state) => state.winningBets);
  const totalBet = useTotalBet();
  return (
    <div className="flex justify-center gap-16 bg-black w-full py-1">
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
        <label>{winningBets.length}</label>
      </div>
    </div>
  );
};
export default GameScoreBanner;
