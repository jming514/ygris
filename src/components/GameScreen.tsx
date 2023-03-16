import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import Data from "./data/allData.json";
import TestPanel from "./TestPanel";
import { env } from "../env.mjs";

const menu: { name: string }[] = [
  { name: "battle" },
  { name: "inventory" },
  { name: "map" },
  { name: "shop" },
];

type TShopItem = {
  id: number;
  name: string;
  price: number;
};

const shopItems: TShopItem[] = [
  {
    id: 1,
    name: "HP Potion",
    price: 10,
  },
  {
    id: 2,
    name: "MP Potion",
    price: 15,
  },
];

type TInventoryItem = {
  [key: string]: {
    id: number;
    quantity: number;
  };
};

export type TLocalData = {
  inventory: TInventoryItem;
  gold: number;
  level: number;
} & {
  [key: string]: unknown;
};

const GameScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState("character");
  const [localData, setLocalData] = useLocalStorageState<TLocalData>("ygris", {
    defaultValue: {
      level: 1,
      gold: 100,
      inventory: {},
    },
  });

  useEffect(() => {
    if (!localData) {
      setLocalData(localData);
    }
  }, [localData, setLocalData]);

  const handleMenuClick = (name: string) => {
    if (name === selectedMenu) return;

    setSelectedMenu(name);
  };

  const buyItem = (item: TShopItem) => {
    if (localData.gold < item.price) return;

    const newInventory = { ...localData.inventory };

    if (item.name in newInventory) {
      // there should be a better way to do this than type assertion
      (
        newInventory[item.name] as { id: number; quantity: number }
      ).quantity += 1;
    } else {
      newInventory[item.name] = {
        id: item.id,
        quantity: 1,
      };
    }

    setLocalData({
      ...localData,
      gold: localData.gold - item.price,
      inventory: newInventory,
    });
  };

  return (
    <div className="h-screen w-screen bg-slate-300 p-12">
      <div className="grid grid-cols-3">
        <Menu selectedMenu={selectedMenu} handleMenuClick={handleMenuClick} />
        {
          selectedMenu === "shop" ? <Shop buyItem={buyItem} /> : null
        }

        <Inventory localData={localData} />

        {env.NEXT_PUBLIC_NODE_ENV === "development" ? <TestPanel /> : null}
      </div>
    </div>
  );
};

type TInventoryProps = {
  localData: TLocalData;
};

const Inventory = ({ localData }: TInventoryProps) => {
  return (
    <div className="row-span-2">
      <div className="flex place-content-around">
        <h2 className="text-xl ">Inventory</h2>
        <span>Gold: {localData.gold}</span>
      </div>
      <div>
        {localData?.inventory &&
          Object.keys(localData.inventory).map((item, idx) => (
            <div key={idx}>
              {item} x {localData.inventory[item]?.quantity}
            </div>
          ))}
      </div>
    </div>
  );
};

type TShopProps = {
  buyItem: (item: TShopItem) => void;
};

const Shop = ({ buyItem }: TShopProps) => {
  return (
    <div>
      <div>
        <h2 className="text-xl">SHOP</h2>
      </div>
      <table className="table-auto">
        <thead>
          <tr className="border-b-4">
            <th>Item</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shopItems.map((item) => (
            <tr key={item.id} className="border-b-2">
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.price}</td>
              <td>
                <button className="px-4 py-2" onClick={() => buyItem(item)}>
                  Buy
                </button>
              </td>
            </tr>
          ))}
          {Data.shop.map((item) => (
            <tr key={item.itemRef} className="border-b-2">
              {/* <td className="px-4 py-2">{Data.items[]}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type TMenuProps = {
  selectedMenu: string;
  handleMenuClick: (name: string) => void;
};

const Menu = ({ selectedMenu, handleMenuClick }: TMenuProps) => {
  return (
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
      <div>{selectedMenu}</div>
    </div>
  );
};

export default GameScreen;
