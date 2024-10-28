'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { FruitsListReducerProvider } from '../context/fruitsList';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <QueryClientProvider client={queryClient}>
      <FruitsListReducerProvider>{children}</FruitsListReducerProvider>
    </QueryClientProvider>
  );
}
