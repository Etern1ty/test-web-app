export interface ISearchModel {
  keyword?: string;
}

export const isSearchModel = (filter: object): filter is ISearchModel => {
  const obj = filter as ISearchModel;
  return obj.keyword !== undefined;
};
