import {queryList} from '@/services/test';
export default {
  namespace: 'test',
  state: {
    list: []//表格数据
  },
  effects: {
    *query_list({ payload }, { call, put }){
      const response = yield call(queryList, payload);
      console.log("请求的资源",response)
      yield put({
        type: 'query_List',
        payload: response,//参数
      });
    }
  },
  reducers: {
    query_List(state, action) {

      console.log("state",state);
      console.log("action",action)
      let msg={
        ...state,
        list: action.payload.list,
      };
      return msg
    }
  },
};
