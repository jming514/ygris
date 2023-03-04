import { create } from "zustand";

type TPlayerStore = {
  gold: number;
  hp: number;
  attack: number;
  decreaseHp: () => void;
};
const usePlayerStore = create((set) => ({
  gold: 0,
  hp: 100,
  attack: 10,
  decreaseHp: (value: number) =>
    set((state: TPlayerStore) => ({ hp: state.hp - value })),
}));
