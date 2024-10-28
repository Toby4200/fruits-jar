import { Card, List, Statistic } from 'antd';
import useFruits from '../hooks/useFruits';
import JarCard from './JarCard';
import { useMemo } from 'react';
// @ts-ignore
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

interface TooltipContext {
  label: string;
  raw: number;
}

export default function Jar() {
  const { state } = useFruits();

  const totalCalories = useMemo(() => {
    return state.fruits.reduce(
      (sum, fruit) => sum + fruit.nutritions.calories,
      0
    );
  }, [state.fruits]);

  // Prepare data for pie chart
  const chartData = useMemo(() => {
    const fruitCalories = state.fruits.reduce(
      (acc: Record<string, number>, fruit) => {
        if (!acc[fruit.name]) {
          acc[fruit.name] = fruit.nutritions.calories;
        } else {
          acc[fruit.name] = acc[fruit.name] + fruit.nutritions.calories;
        }
        return acc;
      },
      {}
    );

    return {
      labels: Object.keys(fruitCalories),
      datasets: [
        {
          data: Object.values(fruitCalories),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [state.fruits]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          boxWidth: 15,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipContext) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / totalCalories) * 100).toFixed(1);
            return `${label}: ${value} cal (${percentage}%)`;
          },
        },
      },
    },
  };

  // @ts-ignore
  return (
    <div className="space-y-4">
      {/* stats */}
      <Card className="shadow-sm">
        <div className="flex justify-between items-center">
          <Statistic
            title="Total Fruits"
            value={state.fruits.length}
            suffix="items"
          />
          <Statistic
            title="Total Calories"
            value={totalCalories}
            suffix="cal"
            precision={0}
          />
        </div>
      </Card>

      {/* Pie Chart */}
      {state.fruits.length > 0 && (
        <Card className="shadow-sm">
          <h3 className="text-lg font-medium mb-4">Calorie Distribution</h3>
          <div className="h-[300px] flex justify-center items-center">
            {/* @ts-ignore */}
            <Pie data={chartData} options={chartOptions} />
          </div>
        </Card>
      )}

      {/* List of fruits */}
      <List
        header={
          <div className="flex justify-between items-center">
            <span>Jar</span>
            {state.fruits.length > 0 && (
              <span className="text-sm text-gray-500">
                {state.fruits.length}{' '}
                {state.fruits.length === 1 ? 'fruit' : 'fruits'}
              </span>
            )}
          </div>
        }
        bordered
        dataSource={state.fruits}
        renderItem={(fruit, index) => (
          <List.Item>
            <JarCard fruit={fruit} index={index} />
          </List.Item>
        )}
        locale={{
          emptyText: (
            <div className="py-8 text-center text-gray-500">
              <p>Your jar is empty</p>
              <p className="text-sm">Add some fruits to get started!</p>
            </div>
          ),
        }}
      />
    </div>
  );
}
