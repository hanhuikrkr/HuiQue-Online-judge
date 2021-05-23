/*
 * @Author: your name
 * @Date: 2021-05-16 22:27:37
 * @LastEditTime: 2021-05-23 22:20:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\pages\AccountSettings\components\security.tsx
 */
import { FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import { FormInstance } from 'antd/lib/form';
import { List, Modal, Form, Input, Button } from 'antd';

type Unpacked<T> = T extends (infer U)[] ? U : T;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="accountsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="accountsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="accountsettings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};
interface SecurityState {
  isModalVisible: boolean;
}

class SecurityView extends Component<SecurityState> {
  state: SecurityState = {
    isModalVisible: false,
  };
  formRef = React.createRef<FormInstance>();
  setIsModalVisible = (val: boolean) => {
    this.setState({
      isModalVisible: val,
    });
  };
  showModal = () => {
    this.setIsModalVisible(true);
  };
  handleOk = () => {
    this.setIsModalVisible(false);
  };
  handleCancel = () => {
    this.setIsModalVisible(false);
  };
  getData = () => [
    {
      title: formatMessage({ id: 'accountsettings.security.password' }, {}),
      description: (
        <>
          {formatMessage({ id: 'accountsettings.security.password-description' })}：
          {passwordStrength.strong}
        </>
      ),
      actions: [
        <a key="Modify" onClick={this.showModal}>
          <FormattedMessage id="accountsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
  ];

  render() {
    const data = this.getData();

    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
    };
    return (
      <>
        <List<Unpacked<typeof data>>
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} />
            </List.Item>
          )}
        />
        <Modal
          title="Basic Modal"
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Form
            {...formItemLayout}
            ref={this.formRef}
            name="control-ref"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="oldPassword"
              label="旧密码"
              rules={[
                {
                  required: true,
                  message: '请输入旧密码',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="新密码"
              rules={[
                {
                  required: true,
                  message: '请输入新密码',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm password"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请确认密码',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入密码不一致，请确认新密码'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button style={{ width: '130px' ,marginRight:"24px",marginBottom:"24px"}} type="primary" htmlType="submit">
                确认修改
              </Button>

              <Button
                style={{ width: '130px' }}
                type="default"
                htmlType="submit"
                onClick={this.handleCancel}
              >
                取消
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default SecurityView;
