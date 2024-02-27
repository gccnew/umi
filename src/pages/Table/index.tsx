import services from '@/services/demo';
import { Link } from 'react-router-dom'
import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, message,Tabs, Popconfirm, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import ModalForm from './components/ModalForm';
import type { TabsProps } from 'antd';
import DescribeInfo from './components/Describe'
const { queryList } =
  services.UserController;

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [detailModalVisible, handleDetailModalVisible] =
    useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // const [row, setRow] = useState<API.ProcessInfo>();
  const columns: ProDescriptionsItemProps<API.ProcessInfo>[] = [
    {
      title: '工作流名称',
      dataIndex: 'workflow_name',
    },
    {
      title: '版本',
      dataIndex: 'version',
      valueType: 'text',
    },
    {
      title: '任务创建时间',
      dataIndex: 'task_create_time',
      valueType: 'text',
    },
    {
      title: '任务创建者',
      dataIndex: 'task_creator',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInForm: true,
      valueEnum: {
        0: { text: '男', status: 'MALE' },
        1: { text: '女', status: 'FEMALE' },
      },

    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render:(_,record)=>(
        <>
         <a
          onClick={() => {
            handleDetailModalVisible(true);
          }}
        >
          详情
        </a>
          {record.can_deploy===1?(<>
            <Divider type="vertical" />
            <Popconfirm 
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a type="link">部署</a>
            </Popconfirm>
            </>
          ):null}
        </>
      )
    },
  ];
  const confirm = () => {
    message.success('Click on Yes');
  };
  
  const cancel = () => {
    message.error('Click on No');
  };
  const tabItems: TabsProps['items'] = [
    {
      key: 'type',
      label: '类型',
    },
    {
      key: 'flow',
      label: '查看工作流',
    },
    {
      key: 'user',
      label: '授权用户',
    },
  ];
  const onTabChange = (key: string)=>{
      console.log(key)
  }
  return (
    <PageContainer
      header={{
        title: [<span key='text' style={{paddingRight:10}}>bg-101010</span>,<Tag key="tags" color="green">在线</Tag>],
        extra:[
          <Button key="1" type="primary" ><Link to="/home">WebShell</Link></Button>,
          <Button key="2">Close</Button>,
        ]
      }}
    >
      <DescribeInfo></DescribeInfo>
      <ProTable<API.ProcessInfo>
        actionRef={actionRef}
        rowKey="id"
        options={false}
        search={false}
        toolbar={{
          title:<Tabs defaultActiveKey="flow" onChange={onTabChange} items={tabItems}  />,
          multipleLine:true,
          actions:[
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建工作流任务
          </Button>]
        }}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data?.list || [],
            success,
            total: data?.total,
          };
        }}
        columns={columns}
      />
      
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable<API.ProcessInfo, API.ProcessInfo>
          onSubmit={async () => {
            handleModalVisible(false);
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
        <ModalForm
          onSubmit={async () => {
          }}
          onCancel={() => {
            handleDetailModalVisible(false);
          }}
          detailModalVisible={detailModalVisible}
          values={{}}
        />
      

    </PageContainer>
  );
};

export default TableList;
