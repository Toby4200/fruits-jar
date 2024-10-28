import { Button } from 'antd';
import { ActionType, Fruit } from '../context/fruitsList';
import useFruits from '../hooks/useFruits';

interface Props {
  fruit: Fruit;
}

export default function FruitCard({ fruit }: Props) {
  const { dispatch } = useFruits();

  return (
    <div className="flex justify-between align w-full">
      <div>
        <b>{fruit.name}</b> | {fruit.nutritions.calories} calories
      </div>

      <Button
        onClick={() => dispatch({ type: ActionType.ADD, payload: [fruit] })}
      >
        Add to jar
      </Button>
    </div>
  );
}
