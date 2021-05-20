import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  email: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  console.log(params)
  let {email,captcha} = params;
  return request(`https://ssacgn.online/hqoj/user/login/code?code=${captcha}&email=${email}`, {
    method: 'POST'
  });
}

export async function getFakeCaptcha(email: string) {
  console.log(email);
  return request(`https://ssacgn.online/hqoj/verify/email?email=${email}`,{
    method:'put',

  });
}
