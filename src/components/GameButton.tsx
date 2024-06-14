import useGameState, { GAME_STAGE } from "../hooks/useGameState";

const GameButton = () => {
  const playGame = useGameState((state) => state.playGame);
  const clearBet = useGameState((state) => state.clearBet);
  const currentGameStage = useGameState((state) => state.currentGameStage);
  switch (currentGameStage) {
    case GAME_STAGE.RESULT:
      return (
        <button
          onClick={() => {
            clearBet();
          }}
        >
          Reset
        </button>
      );
    case GAME_STAGE.BETTING:
    default:
      return (
        <button
          onClick={() => {
            playGame();
          }}
        >
          Play
        </button>
      );
  }
};
export default GameButton;
