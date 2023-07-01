import { config } from '../config';
import { RGB } from '../interfaces/Game.interface';
import {
  Position,
  SourceDirection,
  SourceMap,
  TileBoard,
  TileItem,
} from '../ui/Board.interfaces';
import {
  calculateDelta,
  adjustRGBByDistance,
  normalizeRGBs,
} from './calculator';

export const buildInitSourceMap = (
  width: number,
  height: number
): SourceMap => {
  return {
    top: createInitialRGBArray(width),
    bottom: createInitialRGBArray(width),
    left: createInitialRGBArray(height),
    right: createInitialRGBArray(height),
  };
};

export const buildInitTileBoard = (
  width: number,
  height: number
): TileBoard => {
  return Array.from({ length: height }, () => createInitialRGBArray(width));
};

export const isRGBColorInitialColor = (rgb?: RGB): boolean => {
  if (!rgb) return true;

  return rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0;
};

export const createInitialRGBArray = (size: number): RGB[] =>
  Array(size).fill(config.getInitialRGB());

export const buildInitialTileItem = (): TileItem => ({
  position: { x: 0, y: 0 },
  color: config.getInitialRGB(),
});

export const isSourceDirectionVertical = (
  sourceDirection: SourceDirection
): boolean =>
  sourceDirection === SourceDirection.Left ||
  sourceDirection === SourceDirection.Right;

export const paintSource = (
  baseSourceMap: SourceMap,
  index: number,
  rgb: RGB,
  sourceDirection: SourceDirection
): SourceMap => {
  const updatedSourceMap = { ...baseSourceMap };
  const updatedSources = [...updatedSourceMap[sourceDirection]];
  updatedSources[index] = rgb;
  updatedSourceMap[sourceDirection] = updatedSources;

  return updatedSourceMap;
};

export const paintTile = (
  baseTileBoard: TileBoard,
  position: Position,
  rgb: RGB
): TileBoard => {
  const updatedTileBoard = [...baseTileBoard];
  const updatedRow = [...updatedTileBoard[position.y]];
  updatedRow[position.x] = rgb;
  updatedTileBoard[position.y] = updatedRow;

  return updatedTileBoard;
};

export const getSourceRGBByRelativeDistance = (
  index: number,
  distance: number,
  sourceMap: SourceMap,
  sourceDirection: SourceDirection
): RGB => {
  const source = sourceMap[sourceDirection][index];
  const dimensionSize = isSourceDirectionVertical(sourceDirection)
    ? sourceMap.top.length
    : sourceMap.left.length;

  return adjustRGBByDistance(source, dimensionSize, distance);
};

export const getSourcesRGBByRelativeDistance = (
  position: Position,
  sourceMap: SourceMap
): RGB[] => {
  const width = sourceMap.top.length;
  const height = sourceMap.left.length;

  const topSource = getSourceRGBByRelativeDistance(
    position.x,
    position.y + 1, // Distance starts from 1
    sourceMap,
    SourceDirection.Top
  );
  const bottomSource = getSourceRGBByRelativeDistance(
    position.x,
    height - position.y,
    sourceMap,
    SourceDirection.Bottom
  );
  const leftSource = getSourceRGBByRelativeDistance(
    position.y,
    position.x + 1, // Distance starts from 1
    sourceMap,
    SourceDirection.Left
  );
  const rightSource = getSourceRGBByRelativeDistance(
    position.y,
    width - position.x,
    sourceMap,
    SourceDirection.Right
  );

  return [topSource, bottomSource, leftSource, rightSource];
};

export const getTileRGBColor = (
  position: Position,
  sourceMap: SourceMap
): RGB => {
  const sources = getSourcesRGBByRelativeDistance(position, sourceMap);
  return normalizeRGBs(sources);
};

export const paintRowTiles = (
  colIndex: number,
  tileBoard: TileBoard,
  sourceMap: SourceMap,
  selectedTileList?: TileItem[]
): TileBoard => {
  const height = sourceMap.left.length;
  let updatedTileBoard = [...tileBoard];

  for (let rowIndex = 0; rowIndex < height; rowIndex++) {
    const position: Position = { x: colIndex, y: rowIndex };
    const newTileColor: RGB = getTileRGBColor(position, sourceMap);

    if (selectedTileList) {
      selectedTileList.push({ color: newTileColor, position });
    }

    updatedTileBoard = paintTile(updatedTileBoard, position, newTileColor);
  }

  return updatedTileBoard;
};

export const paintColumnTiles = (
  rowIndex: number,
  tileBoard: TileBoard,
  sourceMap: SourceMap,
  selectedTileList?: TileItem[]
): TileBoard => {
  const width = sourceMap.top.length;
  let updatedTileBoard = [...tileBoard];

  for (let colIndex = 0; colIndex < width; colIndex++) {
    const position: Position = { x: colIndex, y: rowIndex };
    const newTileColor: RGB = getTileRGBColor(position, sourceMap);

    if (selectedTileList) {
      selectedTileList.push({ color: newTileColor, position });
    }

    updatedTileBoard = paintTile(updatedTileBoard, position, newTileColor);
  }

  return updatedTileBoard;
};

export const getTileWithLowestDelta = (
  targetColor: RGB,
  tileList: TileItem[]
): TileItem => {
  return tileList.reduce((prev, curr) => {
    const prevDeltal = calculateDelta(targetColor, prev.color);
    const currDelta = calculateDelta(targetColor, curr.color);

    return prevDeltal < currDelta ? prev : curr;
  });
};
