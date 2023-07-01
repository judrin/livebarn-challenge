import Source from '../components/Source';
import Tile from '../components/Tile';
import { RGB } from '../interfaces/Game.interface';
import { Position, SourceDirection } from './Board.interfaces';
import BoardRow from './BoardRow';

interface TileRowProps {
  rowIndex: number;
  colSize: number;
  colors: RGB[];
  leftSourceColor: RGB;
  rightSourceColor: RGB;
  selectedTilePosition: Position;
  onClick: (i: number, direction: SourceDirection) => void;
  onDrop: (i: number, direction: SourceDirection) => void;
  onDragStart: (position: Position) => void;
  onDragEnd?: () => void;
  clickable?: boolean;
  showTooltip?: boolean;
}

const TileRow = ({
  rowIndex,
  colSize,
  colors,
  leftSourceColor,
  rightSourceColor,
  selectedTilePosition,
  onClick,
  onDrop,
  onDragStart,
  onDragEnd,
  clickable,
  showTooltip = true,
}: TileRowProps) => {
  // Determines whether a source is clickable or not
  // A source is not clickable if the tile is already clickable,
  // which happens after reaching the maximum source click moves
  const sourceClickable = !clickable;
  return (
    <BoardRow>
      <Source
        rgb={leftSourceColor}
        onClick={() => onClick(rowIndex, SourceDirection.Left)}
        onDrop={() => onDrop(rowIndex, SourceDirection.Left)}
        clickable={sourceClickable}
      />
      {Array.from({ length: colSize }).map((_, colIndex) => (
        <Tile
          key={colIndex}
          rgb={colors[colIndex]}
          selected={
            selectedTilePosition.x === colIndex &&
            selectedTilePosition.y === rowIndex
          }
          draggable={clickable}
          clickable={clickable}
          onDragStart={() => onDragStart({ x: colIndex, y: rowIndex })}
          onDragEnd={onDragEnd}
          showTooltip={showTooltip}
        />
      ))}
      <Source
        rgb={rightSourceColor}
        onClick={() => onClick(rowIndex, SourceDirection.Right)}
        onDrop={() => onDrop(rowIndex, SourceDirection.Right)}
        clickable={sourceClickable}
      />
    </BoardRow>
  );
};

export default TileRow;
