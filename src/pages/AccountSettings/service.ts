
var removePropertyOfNull = function (obj) {
  Object.keys(obj).forEach((item) => {
    if (!obj[item]) delete obj[item];
  });
  return obj;
};
import request from '@/utils/request';
import { API_SERVER, PIC_SERVER } from '@/constant/api';
export async function queryCurrent() {
  console.log('12 accountSettings service.ts');
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
  let p = removePropertyOfNull(params);
  return request(`${API_SERVER}/user/info?`, {
    method: 'PUT',
    params: p,
  });
}

export async function changePassword(params) {
  return request(`${API_SERVER}/user/password?`, {
    method: 'POST',
    params: params,
  });
}


export async function queryMessage(params) {
  return request(`${API_SERVER}/message`,{
    params: params
  })
}

export async function oneStepToReadAll() {
  return request(`${API_SERVER}/message/read`,{method: 'PUT'})
}

export async function deleteMessage(){
  return request(`${API_SERVER}/message`,{method:'delete'})
}