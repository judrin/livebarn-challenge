import styles from './GameDetails.module.css';
import { RGB } from '../interfaces/Game.interface';
import Tile from '../components/Tile';

interface GameDetailsProps {
  userId: string;
  movesLeft: number;
  targetColor: RGB;
  closestColor: RGB;
  delta: number;
}

const GameDetails = ({
  userId,
  movesLeft,
  targetColor,
  closestColor,
  delta,
}: GameDetailsProps) => {
  return (
    <>
      <p>
        <b>RGB Alchemy</b>
      </p>
      <p>User ID: {userId}</p>
      <p>User Moves left: {movesLeft}</p>
      <div className={styles.detail}>
        <p>Target color</p>
        <Tile rgb={targetColor} />
      </div>
      <div className={styles.detail}>
        <p>Closest color</p>
        <Tile rgb={closestColor} />
        <p>Δ={delta}%</p>
      </div>
    </>
  );
};

export default GameDetails;
