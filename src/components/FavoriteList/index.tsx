import ProTable from '@ant-design/pro-table';
import { Button, Tag, Space, Menu, Dropdown, Tooltip, notification } from 'antd';
import React from 'react';
import { Link } from 'umi';
import {queryItemsList} from './server'
function FavoriteList(props:{favoriteId:number}){
  const columns = [

   
    {
      title: '标题',
      dataIndex: 'itemTitle',
     width:"80%",
     render: (_, record) => (
       <>
       {(record.type==="PROBLEM"&&    <Link to={{ pathname: `/issuecode`, search: `?id=${record.id}` }}>{_}</Link>)}
       {(record.type==="SOLUTION"&&    <Link target = "_blank" to={{ pathname: `/articledetail`, search: `?id=${record.id}` }}>{_}</Link>)}
    </>
       
       
    ),
    },
  

    { title: '收藏时间', key: 'createTime', dataIndex: 'createTime', valueType: 'dateTime' },
  ];
    return(
    <ProTable
    columns={columns}
    bordered={false}
    request={async (params) => {
      let res = await queryItemsList({
        favoriteId:props.favoriteId
      });
      console.log(res.data.data);
      return {
        data: res.data,
        success: res.success,
      };
    }}
    rowKey="id"
    search={false}
    showHeader={false}
    pagination={false}
    toolBarRender={false}
    dateFormatter="string"
  />
    )
}
export default FavoriteList;
