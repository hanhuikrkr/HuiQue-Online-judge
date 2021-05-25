/*
 * @Author: your name
 * @Date: 2021-05-13 17:28:24
 * @LastEditTime: 2021-05-24 16:49:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\models\user.ts
 */
import type { Effect, Reducer } from 'umi';

import { queryCurrent, query as queryUsers } from '@/services/user';

export type CurrentUser = {
  coins?: number;
  email: string;
  favicon?: string;
  github?: string;
  id: number;
  introduction?: string;
  nickname?: string;
  phone?: string;
  point?: number;
  role?: userRoleTypes;
  website?: string;
  wechat?: string;

};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export enum userRoleTypes {
  user = "NORMAL",
  admin = "ADMIN",
  guest = "GUEST"

}
export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      console.log('queryUsers', response);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // TODO 这里有bug 搞不清楚如何登入转跳
    // BUG：16点42分还原设置为了修复
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      console.log('70 queryCurrent', response);

      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
