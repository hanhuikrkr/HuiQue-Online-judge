/*
 * @Author: your name
 * @Date: 2021-05-20 23:44:10
 * @LastEditTime: 2021-05-27 22:45:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\src\utils\request.ts
 */
/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { history } from 'umi';
import { stringify } from 'querystring';
import { notification } from 'antd';
import { API_SERVER } from '@/constant/api';
const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const retry = (response, options) => {
  return request(response.url, options);
};
const getUserToken = () => {
  return localStorage.getItem('huique_oj_changeLoginStatus_accessT');
};
const getUserRefreshToken = () => {
  return localStorage.getItem('huique_oj_changeLoginStatus_refreshT');
};
const removeUserToken = () => {
  localStorage.removeItem('huique_oj_changeLoginStatus_accessT');
  localStorage.removeItem('huique_oj_changeLoginStatus_refreshT');
};

/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `Request error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network anomaly',
    });
  }
  return response;
};
async function refreshToken() {
  return request(`${API_SERVER}/user/refresh`, {
    method: 'POST',
    params: {
      token: getUserRefreshToken(),
    },
  });
}
/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // default error handling
});
request.interceptors.request.use(async (url, options) => {
  const token = getUserToken();
  if (token) {
    //如果有token 就走token逻辑
    let headers = {
      Authorization: `${token}`,
    };
    return {
      url: url,
      options: { ...options, headers: headers },
    };
  } else {
    return {
      url: url,
      options: { ...options },
    };
  }
});
request.interceptors.response.use(async (response, options) => {
  const result = await response.clone().json();
  const { data, message, success } = result;
  console.log('拦截response', result);
  if (data === 3 && success === false) {
    console.log('更新token');
    let tokenData = await refreshToken();
    console.log(tokenData);
    localStorage.setItem('huique_oj_changeLoginStatus_accessT', tokenData.data.accessToken);
    localStorage.setItem('huique_oj_changeLoginStatus_refreshT', tokenData.data.refreshToken);
    return retry(response, options);
  }
  if (
    (data === 2 && success === false) ||
    (data === 5 && success === false) ||
    message === '解析token失败' 
  ) {
    removeUserToken();
    return retry(response, options);
    // history.replace({
    //   pathname: '/user/login',
    //   search: stringify({
    //     redirect: window.location.href,
    //   }),
    // });
  }
  return response;
});

export default request;
