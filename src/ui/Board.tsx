import { useEffect, useRef, useState } from 'react';
import SimpleDialog from '../components/SimpleDialog';
import { config } from '../config';
import { GameData, RGB } from '../interfaces/Game.interface';
import {
  Position,
  SourceDirection,
  SourceMap,
  TileBoard,
  TileItem,
} from './Board.interfaces';
import styles from './Board.module.css';
import SourceRow from './SourceRow';
import TileRow from './TileRow';
import {
  buildInitSourceMap,
  buildInitTileBoard,
  getTileWithLowestDelta,
  isRGBColorInitialColor,
  paintColumnTiles,
  paintRowTiles,
  paintSource,
  buildInitialTileItem,
} from '../utils/boardHelpers';
import GameDetails from './GameDetails';
import { calculateDelta } from '../utils/calculator';

export interface BoardProps {
  gameData: GameData;
  resetGame: (userId: string) => void;
}

const Board = ({ gameData, resetGame }: BoardProps) => {
  const { userId, width, height, maxMoves, target } = gameData;
  const initialDelta = calculateDelta(target, config.getInitialRGB());

  const [sourceMap, setSourceMap] = useState<SourceMap>(
    buildInitSourceMap(width, height)
  );
  const [tileBoard, setTileBoard] = useState<TileBoard>(
    buildInitTileBoard(width, height)
  );
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [delta, setDelta] = useState<number>(initialDelta);
  const [selectedTile, setSelectedTile] = useState<TileItem>(
    buildInitialTileItem()
  );
  const [dragging, setDragging] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const dragTile = useRef<Position>();

  const sourceClickable = currentMove < config.maxSourceClick;
  const tileClickable = !sourceClickable && currentMove < maxMoves;
  const dialogMessage = gameOver
    ? delta < config.winningDeltaThreshold
      ? config.dialogMessages.success
      : config.dialogMessages.failure
    : '';

  const resetBoard = (): void => {
    setSourceMap(buildInitSourceMap(width, height));
    setTileBoard(buildInitTileBoard(width, height));
    setCurrentMove(0);
    setShowDialog(false);
    setSelectedTile(buildInitialTileItem());
    setGameOver(false);
    setDelta(0);
  };

  useEffect(() => {
    const isGameOver =
      currentMove >= maxMoves ||
      (currentMove !== 0 && delta < config.winningDeltaThreshold);

    if (isGameOver) {
      setShowDialog(true);
      setGameOver(true);
    }
  }, [currentMove, delta, maxMoves]);

  const paintSourceAndTiles = (
    sourceIndex: number,
    sourceDirection: SourceDirection,
    color: RGB,
    selectedTileList?: TileItem[]
  ): void => {
    const updatedSourceMap = paintSource(
      sourceMap,
      sourceIndex,
      color,
      sourceDirection
    );

    let updatedTileBoard: TileBoard;

    switch (sourceDirection) {
      case SourceDirection.Top:
      case SourceDirection.Bottom:
        updatedTileBoard = paintRowTiles(
          sourceIndex,
          tileBoard,
          updatedSourceMap,
          selectedTileList
        );
        break;
      case SourceDirection.Left:
      case SourceDirection.Right:
        updatedTileBoard = paintColumnTiles(
          sourceIndex,
          tileBoard,
          updatedSourceMap,
          selectedTileList
        );
        break;
    }

    setSourceMap(updatedSourceMap);
    setTileBoard(updatedTileBoard);
    setCurrentMove(currentMove + 1);
  };

  const handleSourceClick = (
    sourceIndex: number,
    sourceDirection: SourceDirection
  ): void => {
    if (!sourceClickable) return;

    // Prevents clicking on an already selected source
    if (!isRGBColorInitialColor(sourceMap[sourceDirection][sourceIndex]))
      return;

    const selectedTileList: TileItem[] = [];
    const color: RGB = config.getInitialRGB();
    const rgbIndex = currentMove;
    // Set the corresponding RGB value to 255
    // If it's the first move, set the red color value
    // If it's the second move, set the green color value
    // If it's the third move, set the blue color value
    color[rgbIndex] = 255;

    paintSourceAndTiles(sourceIndex, sourceDirection, color, selectedTileList);

    const tile = getTileWithLowestDelta(target, selectedTileList);
    const newDelta = calculateDelta(target, tile.color);

    if (newDelta < delta) {
      setDelta(newDelta);
      setSelectedTile(tile);
    }
  };

  const handleDialogCancelClick = (): void => {
    setShowDialog(false);
  };

  const handleDialogOpenClick = (): void => {
    setShowDialog(false);
    resetBoard();
    resetGame(userId);
  };

  const handleTileDragStart = (position: Position): void => {
    dragTile.current = position;
    setDragging(true);
  };

  const handleTileDragEnd = (): void => {
    setDragging(false);
  };

  const handleTileDrop = (
    sourceIndex: number,
    sourceDirection: SourceDirection
  ): void => {
    const position = dragTile.current;

    if (!position) return;

    dragTile.current = undefined;
    const colorRGB = tileBoard[position.y][position.x];
    const selectedTileList: TileItem[] = [];

    paintSourceAndTiles(
      sourceIndex,
      sourceDirection,
      colorRGB,
      selectedTileList
    );

    const tile = getTileWithLowestDelta(target, selectedTileList);
    const newDelta = calculateDelta(target, tile.color);

    if (newDelta < delta) {
      setDelta(newDelta);
      setSelectedTile(tile);
    }
  };

  return (
    <>
      <GameDetails
        userId={userId}
        movesLeft={maxMoves - currentMove}
        targetColor={target}
        closestColor={selectedTile.color}
        delta={delta}
      />
      <div className={styles.board}>
        <SourceRow
          colSize={width}
          colors={sourceMap.top}
          direction={SourceDirection.Top}
          onClick={handleSourceClick}
          onDrop={handleTileDrop}
          clickable={sourceClickable}
        />
        {Array.from({ length: height }).map((_, rowIndex) => (
          <TileRow
            key={rowIndex}
            rowIndex={rowIndex}
            colSize={width}
            colors={tileBoard[rowIndex]}
            leftSourceColor={sourceMap.left[rowIndex]}
            rightSourceColor={sourceMap.right[rowIndex]}
            selectedTilePosition={selectedTile.position}
            onClick={handleSourceClick}
            onDrop={handleTileDrop}
            onDragStart={handleTileDragStart}
            onDragEnd={handleTileDragEnd}
            clickable={tileClickable}
            showTooltip={!dragging}
          />
        ))}
        <SourceRow
          colSize={width}
          colors={sourceMap.bottom}
          direction={SourceDirection.Bottom}
          onClick={handleSourceClick}
          onDrop={handleTileDrop}
          clickable={sourceClickable}
        />
        <SimpleDialog
          show={showDialog}
          message={dialogMessage}
          handleCancelClick={handleDialogCancelClick}
          handleOkayClick={handleDialogOpenClick}
        />
      </div>
    </>
  );
};

export default Board;
