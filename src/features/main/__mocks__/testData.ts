import { ObjectInsertModel } from '../types';

export const generateTestData = (): Array<ObjectInsertModel> => {
  return [...Array(40).keys()].map((x) => {
    return { code: x, value: `value_${x}` };
  });
};
