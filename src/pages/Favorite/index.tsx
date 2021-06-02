import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Drawer, List, Typography } from 'antd';
import React, { Component } from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from './model';
import type { CardListItemDataType } from './data.d';
import styles from './style.less';

const { Paragraph } = Typography;

type FavoriteProps = {
  favorite: StateType;
  dispatch: Dispatch;
  loading: boolean;
};
type FavoriteState = {
  visible: boolean;
  done?: boolean;
  current?: Partial<CardListItemDataType>;
};

class Favorite extends Component<FavoriteProps, FavoriteState> {
  state = { visible: false };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'favorite/fetch',
      payload: {
        count: 8,
      },
    });
  }
  
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const {
      favorite: { list },
      loading,
    } = this.props;

    const content = (
      <div className={styles.pageHeaderContent}>
        <p>
          在这里是您的收藏夹，记录着您喜欢的、常用的题目或者题解。
          <br></br>
          浏览时点击收藏，就会在这里显示哦
        </p>
      </div>
    );

    const extraContent = (
      <div className={styles.extraImg}>
        <img
          alt="这是一个标题"
          src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
        />
      </div>
    );
    const nullData: Partial<CardListItemDataType> = {};
    return (
      <PageContainer content={content} extraContent={extraContent}>
        <div className={styles.cardList}>
          <List<Partial<CardListItemDataType>>
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={[nullData, ...list]}
            renderItem={(item) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      actions={[<a key="option1" onClick={this.showDrawer}>展开</a>, <a key="option2">编辑</a>]}
                    >
                      <Card.Meta
                        title={<a>{item.size} 项收藏</a>}
                        description={
                          <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                            {'\n'}
                            {item.name}
                          </Paragraph>
                        }
                      />
                    
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className={styles.newButton}>
                    <PlusOutlined /> 新增收藏夹
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
        <Drawer
                        title="Basic Drawer"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        style={{ position: 'absolute' }}
                      >
                        <p>Some contents...</p>
                      </Drawer>
      </PageContainer>
    );
  }
}

export default connect(
  ({
    favorite,
    loading,
  }: {
    favorite: StateType;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    favorite,
    loading: loading.models.favorite,
  }),
)(Favorite);
