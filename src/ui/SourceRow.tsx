import Block from '../components/Block';
import Source from '../components/Source';
import { RGB } from '../interfaces/Game.interface';
import { SourceDirection } from './Board.interfaces';
import BoardRow from './BoardRow';
import styles from './SourceRow.module.css';

interface SourceRowProps {
  colSize: number;
  colors: RGB[];
  direction: SourceDirection;
  onClick: (i: number, direction: SourceDirection) => void;
  onDrop: (i: number, direction: SourceDirection) => void;
  clickable?: boolean;
}

const SourceRow = ({
  colSize,
  colors,
  direction,
  onClick,
  onDrop,
  clickable = false,
}: SourceRowProps) => {
  return (
    <BoardRow>
      <Block additionalClassNames={[styles.dummyBlock]} />
      {Array.from({ length: colSize }).map((_, colIndex) => (
        <Source
          key={colIndex}
          rgb={colors[colIndex]}
          onClick={() => onClick(colIndex, direction)}
          onDrop={() => onDrop(colIndex, direction)}
          clickable={clickable}
        />
      ))}
      <Block additionalClassNames={[styles.dummyBlock]} />
    </BoardRow>
  );
};

export default SourceRow;
