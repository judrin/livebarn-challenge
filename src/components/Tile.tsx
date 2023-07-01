import Block, { BlockProps } from './Block';
import styles from './Tile.module.css';
import Tooltip from './Tooltip';

interface TileProps extends BlockProps {
  selected?: boolean;
  showTooltip?: boolean;
}

const Tile = ({
  rgb = [0, 0, 0],
  selected = false,
  showTooltip = true,
  ...props
}: TileProps) => {
  const classNames = [styles.tile];

  if (selected) {
    classNames.push(styles.selected);
  }

  return (
    <Tooltip message={rgb.join(',')} disabled={!showTooltip}>
      <Block additionalClassNames={classNames} rgb={rgb} {...props} />
    </Tooltip>
  );
};

export default Tile;
