import React from 'react';
import { Fruit } from '../context/fruitsList';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface Props {
  fruits: Fruit[] | undefined;
}

type DataType = Fruit;

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <p>{text}</p>,
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
];

export default function TableView({ fruits }: Props) {
  return <Table<DataType> columns={columns} dataSource={fruits} />;
}
