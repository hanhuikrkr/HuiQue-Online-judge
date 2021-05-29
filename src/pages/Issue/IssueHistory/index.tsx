import { PlusOutlined } from '@ant-design/icons/lib/icons';
import ProTable from '@ant-design/pro-table';
import { Button, Tag, Space, Menu, Dropdown, Tooltip, notification } from 'antd';
import { List, Switch } from 'antd';
import React, { Component, Fragment, useRef } from 'react';
import { queryIssueHistory } from '../server';
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
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'index',
    width: 80,
  },

 
  {
    title: '所用语言',
    dataIndex: 'languageType',
    valueEnum: {
      JAVA: {
        text: 'JAVA 11',
      },
      CPP: {
        text: 'C/C++',
      },
      PYTHON: {
        text: 'Python 3.7',
      },
    },
  },
  {
    title: '状态',
    dataIndex: 'state',

    valueEnum: {
      PENDING: {
        text: '运行中',
        status: 'Processing',
      },
      ACCEPT: {
        text: '成功',
        status: 'Success',
      },
      COMPILE_ERROR: {
        text: '编译失败',
        status: 'Error',
      },
      TIME_LIMIT_EXCEED: {
        text: '超时',
        status: 'warning',
      },
      MEMORY_LIMIT_EXCEED: {
        text: '内存过大',
        status: 'warning',
      },
      RUNTIME_ERROR: {
        text: '编译失败',
        status: 'Error',
      },
      PENDING_FAILED: {
        text: '答案错误',
        status: 'Error',
      },
    },
  },
  { title: '提交时间', key: 'time', dataIndex: 'time', valueType: 'dateTime' },
];

function PostCodeHistory(issues) {
  return (
    <ProTable<MeesageItem>
      columns={columns}
      bordered={false}
      request={async (params) => {
        console.log(params);
        let res = await queryIssueHistory({
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
      rowKey="id"
      search={false}
      showHeader={false}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
    />
  );
}

export default PostCodeHistory;
