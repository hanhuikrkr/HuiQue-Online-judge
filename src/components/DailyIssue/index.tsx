import { Calendar } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './style.less';

export default () => {
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  const [issueIdList,setIssueIdList]=useState([])
  useEffect(()=>{

  },[])
  return (
    <div className={styles.dailyComponent}>
        <h3 style={{ paddingLeft:"12px"}}>
  {" "}π{" "}ζ―ζ₯δΈι’
        </h3>
      <Calendar fullscreen={false} onPanelChange={onPanelChange}      headerRender={({ value, type, onChange, onTypeChange }) => {
     
        return (
          <div style={{ padding: 8 }}>

          </div>
        );
      }} />
    </div>
  );
};
