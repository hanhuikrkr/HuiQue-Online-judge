import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

export class LanguageSelect extends React.Component {
  render () {
    return (
      <Select
        style={{ width: 200 }}
        placeholder='语言'
        optionFilterProp='children'
        onChange={this.props.handleChange}
        className='status-table-header-other-select'
        allowClear={!this.props.allowClear}
        defaultValue={this.props.defaultvalue}
      >
        <Option value='CPP'>C/C++</Option>
        {/* <Option value="2">Pascal</Option> */}
        <Option value='JAVA'>Java 11</Option>
        {/* <Option value="4">Ruby</Option> */}
        {/* <Option value="5">Shell</Option> */}
        <Option value='PYTHON'>Python3.7</Option>
        {/* <Option value="7">php</Option> */}
        {/* <Option value="9">perl</Option> */}
      </Select>
    )
  }
}
