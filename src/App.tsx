import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { PublicRoutes } from '@/routes';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <Suspense fallback={<Spin />}>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools position={'top-left'} />}
        <Router>
          <PublicRoutes />
        </Router>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;
