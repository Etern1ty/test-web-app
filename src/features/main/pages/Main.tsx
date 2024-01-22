import { Button, Card, Flex, Layout, message, Space, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';

import { TableInner } from '@/components/TableInner';

import { generateTestData } from '../__mocks__';
import { getObjects, useCreateObjects } from '../api';
import { AddModal } from '../components';
import { ObjectInsertModel, ObjectItemModel } from '../types';

const { Title } = Typography;

export const Main = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [modalVisible, setModalIsVisible] = useState(false);
  const createObjects = useCreateObjects();

  const onCreateObjects = async (model: Array<ObjectInsertModel>) => {
    await createObjects
      .mutateAsync(model)
      .then(() => {
        messageApi.info('Записи успешно добавлены!');
        setModalIsVisible(false);
      })
      .catch((ex) => {
        messageApi.error(ex.message);
        setModalIsVisible(false);
      });
  };

  const columns: ColumnsType<ObjectItemModel> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Код',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  return (
    <Layout>
      {contextHolder}
      <Layout>
        <Content>
          <Flex vertical style={{ padding: '16px' }}>
            <Card
              title={
                <Flex align="baseline">
                  <Title level={4}>Таблица объектов</Title>
                  <Space style={{ marginLeft: 'auto' }} direction="horizontal">
                    <Button onClick={() => setModalIsVisible(true)}>Добавить объекты</Button>
                    <Button onClick={() => onCreateObjects(generateTestData())}>Добавить тестовые объекты</Button>
                  </Space>
                </Flex>
              }
              bordered={false}
            >
              <TableInner tableKey="objects_table" initialFilter={{ take: 10, skip: 0 }} dataFunction={(filter) => getObjects(filter)} columns={columns} />
            </Card>

            <AddModal isVisible={modalVisible} onCancel={() => setModalIsVisible(false)} onConfirm={(values) => onCreateObjects(values)} />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};
