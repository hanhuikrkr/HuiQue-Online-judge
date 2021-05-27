import React, { useRef, useEffect, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, Select } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { queryProblemList, queryTagList } from './service';
import { colors_antd } from '@/constant/data';
import { Link } from 'umi';

const { Option } = Select;

type IssueItem = {
  id: number;
  number: number;
  title: string;
  tags: {
    name: string;
    color: string;
  }[];
  state: string;
};

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default () => {
  const actionRef = useRef<ActionType>();
  const [tagList, setTagList] = useState<Array<any>>([]);
  useEffect(() => {
    setTagList(JSON.parse(localStorage.getItem('huique_oj_taglist')));
  }, []);
  const columns: ProColumns<IssueItem>[] = [
    {
      title: '标题',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      render: (_,record) => <Link to={{ pathname: `/issuecode`,search:`?id=${record.id}` }}>{_}</Link>,
      width: '50%',
    },
    {
      title: '难度',
      dataIndex: 'level',
      filters: true,
      onFilter: true,
      width: '15%',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        EASY: {
          text: '简单',
          status: 'Success',
        },
        MEDIUM: {
          text: '中等',
          status: 'Warning',
        },
        HARD: {
          text: '困难',
          status: 'Error',
        },
      },
    },
    {
      title: '标签',
      dataIndex: 'tags',
      filters: true,
      onFilter: true,

      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        // console.log('tagList local_storage', tagList);
        if (tagList)
          return (
            <Select mode="multiple" allowClear defaultValue={[]}>
              {tagList.map((tag) => {
                return <option key={tag.id}>{tag.name}</option>;
              })}
            </Select>
          );
        return <Select mode="multiple" allowClear></Select>;
      },
      render: (_, record) => (
        <Space size={[0, 8]} wrap>
          {record.tags.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '积分',
      dataIndex: 'point',
      key: 'digit',
      valueType: 'digit',
      width: 80,
    },
  ];
  return (
    // https://procomponents.ant.design/components/table#%E6%90%9C%E7%B4%A2%E8%A1%A8%E5%8D%95%E8%87%AA%E5%AE%9A%E4%B9%89
    <ProTable<IssueItem>
      columns={columns}
      actionRef={actionRef}
      request={async (params) => {
        console.log(params);
        let res = await queryProblemList({
          pageNumber: params.current - 1,
          pageSize: params.pageSize,
          level: params.level,
          tags: params.tags,
        });
        let taglist = await queryTagList();
        localStorage.setItem('huique_oj_taglist', JSON.stringify(taglist.data));
        // console.log(res, taglist);
        let data = res.data.data.map((oldData) => {
          let oldtags = JSON.parse(oldData.tags);
          console.log(oldtags);
          let tagsWithInfo = oldtags.map((item: Number) => {
            // console.log("taglist.data[item].name",taglist.data[item-1]);
            return {
              name: taglist.data[item - 1].name,
              color: colors_antd[(item - 1) % colors_antd.length],
            };
          });
          oldData.tags = tagsWithInfo;
          return oldData;
        });
        return {
          data: data,
          sucess: res.sucess,
          total: res.data.totalCount,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      // toolBarRender={() => [
      //   <Button key="button" icon={<PlusOutlined />} type="primary">
      //     新建
      //   </Button>,
      //   <Dropdown key="menu" overlay={menu}>
      //     <Button>
      //       <EllipsisOutlined />
      //     </Button>
      //   </Dropdown>,
      // ]}
    />
  );
};
