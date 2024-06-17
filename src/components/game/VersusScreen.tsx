import useGameState, { GAME_STAGE } from "../../hooks/game/useGameState";
import GameResult from "./GameResult";
import PlayingStageScreen from "./PlayingStageScreen";

const VersusScreen = () => {
  const currentGameStage = useGameState((state) => state.currentGameStage);
  switch (currentGameStage) {
    case GAME_STAGE.BETTING:
      return (
        <div className="flex justify-center text-primary p-4 self-end font-medium">
          PICK YOUR POSITIONS
        </div>
      );
      case GAME_STAGE.RESULT:
        return <GameResult />;
      case GAME_STAGE.MATCHUP:
    case GAME_STAGE.PLAYING:
      return <PlayingStageScreen />;
  }
};
export default VersusScreen;
