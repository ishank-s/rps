import useGameState, { useTotalBet } from "../hooks/useGameState";

const GameScoreBanner = () => {
  const balance = useGameState((state) => state.balance);
  const winningBets = useGameState((state) => state.winningBets);
  const totalBet = useTotalBet();
  return (
    <div className="flex">
      <h3>Balance:</h3>
      <label>{balance}</label>
      <h3>Bet:</h3>
      <label>{totalBet}</label>
      <h3>Win:</h3>
      <label>{winningBets.length}</label>
    </div>
  );
};
export default GameScoreBanner;
