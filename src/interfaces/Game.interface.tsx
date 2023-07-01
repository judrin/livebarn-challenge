export type RGB = [number, number, number];

export interface GameData {
  userId: string;
  width: number;
  height: number;
  maxMoves: number;
  target: RGB;
}
