/*
 * @Author: your name
 * @Date: 2021-05-20 23:44:10
 * @LastEditTime: 2021-05-21 22:31:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\services\login.ts
 */
import request from '@/utils/request';
import {API_SERVER} from '@/constant/api'
export type LoginParamsType = {
  userName: string;
  password: string;
  email: string;
  captcha: string;
  type: LoginParamsOfTypeType
  autoLogin:boolean
};
enum LoginParamsOfTypeType {
  email = 'email',
  account = 'account'
}

export async function fakeAccountLogin(params: LoginParamsType) {

  if (params.type === 'email') {
    let { email, captcha } = params;
    return request(`${API_SERVER}/user/login/code?code=${captcha}&email=${email}`, {
      method: 'POST'
    });
  }
  if (params.type === 'account') {
    let { userName, password } = params;
    return request(`${API_SERVER}/user/login/password?email=${userName}&password=${password}`, {
      method: 'POST'
    });
  }

}

export async function getFakeCaptcha(email: string) {
  console.log(email);
  return request(`${API_SERVER}/verify/email?email=${email}`, {
    method: 'put',

  });
}
