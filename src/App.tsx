import { useEffect, useState } from 'react';
import { fetchGameData, fetchGameDataByUserId } from './services/GameService';
import Board from './ui/Board';
import { GameData } from './interfaces/Game.interface';
import styles from './App.module.css';

function App() {
  const [gameData, setGameData] = useState<GameData>();

  const initGame = async () => {
    const gameData = await fetchGameData();
    setGameData(gameData);
  };

  const fetchGameByUserId = async (userId: string) => {
    setGameData(undefined);
    const gameData = await fetchGameDataByUserId(userId);
    setGameData(gameData);
  };

  useEffect(() => {
    initGame();
  }, []);

  return (
    <div className={styles.app}>
      {gameData ? (
        <>
          <Board gameData={gameData} resetGame={fetchGameByUserId} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
