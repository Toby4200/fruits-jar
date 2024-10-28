import { Button, Collapse, List, Select } from 'antd';
import FruitCard from './FruitCard';
import { ActionType, Fruit } from '../context/fruitsList';
import { useMemo, useState } from 'react';
import useFruits from '../hooks/useFruits';

type GroupByOption = 'none' | 'family' | 'order' | 'genus';

interface GroupedFruits {
  [key: string]: Fruit[];
}

const selectOptions = [
  {
    value: 'none',
    label: 'None',
  },
  {
    value: 'family',
    label: 'Family',
  },
  {
    value: 'order',
    label: 'Order',
  },
  {
    value: 'genus',
    label: 'Genus',
  },
];

export default function ListView({
  fruitsArr,
}: {
  fruitsArr: Fruit[] | undefined;
}) {
  const { dispatch } = useFruits();
  const [groupBy, setGroupBy] = useState<GroupByOption>('none');

  // rerender when groupBy changes
  const groupedFruits = useMemo(() => {
    if (!fruitsArr || groupBy === 'none') return null;

    return fruitsArr.reduce<GroupedFruits>((acc, fruit) => {
      const key = fruit[groupBy];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(fruit);
      return acc;
    }, {});
  }, [fruitsArr, groupBy]);

  // no grouping
  const renderFlatList = () => (
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
  );

  // grouping
  const renderGroupedList = () => {
    if (!groupedFruits) return null;

    return (
      <Collapse
        defaultActiveKey={[Object.keys(groupedFruits)[0]]}
        className="border rounded-lg"
      >
        {Object.entries(groupedFruits).map(([groupName, fruitsArr]) => (
          <Collapse.Panel
            header={
              <div className="flex justify-between items-center">
                <span className="font-medium">{groupName}</span>
                <span className="text-sm text-gray-500">
                  {fruitsArr.length}{' '}
                  {fruitsArr.length === 1 ? 'fruit' : 'fruits'}
                </span>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: ActionType.ADD, payload: [...fruitsArr] });
                  }}
                >
                  Add to jar
                </Button>
              </div>
            }
            key={groupName}
          >
            <List
              dataSource={fruitsArr}
              renderItem={(item) => (
                <List.Item>
                  <FruitCard fruit={item} />
                </List.Item>
              )}
            />
          </Collapse.Panel>
        ))}
      </Collapse>
    );
  };

  return (
    <div>
      <div className="">
        <div className="mb-5 mt-3">
          <span className="mr-5 ">Group by:</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Group by"
            optionFilterProp="label"
            defaultValue="none"
            onChange={(value: GroupByOption) => setGroupBy(value)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={selectOptions}
          />
        </div>
      </div>

      <div>{groupBy === 'none' ? renderFlatList() : renderGroupedList()}</div>
    </div>
  );
}
