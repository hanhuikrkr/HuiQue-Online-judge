import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
  style={{width:"100%",height:"100%",backgroundColor:"#FFFFFF"}}
  icon={<img src="http://hanhuikrkr.com:7112/404.jpg" style={{width:"41%"}}></img>}
    title="一个好消息：网页一切正常"
    subTitle="但同时告诉一个坏消息：我们找不到您想要的页面"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        返回题库主页
      </Button>
    }
  />
);

export default NoFoundPage;
