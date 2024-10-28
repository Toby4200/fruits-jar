import { Tabs, TabsProps } from 'antd';
import { Fruit } from '../context/fruitsList';
import TableView from './TableView';
import ListView from './ListView';

export default function TabsWrapper({
  fruitsArr,
}: {
  fruitsArr: Fruit[] | undefined;
}) {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'List',
      children: <ListView fruitsArr={fruitsArr} />,
    },
    {
      key: '2',
      label: 'Table',
      children: <TableView fruits={fruitsArr} />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
}
