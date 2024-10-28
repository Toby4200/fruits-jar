import { Button } from 'antd';
import { ActionType, Fruit } from '../context/fruitsList';
import useFruits from '../hooks/useFruits';

interface Props {
  fruit: Fruit;
  index: number;
}

export default function JarCard({ fruit, index }: Props) {
  const { dispatch } = useFruits();

  return (
    <div className="flex justify-between w-full">
      <div>{fruit.name}</div>
      <Button
        type="text"
        danger
        onClick={() => dispatch({ type: ActionType.REMOVE, payload: index })}
      >
        Delete
      </Button>
    </div>
  );
}
