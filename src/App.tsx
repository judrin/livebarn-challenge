import { useEffect, useState } from 'react';
import { fetchGameData } from './services/GameService';
import Board from './ui/Board';
import { GameData } from './interfaces/Game.interface';
import styles from './App.module.css';

function App() {
  const [gameData, setGameData] = useState<GameData>();

  const initGame = async () => {
    setGameData(undefined);
    const gameData = await fetchGameData();
    setGameData(gameData);
  };

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div className={styles.app}>
      {gameData ? (
        <>
          <Board gameData={gameData} resetGame={initGame} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
