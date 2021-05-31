import { Avatar, List } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';
import MarkdownArea from '@/components/Markdowm/index';
import { IconText } from '../IconText';

type ArticleListContentProps = {
  data: {
    content: string;
    time: number;
    userNickName: string;
    summary: string;
    like: number;
  };
};

const ArticleListContent: React.FC<ArticleListContentProps> = ({
  data: { like, summary, userNickName, time, content },
}) => (
  <div className={styles.listContent}>
    <List.Item
      actions={[
        <IconText key="star" type="star-o" text={'0'} />,
        <IconText key="like" type="like-o" text={like} />,
        <IconText key="message" type="message" text={'0'} />,
      ]}
    >
      <List.Item.Meta description={<div className={styles.description}>简介：{summary}</div>} />
    </List.Item>
    <div className={styles.extra}>
      <MarkdownArea content={content} />
      <a>{userNickName}</a> 发布在
      <em>{moment(time).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
