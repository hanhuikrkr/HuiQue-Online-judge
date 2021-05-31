import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import { uploadUserInfo } from '@/pages/AccountSettings/service';
import type { CurrentUser } from '../data.d';

import styles from './BaseView.less';

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 文件哦!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('文件需小于 2MB 哦!');
  }
  return isJpgOrPng && isLt2M;
};
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => <></>;

type BaseViewProps = {
  currentUser?: CurrentUser;
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
class BaseView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;
  state = {
    loading: false,
    imgUrl: '',
  };
  getAvatarURL() {
    const { currentUser } = this.props;
    let url = 'http://hanhuikrkr.com:7112/404.jpg';
    if (currentUser) {
      if (currentUser.favicon) {
        url = currentUser.favicon;
      }
    }
    this.setState({
      imgUrl: url,
    });
  }

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handleFinish = (v) => {
    console.log(v);
    uploadUserInfo(v).then((r) => {
      if (r.success === true) {
        message.success(formatMessage({ id: 'accountsettings.basic.update.success' }));
      }
    });
  };
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        uploadUserInfo({ favicon: imageUrl }).then((r) => {
          console.log(r);
          this.setState({
            imgUrl: imageUrl,
            loading: false,
          });
        }),
      );
    }
  };
  componentDidMount = () => {
    this.getAvatarURL();
  };
  render() {
    const { currentUser } = this.props;
    const { loading } = this.state;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            <Form.Item
              name="email"
              label={formatMessage({ id: 'accountsettings.basic.email' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'accountsettings.basic.email-message' }, {}),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="nickname"
              label={formatMessage({ id: 'accountsettings.basic.nickname' })}
              rules={[
                {
                  required: false,
                  message: formatMessage({ id: 'accountsettings.basic.nickname-message' }, {}),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="introduction"
              label={formatMessage({ id: 'accountsettings.basic.profile' })}
              rules={[
                {
                  required: false,
                  message: formatMessage({ id: 'accountsettings.basic.profile-message' }, {}),
                },
              ]}
            >
              <Input.TextArea
                placeholder={formatMessage({ id: 'accountsettings.basic.profile-placeholder' })}
                rows={4}
              />
            </Form.Item>
            <Form.Item
              name="github"
              label={formatMessage({ id: 'accountsettings.basic.github' })}
              rules={[
                {
                  required: false,
                  pattern:
                    /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/,
                  message: formatMessage({ id: 'accountsettings.basic.github-message' }, {}),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="website"
              label={formatMessage({ id: 'accountsettings.basic.website' })}
              rules={[
                {
                  required: false,
                  pattern:
                    /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/,
                  message: formatMessage({ id: 'accountsettings.basic.website-message' }, {}),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="wechat"
              label={formatMessage({ id: 'accountsettings.basic.wechat' })}
              rules={[
                {
                  required: false,
                  message: formatMessage({ id: 'accountsettings.basic.wechat-message' }, {}),
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label={formatMessage({ id: 'accountsettings.basic.cellphone' })}
              rules={[
                {
                  required: false,
                  pattern: /^1[0-9]{10}$/,
                  message: formatMessage({ id: 'accountsettings.basic.cellphone-message' }, {}),
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                <FormattedMessage
                  id="accountsettings.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.right}>
          {/* <AvatarView avatar={this.getAvatarURL()} />
           */}
          <div className={styles.avatar_title}>
            <FormattedMessage id="accountsettings.basic.avatar" defaultMessage="Avatar" />
          </div>
          <div className={styles.avatar}>
            {loading ? <LoadingOutlined /> : <img src={this.state.imgUrl} alt="avatar" />}
          </div>
          <Upload
            name="smfile"
            showUploadList={false}
            beforeUpload={beforeUpload}
            method={'POST'}
            onChange={this.handleChange}
            action="https://sm.ms/api/v2/upload"
            headers={{
              'Content-Type': 'multipart/form-data',
              "Authorization": `rYraBpOP5l0Fz9rC2BoYsqfQToEiWWUp`,
            }}
          >
            {/* //BUG  添加头像上传地址 */}
            <div className={styles.button_view}>
              <Button loading={loading}>
                <UploadOutlined />
                <FormattedMessage
                  id="accountsettings.basic.change-avatar"
                  defaultMessage="Change avatar"
                />
              </Button>
            </div>
          </Upload>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ accountSettings }: { accountSettings: { currentUser: CurrentUser } }) => ({
    currentUser: accountSettings.currentUser,
  }),
)(BaseView);
