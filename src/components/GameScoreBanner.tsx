import useGameState from "../hooks/useGameState";

const GameScoreBanner = () => {
  const balance = useGameState((state) => state.balance);
  return (
    <div className="flex">
      <h3>Balance:</h3>
      <label>{balance}</label>
    </div>
  );
};
export default GameScoreBanner;
