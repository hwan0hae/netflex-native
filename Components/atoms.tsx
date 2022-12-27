import { atom } from "recoil";

export const visibleState = atom<boolean>({
  key: "visible",
  default: false,
});

export const detailIdState = atom<number | null>({
  key: "detailId",
  default: null,
});
