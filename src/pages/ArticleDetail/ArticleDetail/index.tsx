import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import { querySolutionId } from '../server';
import { history } from 'umi';
import {IconText} from '@/components/IconText/index'
import ArticleListContent from '@/components/ArticleListContent';
export default (props) => {
  const id = props.location.query.id;
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState({
    content: '优质回答',
    id: 1,
    like: 0,
    pid: 1,
    summary: '优质回答',
    tags: '[11, 2]',
    time: '2021-05-27 19:52:40',
    title: '我不知道',
    uid: 1,
    userNickName: 'quezr',
  });
  useEffect(() => {
    querySolutionId(id).then((r) => {
      console.log(r);
      if (r.success) {
        setData(r.data);
      } else {
        history.push(`/404`);
      }
      setLoading(false);
    });
  }, []);
  return (
    <PageContainer title={data.title}
    content={ <ArticleListContent data={data} />} className={styles.main}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
        {!loading&&<>
         

        </>}
      </div>
    </PageContainer>
  );
};
