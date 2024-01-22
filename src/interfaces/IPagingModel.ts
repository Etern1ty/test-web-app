export interface IPagingModel {
  take: number;
  skip: number;
}

export const isPagingModel = (filter: object): filter is IPagingModel => {
  const obj = filter as IPagingModel;
  return obj.skip !== undefined && obj.take !== undefined;
};
