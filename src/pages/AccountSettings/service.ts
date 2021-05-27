/*
 * @Author: your name
 * @Date: 2021-05-16 22:27:37
 * @LastEditTime: 2021-05-27 20:51:11
 * @LastEditors: your name
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

export async function uploadImg(img) {
  return request(`${PIC_SERVER}/upload`), {
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    params: { smfile: img }

  }
}


