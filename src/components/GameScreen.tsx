import React, { useState } from "react";

const menu = [
  { name: "battle", },
  { name: "inventory", },
  { name: "map", },
  { name: "shop", },
];

const GameScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState("");

  const handleMenuClick = (name: string) => {
    if (name === selectedMenu) return

    setSelectedMenu(name)
  }

  return (
    <div className="h-screen w-screen bg-slate-300 p-12">
      <div className="grid grid-cols-3">
        <div className="w-fit rounded border border-solid border-black p-4">
          {menu.map((item) => (
            <div key={item.name}>
              <button
                className="mb-2 rounded bg-orange-300 px-3 py-2"
                onClick={() => handleMenuClick(item.name)}
              >
                {item.name}
              </button>
            </div>
          ))}
        </div>

        <div>{selectedMenu}</div>
      </div>
    </div>
  );
};

export default GameScreen;
