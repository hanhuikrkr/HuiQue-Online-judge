import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'HuiQue Online Judge',
  pwa: false,
  iconfontUrl: '',
  menu: {
    locale: true
  },
  headerHeight: 70,
  splitMenus: false
};

export type { DefaultSettings };

export default proSettings;
