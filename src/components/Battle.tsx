import useLocalStorageState from "use-local-storage-state";
import type { TLocalData } from "./GameScreen";
import data from "./data/allData.json";
import { useEffect, useState } from "react";

const monsterList = data.monsters;

type TMonster = (typeof monsterList)[0] & { currentHp: number };

const Battle = () => {
  const [localData, setLocalData] = useLocalStorageState<TLocalData>("ygris");

  const [currentMonster, setCurrentMonster] = useState<TMonster>({
    ...monsterList[0],
    currentHp: monsterList[0]?.hp || 0,
  } as TMonster);

  const handleMonsterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const monster = monsterList.find(
      (monster) => monster.name === e.target.value
    );
    if (monster) {
      setCurrentMonster({
        ...monster,
        currentHp: monster.hp,
      });
    }
  };

  const handleAttack = () => {
    if (!localData) {
      alert("attack failed, no local data");
      return;
    }

    const damage = Math.floor(Math.random() * 10) + 1;
    const newMonsterHp = currentMonster.currentHp - damage;

    setCurrentMonster({ ...currentMonster, currentHp: newMonsterHp });
  };

  useEffect(() => {
    if (currentMonster.currentHp <= 0) {
      alert("you win");
    }
  }, [currentMonster])

  return (
    <>
      <div>
        <div>BATTLE</div>

        <select onChange={handleMonsterChange}>
          {monsterList.map((monster) => (
            <option key={monster.name} value={monster.name}>
              {monster.name}
            </option>
          ))}
        </select>

        <div>
          <h1>Player</h1>
          <div>level: {localData?.level}</div>
          <div>
            hp: {localData?.currentHp}/{localData?.maxHp}
          </div>
        </div>

        <div>
          <h1>Monster</h1>
          <div>name: {currentMonster.name}</div>
          <div>
            hp: {currentMonster?.currentHp}/{currentMonster.hp}
          </div>
        </div>

        <button onClick={handleAttack} className="rounded bg-red-400 py-2 px-4">
          Attack
        </button>
      </div>
    </>
  );
};

export default Battle;
