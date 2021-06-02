/*
 * @Author: your name
 * @Date: 2021-05-16 22:27:37
 * @LastEditTime: 2021-05-27 22:47:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\config\routes.ts
 */
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['GUEST', 'ADMIN', 'NORMAL'],
            routes: [
              {
                path: '/',
                redirect: '/list',
              },
              {
                path: '/welcome',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: '题库',
                icon: 'code',
                path: '/list',
                component: './TableList',
                authority: ['GUEST', 'ADMIN', 'NORMAL'],
              },
              {
                path: '/account/center',
                component: './Workplace',
              },
              {
                path: '/account/settings',
                component: './AccountSettings',
              },
              {
                name: '收藏',
                icon: 'heart',
                path: '/favorite',
                component: './Favorite',
                authority: ['ADMIN', 'NORMAL'],
              },
              {
                icon: 'smile',
                path: '/issuecode',
                component: './Issue',
              },
              {
                path: '/articledetail',
                component: './ArticleDetail/ArticleDetail',
              },
              {
              
                path: '/uploaddoc',
                component: './UploadDoc',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
