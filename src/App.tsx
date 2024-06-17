import "./App.css";
import BetButtons from "./components/game/BetButtons";
import GameButton from "./components/game/GameButton";
import GameScoreBanner from "./components/game/GameScoreBanner";
import VersusScreen from "./components/game/VersusScreen";

function App() {
  return (
    <div className="flex flex-col h-full items-center bg-gradient-to-b from-[#484848] from-40%  via-[#2d2d2d] via-60% to-[#1d1d1d]">
      <GameScoreBanner />
      <div className="h-40 mt-40 flex">
      <VersusScreen />
      </div>
      <BetButtons />
      <div className="mt-16">
      <GameButton />
      </div>
    </div>
  );
}

export default App;
