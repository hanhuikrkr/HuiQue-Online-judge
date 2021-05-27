/*
 * @Author: your name
 * @Date: 2021-05-13 17:28:24
 * @LastEditTime: 2021-05-27 13:47:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\pages\TableList\service.ts
 */
import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';
import {API_SERVER}  from '@/constant/api'

export async function queryProblemList(params: TableListParams) {
  const {pageNumber,pageSize,level,tags} = params
  console.log("problem list params in",params)
  return request(`${API_SERVER}/problem?`, {
    params: {
      hasCount: true,
      lastId:0,
      level:level=="all"?undefined:level,
      pageNumber:pageNumber,
      pageSize:pageSize,
      tags:tags,
      totalCount:0,
    }
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryTagList(): Promise<any>{
  return request(`${API_SERVER}/tag/all`);
}
