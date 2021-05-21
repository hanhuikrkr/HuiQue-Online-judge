/*
 * @Author: your name
 * @Date: 2021-05-13 17:28:24
 * @LastEditTime: 2021-05-21 15:56:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\layouts\UserLayout.tsx
 */
import type { MenuDataItem } from '@ant-design/pro-layout';
import { getMenuData, getPageTitle, DefaultFooter } from '@ant-design/pro-layout';
import { GithubOutlined } from '@ant-design/icons';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import type { ConnectProps } from 'umi';
import { Link, SelectLang, useIntl, connect, FormattedMessage } from 'umi';
import React from 'react';
import type { ConnectState } from '@/models/connect';
import logo from '../assets/1_3logo_复制.svg';
import styles from './UserLayout.less';

export type UserLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
} & Partial<ConnectProps>;

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />

              </Link>
            </div>
            <div className={styles.desc}>
              <FormattedMessage
                id="pages.layouts.userLayout.title"
                defaultMessage="Ant Design. The most influential Web design specification in Xihu District."
              />
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter
          className={styles.layout_footer_bar}
          copyright={`${new Date().getFullYear()} Produced by HuiQue Technology Department`}
          links={[
            {
              key: 'Ant Design Pro',
              title: (
                <>
                  <GithubOutlined />
                  {'\t'}Han Hui
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
                  {'\t'}Li Que
                </>
              ),
              href: 'https://github.com/j128919965/queoj2021.git',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
