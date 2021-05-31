import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import { querySolutionId } from '../server';

export default (props: { id: number }) => {
  const { id } = props;
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    querySolutionId(id).then((r) => {
      console.log(r);
      setLoading(false);
    });
  }, []);
  return (
    <PageContainer content="这是一个新页面，从这里进行开发！" className={styles.main}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div>
    </PageContainer>
  );
};
