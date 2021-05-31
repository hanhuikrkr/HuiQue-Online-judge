
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Tag, Space, Menu, Dropdown, Tooltip, notification } from 'antd';
import { List, Switch } from 'antd';
import React, { Component, Fragment, useRef } from 'react';
import { queryMessage, oneStepToReadAll, deleteMessage } from '../service';
interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  reloadAndRest: () => void;
  reset: () => void;
  clearSelected?: () => void;
  startEditable: (rowKey: Key) => boolean;
  cancelEditable: (rowKey: Key) => boolean;
}

type MeesageItem = {
  url: string;
  id: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};
type Unpacked<T> = T extends (infer U)[] ? U : T;
const columns: ProColumns<MeesageItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '是否已读',
    dataIndex: 'read',

    valueEnum: {
      1: {
        text: '已读',
        status: 'Success',
        disabled: true,
      },
      0: {
        text: '未读',
        status: 'Processing',
      },
    },
  },
  { title: '时间', key: 'time', dataIndex: 'time', valueType: 'dateTime' },

  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a key="delete" onClick={() => {}}>
        删除
      </a>,
    ],
  },
];

function NotificationView() {
  const ref = useRef<ActionType>();
  const a = 1;
  const readAll = () => {
    oneStepToReadAll().then((r) => {
      if (r.success) notification.success({ message: '一日看尽长安花 👨🏻‍💻' });
      ref.current.reload();
    });
  };
  const deleteAll = () => {
    deleteMessage().then((r) => {
      if (r.success) notification.success({ message: '往事清零，从此有趣有盼，终将美好 🤫' });
      ref.current.reload();
    });
  };

  return (
    <ProTable<MeesageItem>
      columns={columns}
      bordered={false}
      actionRef={ref}
      request={async (params) => {
        console.log(params);
        let res = await queryMessage({
          pageNumber: params.current - 1,
          pageSize: params.pageSize,
          hasCount: true,
        });
        console.log(res.data.data);
        return {
          data: res.data.data,
          success: res.success,
          total: res.data.totalCount,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={false}
      showHeader={false}
      pagination={{
        pageSizeOptions:["5","10","20","50","100"],
        pageSize: 5,
      }}
      dateFormatter="string"
      toolBarRender={() => [
        <Tooltip title="将所有的未读消息改为已读消息">
          <Button key="button" type="primary" onClick={readAll}>
            一键已读
          </Button>
        </Tooltip>,
        <Tooltip title="往事清零,不念过往">
          <Button key="button" type="default" onClick={deleteAll}>
            删除已读
          </Button>
        </Tooltip>,
      ]}
    />
  );
}

export default NotificationView;
