import { useState } from "react";

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

export const Shop = () => {
  const [gold, setGold] = useState(0);

  const buyItem = (price: number): void => {
    if (gold < price) {
      alert("Not enough gold");
      return;
    }

    setGold(gold - price);
  };

  return (
    <div>
      <div>SHOP</div>
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
                <button
                  className="px-4 py-2"
                  onClick={() => buyItem(item.price)}
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          className="px-4 py-2 m-4 outline rounded outline-transparent bg-cyan-400"
          onClick={() => setGold(gold + 10)}
        >
          Get Gold
        </button>
      </div>
      <div>Gold: {gold}</div>
    </div>
  );
};
