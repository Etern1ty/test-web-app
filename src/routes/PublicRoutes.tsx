import { Navigate, Route, Routes } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';

const { Main } = lazyImport(() => import('@/features/main'), 'Main');

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="*" element={<Navigate to="." replace={true} />} />
      </Route>
    </Routes>
  );
};
