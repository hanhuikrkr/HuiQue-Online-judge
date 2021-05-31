import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin,Cascader, Input, Form, Button,notification } from 'antd';
import styles from './index.less';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import {history} from 'umi'

// 导入编辑器的样式
// TODO: 这里需要注意：将upload方法传入此组件
// TODO 当上传成功这显示result页面 
// TODO 并且提供用户返回方法
var hljs = require('highlight.js');
export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const mdParser = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        console.log(lang);
        try {
          return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
        } catch (__) {}
      }
  
      return '<pre class="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
    },
  });
  return (
    <PageContainer title="上传页面" content="这里有两个字段 一个是title 一个是tags" className={styles.main}>
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin spinning={loading} size="large" />
      </div>
    </PageContainer>
  );
};
