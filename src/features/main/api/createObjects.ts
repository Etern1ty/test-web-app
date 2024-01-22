import { useMutation, useQueryClient } from 'react-query';

import { axios } from '@/config';

import { ObjectInsertModel } from '../types';

export const createObjects = (model: Array<ObjectInsertModel>): Promise<void> => {
  return axios.post(`/v1/objects`, model);
};

export const useCreateObjects = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createObjects,
    onSuccess: async () => {
      await queryClient.invalidateQueries(['objects_table']);
    },
  });
};
