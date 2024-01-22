import { ObjectInsertModel } from '../../../types';

export type AddModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: (values: Array<ObjectInsertModel>) => void;
};
