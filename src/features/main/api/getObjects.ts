import { PagedListModel } from '@/components';
import { axios } from '@/config';

import { ObjectFilterModel, ObjectItemModel } from '../types';
export const getObjects = (filter: ObjectFilterModel): Promise<PagedListModel<ObjectItemModel>> => {
  return axios.get(`/v1/objects`, { params: filter, paramsSerializer: { indexes: null } });
};
