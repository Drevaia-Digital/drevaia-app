export type Emotion = 'ansiedad' | 'proposito' | 'patrones';

export const userProfile = {
  setEmotion: (emotion: Emotion) => {
    localStorage.setItem('emotion', emotion);
  },

  getEmotion: (): Emotion | null => {
    return localStorage.getItem('emotion') as Emotion | null;
  },

  setLastAction: (action: string) => {
    localStorage.setItem('lastAction', action);
  },

  getLastAction: () => {
    return localStorage.getItem('lastAction');
  },

  clear: () => {
    localStorage.removeItem('emotion');
    localStorage.removeItem('lastAction');
  }
};