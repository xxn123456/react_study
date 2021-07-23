import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
export default {
  namespace: 'list',
  state: {
    list: [],
    test: 0
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *changeTest({ payload }, { call, put }){
      yield put({
        type: 'testOne',
        payload: payload,
      });
    }
  },
  reducers: {
    queryList(state, action) {
      let msg={
        ...state,
        list: action.payload,
      };
      return msg
    },
    testOne(state, action) {
      let msg={
        ...state,
        test: action.payload,
      };
      return msg
    }
  },
};
