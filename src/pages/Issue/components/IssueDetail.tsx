import React, { useRef, useState } from 'react';
import useDraggable from './hooks/useDraggable';
import styles from './IssueDetail.less';
import DraggleLayout from './DraggleLayout';
import { LanguageSelect } from '@/components/LanguageSelect/index';
import MarkdownArea from '@/components/Markdowm/index';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Button, Col, Row, Space } from 'antd';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/theme/solarized.css';
import 'codemirror/addon/selection/active-line';
import './codemirror.css'
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/css/css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint.js';
//折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';

const mode = { PYTHON: 'text/x-python', CPP: 'text/x-c++src', JAVA: 'text/x-java' };
const options=(language) =>{ return{
  theme: 'solarized',
  autofocus: true, //自动获取焦点
  styleActiveLine: true, //光标代码高亮
  lineNumbers: true, //显示行号
  smartIndent: true, //自动缩进
  indentUnit: 4,
  lineWrapping: true,
  foldGutter: true,
  matchBrackets: true,
  //start-设置支持代码折叠
  mode:mode[language],
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'], //end
  extraKeys: {
    Ctrl: 'autocomplete',
    'Ctrl-S': function (editor) {
      that.codeSave(editor);
    },
    'Ctrl-Z': function (editor) {
      editor.undo();
    }, //undo
    F8: function (editor) {
      editor.redo();
    }, //Redo
  },
  matchBrackets: true, //括号匹配，光标旁边的括号都高亮显示
  autoCloseBrackets: true, //键入时将自动关闭()[]{}''""
};}
function IssueDetail({ tab = 1, issue = { description: '' } }) {
  const [language, setLanguage] = useState('CPP');
  const handleLanguage = (value) => {
    console.log(value);
    setLanguage(value)
  };
  const [codevalue, setCodevalue] = useState('');
  return (
    <DraggleLayout
      containerWidth={window.innerWidth-48}
      containerHeight={window.innerHeight * 0.7}
      min={window.innerWidth / 5}
      max={window.innerWidth / 1.5}
      initLeftWidth={window.innerWidth / 2}
      handler={
        <div
          style={{
            width: 4,
            height: '100%',
            background: 'rgba(77, 81, 100,0.5)',
          }}
        />
      }
    >
      <div
        style={{
          height: '100%',
        }}
      >
        <MarkdownArea content={issue.description} />
      </div>
      <div
        style={{
          height: '100%',
          padding: '40px',
          overflowY:"scroll"
        }}
      >
        <div>
          <Space size={[60, 60]}>
            <LanguageSelect handleChange={handleLanguage} defaultvalue={'C/C++'} />
            <Button type="primary"> 提交</Button>
            </Space>
          <CodeMirror
            value={codevalue}
            options={options(language)}
            onBeforeChange={(editor, data, value) => {
              setCodevalue(value);
            }}
            onChange={(editor, data, value) => {}}
          />
        </div>
      </div>
    </DraggleLayout>
  );
}

export default IssueDetail;
