/*
 * @Author: your name
 * @Date: 2021-05-16 16:05:04
 * @LastEditTime: 2021-05-20 22:48:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\layouts\DefaultFoot.tsx
 */
import { DefaultFooter } from '@ant-design/pro-layout';
import { GithubOutlined } from '@ant-design/icons';
import styles from './BasicLayout.less';

const defaultFooterDom = (
  <DefaultFooter
  className={styles.layout_footer_bar}
    copyright={`${new Date().getFullYear()} Produced by HuiQue Technology Department`}
    links={[
      {
        key: 'Ant Design Pro',
        title: (
          <>
            <GithubOutlined />
            {'  '}Han Hui
          </>
        ),
        href: 'https://github.com/hanhuikrkr/HuiQue-Online-judge',
        blankTarget: true,
      },

      {
        key: 'Ant Design',
        title: (
          <>
            <GithubOutlined />
            {'  '}Li Que
          </>
        ),
        href: 'https://github.com/j128919965/queoj2021.git',
        blankTarget: true,
      },
    ]}
  />
);

export default defaultFooterDom;
