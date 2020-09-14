import React from 'react';
import logo from './images/fuyou-logo.png';

import styled from 'styled-components'
import './App.css'
import { HashRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Menu, Card } from 'antd';

import User from './components/User'
import Carousel from './components/Add'

//导航图标
import {
  PictureOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  BugOutlined,
  UserOutlined,
} from '@ant-design/icons';



const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const TitleWrapper = styled.div`
  height: 32px;
  margin: 16px;
  color:white;
  font-size:18px;
  text-align:center;
  font-weight:bolder;
`

const HeaderContainer = styled.div`
  height:100%;
  padding:8px 16px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  img{

  }
`
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      menuList: [],
      name: '张飞'
    };
  }

  componentDidMount = () => {
  }


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Layout style={{ height: '100vh' }}>
          <Sider style={{ height: '100%' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <TitleWrapper>妇幼后台管理系统</TitleWrapper>
            <Menu theme="dark" defaultOpenKeys={['system']} defaultSelectedKeys={['user']} mode="inline">
              <Menu.Item key="user" icon={<UserOutlined />}>
                <Link to='/user'>用户管理</Link>
              </Menu.Item>
              <Menu.Item key="menu" icon={<MenuUnfoldOutlined />}>
                <Link to='/menu'>菜单与类型管理</Link>
              </Menu.Item>
              <Menu.Item key="index" icon={<HomeOutlined />}>
                <Link to='/index'>首页配置</Link>
              </Menu.Item>
              <Menu.Item key="carousel" icon={<PictureOutlined />}>
                <Link to='/carousel'>轮播图管理</Link>
              </Menu.Item>
              <SubMenu key="system" title="系统管理" icon={<BugOutlined />}>
                <Menu.Item key="visit">
                  <Link to='/ststem/visit'>访问记录</Link>
                </Menu.Item>
                <Menu.Item key="warn">
                  <Link to='/ststem/warn'>恶意访问</Link>
                </Menu.Item>
                <Menu.Item key="limit">
                  <Link to='/ststem/limit'>限制地址管理</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Layout className="site-layout">

            <Header className="site-layout-background" style={{ padding: 0 }} >
              <HeaderContainer>
                <img src={logo} alt='logo'></img>
                <span>{this.state.name}，欢迎您！</span>
              </HeaderContainer>
            </Header>

            <Content style={{ margin: '16px' }}>
              <Card style={{ width: '100%', height: '100%' }}>

                <Redirect from='/' to='/user' />
                <Route path='/user'>
                  <User></User>
                </Route>
                <Route path='/carousel'>
                  <Carousel />
                </Route>
              </Card>,

            </Content>

            <Footer style={{ textAlign: 'center' }}>©2020 珠海百智科技</Footer>

          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
