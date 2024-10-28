import { useContext } from 'react';
import { FruitsListContext } from '../context/fruitsList';

export default function useFruits() {
  const context = useContext(FruitsListContext);

  if (!context) {
    throw new Error(`useFruits must be used within a FruitsList Provider`);
  }
  return context;
}
