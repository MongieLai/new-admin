import React from 'react';
import logo from './images/fuyou-logo.png';

import styled from 'styled-components'
import './App.css'
import { HashRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom'
import { Layout, Menu, Card } from 'antd';

import User from './components/User'
import Carousel from './components/Carousel'
import CarouselAdd from './components/CarouselAdd'
import MyMenu from './components/Menu'
import Nav from './components/Nav'
import Limit from './components/system/Limit'
import LimitA from './components/system/LimitBF'
import LimitAdd from './components/system/LimitAdd'
import Warn from './components/system/Warn'
import Visit from './components/system/Visit'
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
      name: 'Admin'
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
          <Sider style={{ height: '100%' }} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
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
                  <Link to='/system/visit'>访问记录</Link>
                </Menu.Item>
                <Menu.Item key="warn">
                  <Link to='/system/warn'>恶意访问管理</Link>
                </Menu.Item>
                <Menu.Item key="limit">
                  <Link to='/system/limit'>限制地址管理</Link>
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
                <Route exact path='/user' component={User} />
                <Route exact path='/carousel/add' component={CarouselAdd} />
                <Route exact path='/carousel' component={Carousel} />
                <Route exact path='/menu' component={Nav} />
                {/* <Route exact path='/index' component={Nav} /> */}
                <Route exact path='/index' component={LimitA} />
                <Route exact path='/system/limit' component={Limit} />
                <Route exact path='/system/limit/add' component={LimitAdd} />
                <Route exact path='/system/warn' component={Warn} />
                <Route exact path='/system/visit' component={Visit} />
                {/* <Route  path='*' component={Nav} /> */}
              </Card>,

            </Content>

            <Footer style={{ textAlign: 'center', padding: 0, marginBottom: 16 }}>©2020 珠海百智科技</Footer>

          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
