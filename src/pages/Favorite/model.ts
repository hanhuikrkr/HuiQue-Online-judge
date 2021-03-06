import type { Effect, Reducer } from 'umi';

import type { CardListItemDataType } from './data.d';
import { queryDicList } from './service';

export type StateType = {
  list: CardListItemDataType[];
};

export type ModelType = {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
};

const Model: ModelType = {
  namespace: 'favorite',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDicList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
