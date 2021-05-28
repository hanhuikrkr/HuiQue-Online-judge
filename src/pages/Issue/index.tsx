/*
 * @Author: your name
 * @Date: 2021-05-27 22:35:03
 * @LastEditTime: 2021-05-27 22:53:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\pages\Issue\index.tsx
 */
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import React, { useState, useEffect } from 'react';
import { Space, Spin } from 'antd';
import styles from './index.less';
import { colors_antd } from '@/constant/data';
import IssueDetail from './components/IssueDetail';
import { Link } from 'umi';
import { Button, Card, Icon, message, Tag } from 'antd';
import './index.less';

import { queryIssueDetails } from './server';

export default (props: any) => {
  const [issues, setIssues] = useState({
    level: { name: '', color: '' },
    id: 0,
    name: '',
    description: '',
    tags: [],
    like: '',
    timeLimit: 0,
    spaceLimit: 0,
    point:0,
  });
  const [tagList, setTagList] = useState([]);
  const [tab,setTab]= useState(1)
  useEffect(() => {
    queryIssueDetails({ id: props.location.query.id }).then((r) => {
      console.log('issue detail page=====>');
      console.log(r.data);
      if (r.data.level === 'EASY') {
        r.data.level = { name: '简单', color: 'green' };
      } else if (r.data.level === 'MEDIUM') {
        r.data.level = { name: '中等', color: 'orange' };
      } else {
        r.data.level = { name: '困难', color: 'red' };
      }
      r.data.tags = JSON.parse(r.data.tags);
      setIssues(r.data);
    });

    setTagList(JSON.parse(localStorage.getItem('huique_oj_taglist')));
  }, []);
  const onTabChange=(value)=>{
    console.log("you click tabs with value",value);
    setTab(value);
  }
  return (
    <PageContainer
    className={styles.main}
      fixedHeader
      header={{
        title: issues.name,
      }}
      content={
        <>
          <span style={{ marginRight: '10%' }}>
            难度：<span style={{ color: issues.level.color }}>{issues.level.name}</span>
          </span>

          <Space align="center" size={[8, 16]}>
            <span>标签：</span>
            {issues.tags.map((tag) => {
              return <Tag color={colors_antd[tag - 1]}>{tagList[tag - 1].name}</Tag>;
            })}
          </Space>

          <span style={{ marginLeft: '10%' }}>
            积分：<span style={{ color:"grey" ,fontFamily:"system-ui"}}>{issues.point}</span>
          </span>
          <span style={{ marginLeft: '10%' }}>
            运行限时：<span style={{ color:"grey" ,fontFamily:"system-ui"}}>{(issues.timeLimit/1000)>=1?issues.timeLimit/1000+" s":issues.timeLimit+" ms"} </span>
          </span>
          <span style={{ marginLeft: '10%' }}>
            空间限制：<span style={{ color:"grey" ,fontFamily:"system-ui"}}>{(issues.spaceLimit/1000)>=0.1?issues.spaceLimit/1000/1000+" MB":issues.spaceLimit/1000+" KB"} </span>
          </span>
        </>
      }
      tabList={[
        {
          tab: '题目描述',
          key: '1',
        },
        {
          tab: '题解',
          key: '2',
        },
        {
          tab: '提交记录',
          key: '3',
        },
      ]}
      onTabChange={onTabChange}

    >
      <IssueDetail tab={tab} issue={issues}/>
      
    </PageContainer>
  );
};
