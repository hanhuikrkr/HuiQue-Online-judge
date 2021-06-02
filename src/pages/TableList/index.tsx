import React, { useRef, useEffect, useState } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, Select, Layout, Row, Col } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { queryProblemList, queryTagList, queryHotList } from './service';
import { colors_antd } from '@/constant/data';
import DailyIssue from '@/components/DailyIssue/index';
import { Link } from 'umi';

const { Option } = Select;
const { Header, Footer, Sider, Content } = Layout;
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

export default () => {
  const actionRef = useRef<ActionType>();
  const [tagList, setTagList] = useState<Array<any>>([]);
  useEffect(() => {
    setTagList(JSON.parse(localStorage.getItem('huique_oj_taglist')) || '');
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
      render: (_, record) => (
        <Link to={{ pathname: `/issuecode`, search: `?id=${record.id}` }}>{_}</Link>
      ),
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
            <Select mode="multiple" allowClear defaultValue={[]} placeholder="请选择标签">
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
      search: false,
      key: 'digit',
      valueType: 'digit',
      width: 80,
    },
  ];

  const hotColumns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '标题',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,

      width: '80%',
      render: (_, record) => (
        <Link to={{ pathname: `/issuecode`, search: `?id=${record.id}` }}>{_}</Link>
      ),
    },
  ];
  return (
    <>
      <Layout>
        <Content>
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
                searchVal: params.name,
              });
              let taglist = await queryTagList();
              console.log(taglist);
              if (taglist.data) {
                localStorage.setItem('huique_oj_taglist', JSON.stringify(taglist.data || ''));
              }
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
              pageSizeOptions: ['5', '10', '20', '50', '100'],
              pageSize: 10,
            }}
            dateFormatter="string"
            headerTitle="题库列表"
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
        </Content>
        <Sider width={'30%'} style={{ backgroundColor: '#FFFFFF', marginLeft: '24px',padding:"12px" }}>
          <Row>
            <Col>
              <DailyIssue />
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ height: '5%', marginTop: '24px' }} />
            </Col>
          </Row>
          <Row>
            <Col>
            <h3 style={{ paddingLeft:"12px"}}>
{" "}🔥 热题榜</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <ProTable
                style={{ borderTop: '1px solid #f0f0f0', marginTop: '16px' }}
                columns={hotColumns}
                bordered={false}
                request={async () => {
                  let hotProblems = await queryHotList();
                  return {
                    data: hotProblems.data,
                    success: hotProblems.success,
                  };
                }}
                rowKey="id"
                search={false}
                showHeader={false}
                option={false}
                toolBarRender={false}
                pagination={false}
              ></ProTable>
            </Col>
          </Row>
        </Sider>
      </Layout>
    </>
  );
};
