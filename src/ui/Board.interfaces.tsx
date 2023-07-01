import { RGB } from '../interfaces/Game.interface';

export enum SourceDirection {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom',
}
// This interface is used to store the RGB color values of painted sources
// Each direction (top, left, right, bottom) is associated with an array of RGB values
export interface SourceMap {
  top: RGB[];
  left: RGB[];
  right: RGB[];
  bottom: RGB[];
}

// This type is used to store the RGB color values of painted tiles
// Each tile in the board is associated with an RGB value
export type TileBoard = RGB[][];

export interface Position {
  x: number;
  y: number;
}

export interface TileItem {
  color: RGB;
  position: Position;
}
