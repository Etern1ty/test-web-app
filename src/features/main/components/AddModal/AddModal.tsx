import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Space } from 'antd';

import { ObjectInsertModel } from '../../types';
import { AddModalProps } from '../AddModal';

export const AddModal = ({ isVisible, onCancel, onConfirm }: AddModalProps) => {
  const [form] = Form.useForm<{ objects: Array<ObjectInsertModel> }>();
  return (
    <Modal
      open={isVisible}
      title="Добавление новых объектов"
      okText="Добавить"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onConfirm(values.objects);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} name="dynamic_objects_list_form" style={{ maxWidth: 600 }} autoComplete="off">
        <Form.List name="objects">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item {...restField} name={[name, 'code']} rules={[{ required: true, message: 'Не указан код объекта' }]}>
                    <InputNumber placeholder="Код" min={1} />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'value']} rules={[{ required: true, message: 'Не указано значение объекта' }]}>
                    <Input placeholder="Значение" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить объект
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};
