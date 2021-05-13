/*
 * @Author: your name
 * @Date: 2021-05-13 17:28:24
 * @LastEditTime: 2021-05-13 18:13:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HuiQue-Online-judge\config\defaultSettings.ts
 */
import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',

  primaryColor: '#58B2DC',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'HuiQue Online Judge',
  pwa: false,
  iconfontUrl: '',
  menu: {
    locale: true,
  },
  headerHeight: 70,
  splitMenus: false,
};

export type { DefaultSettings };

export default proSettings;
