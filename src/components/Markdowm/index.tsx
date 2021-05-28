
import React from 'react'
import './md.css';
import './vs2015.css';
import styles from './index.less';
import MarkdownIt from 'markdown-it'


var hljs = require('highlight.js');


// 初始化Markdown解析器
const mdParser = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
        } catch (__) {}
      }
  
      return '<pre class="hljs"><code>' + mdParser.utils.escapeHtml(str) + '</code></pre>';
    },
  
    linkify: true,
    typographer: true
  })
const MarkdownArea = ({content = ''}) => {
  return (
      <>
      <div className={styles.textContainer}>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: mdParser.render(content) }}
      ></div>
    </div>
    </>
  )
}

export default MarkdownArea
