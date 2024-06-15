import { useLastGame } from "../hooks/gameState/selectors";
import useGameState, { SavedGame } from "../hooks/gameState/useGameState";

const getBetToDisplay = (lastGame: SavedGame) => {
  const { winningBets, tieBets, losingBets,aiMove } = lastGame;
  if (winningBets?.[0]) {
    return winningBets[0];
  } else if (tieBets?.[0]) {
    return tieBets[0];
  } else if (losingBets?.[0]) {
    return losingBets.find(bet=>bet.move===aiMove) || losingBets[0];
  }
};

const PlayingStageScreen = () => {
  const lastAiMove = useGameState((state) => state.lastAiMove);
  const lastGame = useLastGame();

  if (!lastAiMove) {
    return (
      <div className="flex justify-center text-primary p-4 self-end font-medium">
        GETTING AI MOVE{" "}
      </div>
    );
  }
  const bet = lastGame && getBetToDisplay(lastGame);
  if (!bet) {
    return <></>;
  }
  return (
    <div
      className="grid grid-cols-5 text-2xl font-bold text-white"
      key={bet.id}
    >
      <div className="flex justify-end items-center col-span-2">
        {lastAiMove}
      </div>
      <div className="text-primary font-bold text-lg flex justify-center items-center">
        VS
      </div>
      <div className="flex justify-start items-center col-span-2">
        {bet.move}
      </div>
    </div>
  );
};

export default PlayingStageScreen;
