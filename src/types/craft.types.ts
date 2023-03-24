export enum Grade {
  D = "D",
  C = "D",
  B = "B",
  A = "A",
  S = "S",
}

export type RaidBoss = {
  value: string;
  label: string;
  count?: number;
  type: Object;
  isTwoHanded: boolean;
  speed: string;
  grade: Grade | string;
  PAtack: number;
  MAtack: number;
};
