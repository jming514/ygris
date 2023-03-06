export const StartScreen = ({
  setScreen,
}: {
  setScreen: (arg0: string) => void;
}) => {
  return (
    <div>
      <button onClick={() => setScreen("game")}>Start</button>
    </div>
  );
};
