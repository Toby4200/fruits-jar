import { List, Tabs, TabsProps } from 'antd';
import { Fruit } from '../context/fruitsList';
import FruitCard from './FruitCard';
import TableView from './TableView';

export default function TabsWrapper({
  fruitsArr,
}: {
  fruitsArr: Fruit[] | undefined;
}) {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'List',
      children: (
        <List
          header={<div>Fruits List</div>}
          bordered
          dataSource={fruitsArr}
          renderItem={(item) => (
            <List.Item>
              <FruitCard fruit={item} />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: '2',
      label: 'Table',
      children: <TableView fruits={fruitsArr} />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}
