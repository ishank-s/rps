import "./App.css";
import BetButtons from "./components/BetButtons";
import GameButton from "./components/GameButton";
import GameScoreBanner from "./components/GameScoreBanner";
import VersusScreen from "./components/VersusScreen";


function App() {

  return (
    <div className="flex flex-col h-full">
      <GameScoreBanner />
      <VersusScreen/>
      <BetButtons />
      <GameButton/>
    </div>
  );
}

export default App;
