import axios from 'axios';
import { GameData } from '../interfaces/Game.interface';

const gameServiceApi = axios.create({
  baseURL: 'http://localhost:9876',
  validateStatus: (status) => {
    return status >= 200 && status < 300; // Only resolve for 2xx status codes
  },
});

export const fetchGameData = async () => {
  try {
    const result = await gameServiceApi.get<GameData>('/init');
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchGameDataByUserId = async (userId: string) => {
  try {
    const result = await gameServiceApi.get<GameData>(`/init/user/${userId}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
