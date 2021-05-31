import type { FC } from 'react';
import React, { useEffect } from 'react';
import { Button, Card, Col, Form, List, Row, Select, Tag } from 'antd';
import { LoadingOutlined, StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import ArticleListContent from './components/ArticleListContent';
import type { StateType } from './model';
import type { ListItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';
import { colors_antd } from '@/constant/data';
const { Option } = Select;
const FormItem = Form.Item;

let pageSize = 5;

type ArticlesForListProps = {
  dispatch: Dispatch;
  articlesForList: StateType;
  loading: boolean;
  issues: { any };
};
const ArticlesForList: FC<ArticlesForListProps> = (props) => {
  const {
    dispatch,
    articlesForList: { list },
    loading,
    issues,
  } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    console.log('issues', issues);
    dispatch({
      type: 'articlesForList/fetch',
      payload: {
        pageSize: 5,
        problemId: issues.id,
      },
    });
  }, []);
  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const fetchMore = () => {
    dispatch({
      type: 'articlesForList/appendFetch',
      payload: {
        lastId: pageSize,
        pageSize: (pageSize = pageSize + 5),
      },
    });
  };

  const owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({ type, text }) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <LikeOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined style={{ marginRight: 8 }} />
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  };
  const tagWithColor = (tagString: string) => {
    let tagList = JSON.parse(window.localStorage.getItem('huique_oj_taglist') || '');
    let currentTag = JSON.parse(tagString);
    return currentTag.map((tag) => {
      return <Tag color={colors_antd[tag - 1]}>{tagList[tag - 1].name}</Tag>;
    });
  };
  const loadMore = list.length > 0 && (
    <div style={{ textAlign: 'center', marginTop: 16 }}>
      <Button onClick={fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
        {loading ? (
          <span>
            <LoadingOutlined /> 加载中...
          </span>
        ) : (
          '加载更多'
        )}
      </Button>
    </div>
  );

  return (
    <>
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['wjh', 'zxx'],
          }}
          onValuesChange={() => {
            dispatch({
              type: 'articlesForList/fetch',
              payload: {
                count: 8,
              },
            });
          }}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">JAVA</TagSelect.Option>
                <TagSelect.Option value="cat2">C</TagSelect.Option>
                <TagSelect.Option value="cat3">C++</TagSelect.Option>
                <TagSelect.Option value="cat4">PYTHON</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="owner" grid>
            <FormItem name="owner" noStyle>
              <Select mode="multiple" placeholder="选择作者">
                {owners.map((owner) => (
                  <Option key={owner.id} value={owner.id}>
                    {owner.name}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              只看自己的
            </a>
          </StandardFormRow>
        </Form>
      </Card>
      <Card
      
        bordered={false}
        bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List<ListItemDataType>
          size="large"
          loading={list.length === 0 ? loading : false}
          rowKey="id"
          itemLayout="vertical"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText key="star" type="star-o" text={item.star || '0'} />,
                <IconText key="like" type="like-o" text={item.like} />,
                <IconText key="message" type="message" text={item.message || '0'} />,
              ]}
            >
              <List.Item.Meta
                title={<a className={styles.listItemMetaTitle}>{item.title}</a>}
                description={<span>{tagWithColor(item.tags)}</span>}
              />
              <ArticleListContent data={item} />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default connect(
  ({
    articlesForList,
    loading,
  }: {
    articlesForList: StateType;
    loading: { models: Record<string, boolean> };
  }) => ({
    articlesForList,
    loading: loading.models.articlesForList,
  }),
)(ArticlesForList);
