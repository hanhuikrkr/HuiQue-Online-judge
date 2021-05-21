/*
 * @Author: your name
 * @Date: 2021-05-16 22:27:37
 * @LastEditTime: 2021-05-21 21:36:55
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
            authority: ['GUEST','ADMIN', 'NORMAL'],
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
                name: 'list.table-list',
                icon: 'code',
                path: '/list',
                component: './TableList',
                authority: ['GUEST','ADMIN', 'USER'],

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
