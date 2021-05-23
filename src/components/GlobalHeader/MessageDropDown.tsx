/*
 * @Author: your name
 * @Date: 2021-05-21 17:48:01
 * @LastEditTime: 2021-05-23 18:09:21
 * @LastEditors: Please set LastEditors
 * @Description: 消息列表下拉
 * @FilePath: \HuiQue-Online-judge\src\components\GlobalHeader\MessageDropDown.tsx
 */

import React from 'react';
import { Menu, Dropdown,message ,Badge } from 'antd';
import styles from './index.less';

import { DropDownProps } from 'antd/es/dropdown';
import { getLocale, getAllLocales, setLocale } from './localeExports';
import { DownOutlined,MessageOutlined } from '@ant-design/icons';
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};
const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);
const MessageDropDown: any=()=>{
return(
  <Dropdown className={styles.action} placement="bottomCenter" overlay={menu} trigger={['click','hover']}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
    <Badge count={2} dot>
    <MessageOutlined />
    </Badge>
    </a>
  </Dropdown>)
}
export default MessageDropDown;
