import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

type ArticleListContentProps = {
  data: {
    time: number;
    userNickName: string;
    summary:string
  };
};

const ArticleListContent: React.FC<ArticleListContentProps> = ({
  data: { summary, userNickName, time },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{summary}</div>
    <div className={styles.extra}>
    
      <a>{userNickName}</a> 发布在
      <em>{moment(time).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
