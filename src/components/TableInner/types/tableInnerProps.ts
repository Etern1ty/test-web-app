import type { TableProps } from 'antd';

import { PagedListModel } from '@/components';

export type TableInnerProps<T extends object, F> = {
  tableKey: string;
  initialFilter: F;
  columns: TableProps<T>['columns'];
  dataFunction: (filter: F) => Promise<PagedListModel<T>>;
};
