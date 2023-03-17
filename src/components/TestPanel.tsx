import useLocalStorageState from "use-local-storage-state";
import type { TLocalData } from "./GameScreen";

const TestPanel = () => {
  const [localData, setLocalData] = useLocalStorageState<TLocalData>("ygris");

  const saveGame = () => {
    console.log("saveGame");
  };

  const getGold = () => {
    if (localData) {
      setLocalData({ ...localData, gold: localData.gold + 10 });
    }
  };

  const Button = ({ action, text }: { action: () => void; text: string }) => (
    <button onClick={action} className=" rounded outline p-1 mr-2">
      {text}
    </button>
  );

  return (
    <div className="m-4 p-4 rounded border-solid border-blue-700 border-2">
      <h2 className="text-xl mb-2">Testing Panel</h2>
      <Button action={saveGame} text="Save Game" />

      <Button action={getGold} text="+10 Gold" />
    </div>
  );
};

export default TestPanel;
