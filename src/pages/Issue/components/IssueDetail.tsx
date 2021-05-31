import React, { useRef, useState } from 'react';
import useDraggable from './hooks/useDraggable';
import styles from './IssueDetail.less';
import { def_code } from '@/constant/data';
import DraggleLayout from './DraggleLayout';
import { LanguageSelect } from '@/components/LanguageSelect/index';
import MarkdownArea from '@/components/Markdowm/index';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Button, Col, Row, Space, notification } from 'antd';
import { putCodeRecord, getRecordStateByID } from './server';
import PostCodeHistory from '../IssueHistory/index';
import ArticlesForList from '@/pages/ArticlesForList/index';

//  import blow are all for codemirror as you can see
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/theme/solarized.css';
import 'codemirror/addon/selection/active-line';
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
import { useEffect } from 'react';

const mode = { PYTHON: 'text/x-python', CPP: 'text/x-c++src', JAVA: 'text/x-java' };
const options = (language) => {
  return {
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
    mode: mode[language],
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
  };
};

// the page for user read details and make the answer
// and to see the article wrote by authors
// and to see history post

function IssueDetail({ tab = 1, issue = { description: '' } }) {
  const [language, setLanguage] = useState('CPP');
  const handleLanguage = (value) => {
    setCodevalue(def_code[value]);
    setLanguage(value);
  };
  const [codevalue, setCodevalue] = useState('');
  const submitCode = (v) => {
    putCodeRecord(v).then((r) => {
      if (r.success === true && r.data) {
        notification.info({
          message: '代码运行中，请稍后...🕊️',
        });
        let id = setInterval(() => {
          getRecordStateByID(r.data).then((r) => {
            console.log('让我康康判断好了没');
            if (r.data !== 'PENDING') {
              notification.info({
                message: r.message,
              });
              clearInterval(id);
            }
          });
        }, 1000);
      } else {
        notification.error({
          message: 'Oops，代码出现问题～ 🥴',
        });
      }
    });
  };

  useEffect(() => {
    setCodevalue(def_code[language]);
  }, []);
  // to submit code to server
  const isLogin = localStorage.getItem('huique_oj_changeLoginStatus_accessT');
  return (
    <DraggleLayout
      containerWidth={window.innerWidth - 48}
      containerHeight={window.innerHeight * 0.64}
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
          overflowY: 'scroll',
        }}
      >
        {console.log(tab)}
        {tab == 1 && <MarkdownArea content={issue.description} />}
        {tab == 2 && <ArticlesForList issues={issue} />}
        {tab == 3 && <PostCodeHistory issues={issue} />}
      </div>
      <div
        style={{
          height: '100%',
          padding: '40px',
          overflowY: 'scroll',
        }}
      >
        <div>
          <Space size={[60, 60]}>
            <LanguageSelect handleChange={handleLanguage} defaultvalue={'C/C++'} />
            <Button
              disabled={!isLogin}
              type="primary"
              onClick={() => submitCode({ pid: issue.id, code: codevalue, languageType: language })}
            >
              {' '}
              {isLogin ? '提交' : '请先登录'}
            </Button>
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
