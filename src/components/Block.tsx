import { RGB } from '../interfaces/Game.interface';
import styles from './Block.module.css';

export interface BlockProps {
  rgb?: RGB;
  additionalClassNames?: string[];
  draggable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrop?: () => void;
}

const Block = ({
  rgb = [0, 0, 0],
  additionalClassNames = [],
  draggable = false,
  clickable = false,
  onClick,
  onDragStart,
  onDragEnd,
  onDrop,
}: BlockProps) => {
  const [r, g, b] = [rgb[0], rgb[1], rgb[2]];
  const classNames = [styles.block, ...additionalClassNames];

  if (clickable || draggable) {
    classNames.push(styles.clickable);
  }

  return (
    <div
      className={classNames.join(' ')}
      style={{ backgroundColor: `rgb(${r},${g},${b})` }}
      draggable={draggable}
      onClick={onClick}
      onDragStart={onDragStart}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
    ></div>
  );
};

export default Block;
