import useGameState, { GAME_STAGE } from "../hooks/useGameState";
const PlayingStageScreen = () => {
  const bets = useGameState((state) => state.bets);
  const lastAiMove = useGameState((state) => state.lastAiMove);
  if (!lastAiMove) {
    return <>Getting AI Move </>;
  }
  return (
    <>
      {bets.map((bet) => {
        return (
          <div>
            {lastAiMove} VS {bet.move}
          </div>
        );
      })}
    </>
  );
};
const VersusScreen = () => {
  const currentGameStage = useGameState((state) => state.currentGameStage);
  switch (currentGameStage) {
    case GAME_STAGE.BETTING:
      return "PICK YOUR POSITIONS";
    case GAME_STAGE.PLAYING:
    case GAME_STAGE.RESULT:
      return <PlayingStageScreen />;
  }
};
export default VersusScreen;