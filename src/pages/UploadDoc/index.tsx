import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Cascader, Input, Form, Button, notification, Select, PageHeader } from 'antd';
import styles from './index.less';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { history } from 'umi';
import { submitDoc } from './server';

// 导入编辑器的样式
// TODO: 这里需要注意：将upload方法传入此组件
// TODO 当上传成功这显示result页面
// TODO 并且提供用户返回方法
var hljs = require('highlight.js');
import 'react-markdown-editor-lite/lib/index.css';
import 'highlight.js/styles/vs.css';
const { Option } = Select;
const { TextArea } = Input;
export default (props) => {
  const { submit, issue } = props;
  const [docData, setDocData] = useState('');
  const [tagList, setTagList] = useState<Array<any>>([]);

  useEffect(() => {
    let docDataSave = localStorage.getItem('huique_upload_doc_save');
    if (docDataSave) {
      setDocData(docDataSave);
    }
    setTagList(JSON.parse(localStorage.getItem('huique_oj_taglist') || '') || []);
  }, []);
  const mdParser = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        console.log(lang);
        try {
          return (
            '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>'
          );
        } catch (__) {}
      }

      return '<pre class="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
    },
  });
  const getSavedFormData = () => {
    console.log(JSON.parse(localStorage.getItem('huique_upload_form_save') || '{}') || {});
    return JSON.parse(localStorage.getItem('huique_upload_form_save') || '{}') || {};
  };
  const onFinish = async (values: any) => {
    console.log(values);
    localStorage.setItem('huique_upload_form_save', JSON.stringify(values));
    let params = {
      content: docData,
      pid: issue.id,
      summary: values.docab,
      tags: values.doctype,
      title: values.doctitle,
    };

    let r = await submitDoc(params);
    if (r) {
      if (r.success) {
        notification.success({
          message: '题解上传成功',
          description: `《${params.title}》`,
        });
        localStorage.removeItem('huique_upload_doc_save');
        localStorage.removeItem('huique_upload_form_save');
        submit(2);
      } else {
        notification.warning({
          message: '题解上传失败',
          description: `《${params.title}》`,
        });
        submit(3);
      }
    } else {
      notification.warning({
        message: '题解上传失败',
        description: `《${params.title}》`,
      });
      submit(3);
    }
  };
  const handleChange = (value: string) => {
    console.log(value);
  };
  function handleEditorChange({ html, text }: any) {
    localStorage.setItem('huique_upload_doc_save', text);
    setDocData(text);
    //   console.log('handleEditorChange', html, text)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.uploaderFrom}
        initialValues={getSavedFormData()}
      >
        <Form.Item name="doctitle" noStyle rules={[{ required: true, message: '请输入标题' }]}>
          <Input className={styles.dropdownCascader} placeholder="请输入标题" />
        </Form.Item>
        <Form.Item name="doctype" noStyle rules={[{ required: true, message: '请选择标签' }]}>
          <Select
            mode="multiple"
            allowClear
            defaultValue={[]}
            placeholder="请选择标签"
            className={styles.dropdownCascader}
          >
            {tagList.map((tag) => {
              return <option key={tag.id}>{tag.name}</option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item name="docab" noStyle rules={[{ required: true, message: '请输入概要' }]}>
          <Input type="textarea" className={styles.inputSummary} placeholder="请输入概要" />
        </Form.Item>

        <div className={styles.mdEditorClass}>
          <Form.Item name="doctext" noStyle valuePropName="text">
            <MdEditor
              style={{ height: '100%' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={docData}
            />
          </Form.Item>
        </div>
        <Button className={styles.uploadBtn} type="primary" htmlType="submit">
          提交题解
        </Button>
        <Button className={styles.uploadBtn} onClick={() => submit(0)}>
          返回编程
        </Button>
      </Form>
    </>
  );
};
