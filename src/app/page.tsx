'use client';

import { Fruit } from './context/fruitsList';

import Jar from './components/Jar';
import { useQuery } from '@tanstack/react-query';
import TabsWrapper from './components/TabsWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import { Button } from 'antd';

const getFruits = async () => {
  // react query already retrying query and refetching and returns error
  const response = await fetch(
    'https://wcz3qr33kmjvzotdqt65efniv40kokon.lambda-url.us-east-2.on.aws'
  );
  const data = await response.json();
  return data;
};

const FruitsHomeContent = () => {
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
    return <div className="m-5">Loading...</div>;
  }

  if (isError) {
    return <div className="m-5">Error: {error.message}</div>;
  }

  return (
    <>
      <header className="h-20 px-5 text-2xl shadow-md mb-5 flex items-center">
        Fruits APP
      </header>
      <div id="container" className="flex p-5">
        <div id="left" className="w-1/2 px-2">
          <h1 className="mb-5 text-2xl">Fruits List</h1>

          <TabsWrapper fruitsArr={fruitsArr} />
        </div>
        <div id="right" className="w-1/2 px-2">
          <h1 className="m-5 text-2xl">Jar</h1>

          <Jar />
        </div>
      </div>
    </>
  );
};

// Example of error boundary
export default function FruitsHome() {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Failed to Load Fruits
            </h2>
            <p className="text-gray-600 mb-4">
              We couldn't load the fruits data. Please try again later.
            </p>
            <Button
              type="primary"
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      }
    >
      <FruitsHomeContent />
    </ErrorBoundary>
  );
}
