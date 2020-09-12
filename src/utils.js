import { adjectives, nouns } from './words';

export const generateSecret = () => {
  const randomNumber1 = Math.floor(Math.random() * adjectives.length);
  const randomNumber2 = Math.floor(Math.random() * nouns.length);
  return `${adjectives[randomNumber1]} ${nouns[randomNumber2]}`;
};
