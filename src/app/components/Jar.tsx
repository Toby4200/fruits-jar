import { List } from 'antd';
import useFruits from '../hooks/useFruits';
import JarCard from './JarCard';

export default function Jar() {
  const { state } = useFruits();
  return (
    <div>
      <List
        header={<div>Jar</div>}
        bordered
        dataSource={state.fruits}
        renderItem={(fruit, index) => (
          <List.Item>
            <JarCard fruit={fruit} index={index} />
          </List.Item>
        )}
      />
    </div>
  );
}
