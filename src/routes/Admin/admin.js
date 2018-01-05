import React from 'react';
import { connect } from 'dva';
import {HashRouter as Router, Route, Link,Switch  } from 'react-router-dom';
import { Layout, Menu, Icon,Avatar,Breadcrumb,Modal,Button } from 'antd';
import HeaderCom from '../../components/Header/header';
import Home from '../../components/Example';
import HeaderSearch from 'ant-design-pro/lib/HeaderSearch';
import 'ant-design-pro/dist/ant-design-pro.css';
import styles from './admin.css';

const { Header,Footer,  Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;

class Users extends React.Component{
  state = {
    collapsed: false,
    title:'轮播设置',
    allTitle:'系统设置',
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  /*是否退出登录*/
  showDeleteConfirm = () => {
    confirm({
      title: '你确定要退出登录么？',
      content: '现在退出',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /*点击menu*/
  handleClick = (e) =>{
    this.setState({
      title:e.keyPath[0],
      allTitle:e.keyPath[1],
    })
  }
  render(){
    return (
      <Router>
        <Layout className={styles.admin_layout}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{boxShadow: '0 1px 4px rgba(0,21,41,.12)',}}
          >
            <div className={styles.logo}/>
            <Menu
              theme='dark'
              onClick={this.handleClick}
              defaultOpenKeys={['系统设置']}
              defaultSelectedKeys={['轮播设置']}
              selectedKeys={[this.state.current]}
              mode="inline"
            >
              <SubMenu key="系统设置" title={<span><Icon type="setting" /><span>系统设置</span></span>}>
                <Menu.Item key="轮播设置"><Link to='/admin/Home'>轮播设置</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="房屋" title={<span><Icon type="home" /><span>房屋</span></span>}>
                <Menu.Item key="全部房屋">全部房屋</Menu.Item>
                <Menu.Item key="房屋推荐"><Link to='/admin/HeaderCom'>房屋推荐</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="用户" title={<span><Icon type="user" /><span>用户</span></span>}>
                <Menu.Item key="全部用户">全部用户</Menu.Item>
                <Menu.Item key="用户约看">用户约看</Menu.Item>
                <Menu.Item key="用户需求">用户需求</Menu.Item>
              </SubMenu>
              <Menu.Item key="专享分期"><Icon type="disconnect"/><span>专享分期</span></Menu.Item>
              <Menu.Item key="共享家具"><Icon type="disconnect"/><span>共享家具</span></Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0,display:'flex',flexFlow:'row',position: 'relative',boxShadow: '0 1px 8px rgba(0,21,41,.12)', }}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={styles.headerSearch}>
                <HeaderSearch
                  placeholder="站内搜索"
                  dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
                  onSearch={(value) => {
                    console.log('input', value); // eslint-disable-line
                  }}
                  onPressEnter={(value) => {
                    console.log('enter', value); // eslint-disable-line
                  }}
                />
              </div>
              <div className={styles.AvatarDiv}>
                <Avatar className={styles.Avatar} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                wushuxuan
              </div>
              <Button onClick={this.showDeleteConfirm} className={styles.logout}>
                <Icon style={{fontSize:'18px',color:'#999'}} type="logout" />
              </Button>
            </Header>
            <Breadcrumb style={{ background:'#fff',padding:'20px 16px',marginBottom:'20px'}}>
              <Breadcrumb.Item>LECHENG</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.allTitle}</Breadcrumb.Item>
              <Breadcrumb.Item>{this.state.title}</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ margin: '0px 16px',padding:'10px', background: '#fff',}}>
              <Switch>
              <Route path="/admin/HeaderCom" component={HeaderCom}/>
              <Route path="/admin/Home" component={Home}/>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Copyright © 2017 LECHENG 短租
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default connect()(Users);
