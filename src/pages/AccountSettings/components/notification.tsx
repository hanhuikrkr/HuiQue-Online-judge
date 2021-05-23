/*
 * @Author: your name
 * @Date: 2021-05-16 22:27:37
 * @LastEditTime: 2021-05-23 21:59:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\pages\AccountSettings\components\notification.tsx
 */
import { List, Switch } from 'antd';
import React, { Component, Fragment } from 'react';

import { formatMessage } from 'umi';

type Unpacked<T> = T extends (infer U)[] ? U : T;

class NotificationView extends Component {
  getData = () => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({ id: 'accountsettings.settings.open' })}
        unCheckedChildren={formatMessage({ id: 'accountsettings.settings.close' })}
        defaultChecked
      />
    );
    return [
      {
        title: formatMessage({ id: 'accountsettings.notification.password' }, {}),
        description: formatMessage({ id: 'accountsettings.notification.password-description' }, {}),
        actions: [Action],
      },
      {
        title: formatMessage({ id: 'accountsettings.notification.messages' }, {}),
        description: formatMessage({ id: 'accountsettings.notification.messages-description' }, {}),
        actions: [Action],
      },
      {
        title: formatMessage({ id: 'accountsettings.notification.todo' }, {}),
        description: formatMessage({ id: 'accountsettings.notification.todo-description' }, {}),
        actions: [Action],
      },
    ];
  };

  render() {
    const data = this.getData();
    return (
      <Fragment>
        <List<Unpacked<typeof data>>
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title}  />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default NotificationView;
