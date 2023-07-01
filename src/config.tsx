import { RGB } from './interfaces/Game.interface';

interface GameConfig {
  maxSourceClick: number;
  winningDeltaThreshold: number;
  getInitialRGB: () => RGB;
  dialogMessages: { success: string; failure: string };
}

export const config: GameConfig = {
  maxSourceClick: 3,
  winningDeltaThreshold: 10,
  getInitialRGB: () => [0, 0, 0],
  dialogMessages: {
    success: 'Success. Do you want to try again?',
    failure: 'Failed. Do you want to try again?',
  },
};
