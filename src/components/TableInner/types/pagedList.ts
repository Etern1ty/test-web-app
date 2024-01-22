export type PagedListModel<T> = {
  items: T[];
  itemsCount: number;
};

export const isPagedListModel = <T>(data: object): data is PagedListModel<T> => {
  const obj = data as PagedListModel<T>;
  return obj.items != undefined;
};
