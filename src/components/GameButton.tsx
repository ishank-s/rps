import useGameState, { GAME_STAGE } from "../hooks/game/useGameState";

const GameButton = () => {
  const playGame = useGameState((state) => state.playGame);
  const clearBet = useGameState((state) => state.clearBet);
  const bets = useGameState((state)=> state.bets)
  const currentGameStage = useGameState((state) => state.currentGameStage);
  switch (currentGameStage) {
    case GAME_STAGE.RESULT:
      return (
        <button
          className="h-16 w-40 bg-black text-primary border-primary border-solid border-2 rounded-full font-bold"
          onClick={() => {
            clearBet();
          }}
        >
          CLEAR
        </button>
      );
    case GAME_STAGE.BETTING:
    default:
      return (
        <button tabIndex={0}
          className="h-16 w-40 bg-black text-primary border-primary border-solid border-2 rounded-full font-bold"
          disabled={!bets.length}
          onClick={() => {
            playGame();
          }}
        >
          PLAY
        </button>
      );
  }
};
export default GameButton;
