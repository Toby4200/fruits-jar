'use client';

import { Fruit } from './context/fruitsList';

import Jar from './components/Jar';
import { useQuery } from '@tanstack/react-query';
import TabsWrapper from './components/TabsWrapper';

const getFruits = async () => {
  const response = await fetch(
    'https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws'
  );
  const data = await response.json();
  return data;
};

export default function FruitsHome() {
  const {
    data: fruitsArr,
    isPending,
    isError,
    error,
  } = useQuery<Fruit[]>({
    queryKey: ['fruits'],
    queryFn: getFruits,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <div id="container" className="flex p-5">
        <div id="left" className="w-1/2 p-5">
          <h1 className="mb-5">Fruits</h1>

          <TabsWrapper fruitsArr={fruitsArr} />
        </div>
        <div id="right" className="w-1/2">
          <h1 className="m-5">Jar</h1>

          <Jar />
        </div>
      </div>
    </>
  );
}
