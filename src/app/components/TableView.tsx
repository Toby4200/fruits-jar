import React, { useContext } from 'react';
import { ActionType, Fruit, FruitsListContext } from '../context/fruitsList';
import { Button, Table } from 'antd';
import type { TableProps } from 'antd';

interface Props {
  fruits: Fruit[] | undefined;
}

type DataType = Fruit;

export default function TableView({ fruits }: Props) {
  const { dispatch } = useContext(FruitsListContext);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
      fixed: 'left',
    },
    {
      title: 'Family',
      dataIndex: 'family',
      key: 'family',
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: 'order',
    },
    {
      title: 'Genus',
      dataIndex: 'genus',
      key: 'genus',
    },
    {
      title: 'Calories',
      dataIndex: 'nutritions',
      key: 'nutritions',
      render: (nutritions: DataType['nutritions']) => (
        <p>{nutritions.calories}</p>
      ),
      // Todo Anatoliy - add sort
    },
    {
      title: 'Add to Jar',
      render: (fruit: DataType) => (
        <Button
          onClick={() => dispatch({ type: ActionType.ADD, payload: [fruit] })}
        >
          Add to jar
        </Button>
      ),
      fixed: 'right',
    },
  ];

  return (
    <Table<DataType>
      columns={columns}
      dataSource={fruits}
      scroll={{ x: 800 }}
    />
  );
}
