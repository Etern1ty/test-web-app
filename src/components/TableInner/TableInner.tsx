import { Flex, Input, Table, TablePaginationConfig } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';

import { PagedListModel, TableInnerProps } from '@/components/TableInner/types';
import { IPagingModel, ISearchModel } from '@/interfaces';

const { Search } = Input;

export const TableInner = <T extends object, F extends object | ISearchModel | IPagingModel>({ tableKey, initialFilter, columns, dataFunction }: TableInnerProps<T, F>) => {
  const [filterData, setFilterData] = useState<F>(initialFilter);

  const tableData = useQuery<PagedListModel<T>>({
    queryKey: [tableKey, filterData],
    queryFn: () => dataFunction(filterData),
    keepPreviousData: true,
  });

  const handleKeywordChange = (searchValue: string) => {
    setFilterData((prevState) => {
      return { ...prevState, keyword: searchValue };
    });
  };

  const handlePaginationChange = (pagination: TablePaginationConfig) => {
    const pageSize = pagination.pageSize ?? 10;
    const current = pagination.current ?? 1;

    setFilterData((prevState) => {
      return { ...prevState, skip: current * pageSize - pageSize, take: pageSize };
    });
  };

  return (
    <Flex vertical gap={'middle'}>
      <Search placeholder={'Поиск по коду и значению'} onSearch={handleKeywordChange} />
      <Table
        dataSource={tableData.data?.items}
        columns={columns}
        loading={tableData.isLoading}
        onChange={(pagination) => handlePaginationChange(pagination)}
        pagination={{ total: tableData.data?.itemsCount }}
      />
    </Flex>
  );
};
