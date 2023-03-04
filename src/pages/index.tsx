import React, { useState } from "react";
import GameScreen from "~/components/GameScreen";
import { StartScreen } from "~/components/StartScreen";

type TAttributes = {
  hp: number;
  mp: number;
  str: number;
  dex: number;
  int: number;
};

type TPlayer = {
  name: string;
  stats: TAttributes;
};

type Props = {
  children?: React.ReactNode;
};

export type Screen = {
  setScreen?: (screen: string) => void;
};

const Layout: React.FC<Props> = ({ children }) => {
  return <div className="grid justify-center align-middle">{children}</div>;
};

const Home = () => {
  const [screen, setScreen] = useState("start");

  const [player, setPlayer] = useState<TPlayer>({
    name: "Lester",
    stats: {
      hp: 100,
      mp: 50,
      str: 10,
      dex: 5,
      int: 5,
    },
  });

  if (screen === "start") {
    return (
      <Layout>
        <StartScreen setScreen={setScreen} />
      </Layout>
    );
  }

  if (screen === "game") {
    return (
      <Layout>
        <GameScreen />
      </Layout>
    );
  }

  return (
    <div className="grid justify-center align-middle">
      {<StartScreen setScreen={setScreen} />}
    </div>
  );
};

export default Home;
