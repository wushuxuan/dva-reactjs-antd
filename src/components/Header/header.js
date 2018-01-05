import React, { Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

class everything extends React.Component {
  constructor(props) {
    super(props);

    //表格列的配置描述
    this.columns = [{
      title: '轮播标题',
      dataIndex: 'SwiperName',
    }, {
      title: '轮播链接地址',
      dataIndex: 'SwiperUrl',
    }, {
      title: '轮播图片',
      dataIndex: 'SwiperImage',
    },{
      title: '创建时间',
      dataIndex: 'SwiperTime',
    }, {
      title: '状态',
      dataIndex: 'SwiperState',
    }, {
      title: '操作',
      dataIndex: 'SwiperOperation',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 1 ?
            (
              <Popconfirm title="确定删除?" onConfirm={() => this.onDelete(record.key)}>
                <a href="#">删除</a>
              </Popconfirm>
            ) : null
        );
      },
    }];
    //设置初始表格数据
    this.state = {
      dataSource: [],
      count: 0,
    };
  }
  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }
//点击添加触发函数
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      SwiperName: `Edward King ${count}`,
      SwiperUrl: 32,
      SwiperImage: `London, Park Lane no. ${count}`,
      SwiperTime:`2017/12/12 9点31分`,
      SwiperState:`显示`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div style={{width:'95%',margin:'20px auto'}}>
        <Button className="editable-add-btn" onClick={this.handleAdd} style={{marginBottom:'10px'}}>添加</Button>
        <Table bordered dataSource={dataSource} columns={columns}/>
      </div>
    );
  }
}


export default everything;
