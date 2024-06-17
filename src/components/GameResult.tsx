import { useLastGame } from "../hooks/game/selectors";

const GameResult = () => {
  const lastGame = useLastGame();
  if (!lastGame) return <></>;
  const { winningBets, losingBets, tieBets, winningAmount } = lastGame;

  if (winningBets.length) {
    const { move } = winningBets[0] || {};
    return (
      <div
        tabIndex={0}
        className="flex justify-center items-center flex-col mb-12 mt-16"
      >
        <div className="text-4xl font-bold text-green-300">{move} WON</div>
        <div className="text-primary text-2xl">
          YOU WIN <span className="text-white">{winningAmount}</span>{" "}
        </div>
      </div>
    );
  } else if (losingBets.length) {
    const { move, amount: lossAmount } = losingBets[0] || {};
    return (
      <div
        tabIndex={0}
        className="flex justify-center items-center flex-col mb-12 mt-16"
      >
        <div className="text-4xl font-bold text-red-300">{move} LOST</div>
        <div className="text-primary text-2xl">
          YOU LOST <span className="text-white">{lossAmount}</span>{" "}
        </div>
      </div>
    );
  } else {
    const { move } = tieBets[0] || {};
    return (
      <div
        tabIndex={0}
        className="flex justify-center items-center flex-col mb-12 mt-16"
      >
        {move && (
          <div className="text-4xl font-bold text-blue-300">{move} TIED</div>
        )}
        <div className="text-primary text-2xl">YOU TIED </div>
      </div>
    );
  }
};
export default GameResult;
