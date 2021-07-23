import request from '@/utils/request';

export async function queryList(params) {
    return request('/test/queryList', {
      method: 'POST',
      body: params,
    });
  }