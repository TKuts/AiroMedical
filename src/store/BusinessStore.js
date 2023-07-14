import { create } from "zustand";

export const useBeerStore = create((set) => ({
  beers: [],
  arrayRecipeNeedDelete: [],
  addBeers: (arrBeers) =>
    set((state) => ({
      beers: [...arrBeers],
    })),
  whatNeedDelet: (arrNumbers) =>
    set((state) => ({
      arrayRecipeNeedDelete: [...state.arrayRecipeNeedDelete, arrNumbers],
    })),
  removed: () =>
    set((state) => ({
      arrayRecipeNeedDelete: [],
    })),
}));
