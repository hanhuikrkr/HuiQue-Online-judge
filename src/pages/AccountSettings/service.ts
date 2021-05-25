/*
 * @Author: your name
 * @Date: 2021-05-16 22:27:37
 * @LastEditTime: 2021-05-24 15:21:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\pages\AccountSettings\service.ts
 */
import request from '@/utils/request';

export async function queryCurrent() {
  console.log("12 accountSettings service.ts")
  // return request('/api/currentUser');
   return request('https://ssacgn.online/hqoj/user/info');
}
export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}
