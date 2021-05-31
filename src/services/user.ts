/*
 * @Author: your name
 * @Date: 2021-05-13 17:28:24
 * @LastEditTime: 2021-05-25 10:39:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\services\user.ts
 */
import request from '@/utils/request';
import {API_SERVER} from '@/constant/api'
export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  // BUG:queryCurrent修复 16点40分
  // return request('/api/currentUser');

  return request(`${API_SERVER}/user/info`);
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
