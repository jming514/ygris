import { useState } from "react";

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

type TInventory = {
  [key: string]: {
    id: number;
    quantity: number;
  };
};

const GameScreen = () => {
  const [inventory, setInventory] = useState<TInventory>({});
  const [selectedMenu, setSelectedMenu] = useState("");
  const [gold, setGold] = useState(100);

  const handleMenuClick = (name: string) => {
    if (name === selectedMenu) return;

    setSelectedMenu(name);
  };

  const buyItem = (item: TShopItem) => {
    if (gold < item.price) return;

    const newInventory = { ...inventory };

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

    setGold(gold - item.price);
    setInventory(newInventory);
  };

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
            </tbody>
          </table>
        </div>

        <div className="row-span-2">
          <div className="flex place-content-around">
            <h2 className="text-xl ">Inventory</h2>
            <span>Gold: {gold}</span>
          </div>
          <div>
            {Object.entries(inventory).map((value, key) => (
              <div key={key} className="grid grid-cols-2">
                <div>{value[0]}</div>
                <div>{value[1].quantity}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
