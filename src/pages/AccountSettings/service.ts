/*
 * @Author: your name
 * @Date: 2021-05-16 22:27:37
 * @LastEditTime: 2021-05-27 21:31:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\pages\AccountSettings\service.ts
 */
/*
 * @Author: your name
 * @Date: 2021-05-16 22:27:37
 * @LastEditTime: 2021-05-27 20:40:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\pages\AccountSettings\service.ts
 */
import request from '@/utils/request';
import { API_SERVER, PIC_SERVER } from '@/constant/api';
export async function queryCurrent() {
  console.log("12 accountSettings service.ts")
  // return request('/api/currentUser');
  return request(`${API_SERVER}/user/info`);
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

export async function uploadUserInfo(params) {
  return request(`${API_SERVER}/user/info`), {
    method: 'PUT',

    params: params

  }
}


