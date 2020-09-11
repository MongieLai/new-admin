import React from 'react';
import logo from './logo.svg';
import Test from './components/Test'
import './App.css'
import { HashRouter as Router, Link, Switch, Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Card } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const routesMap = [
  {
    permission_no: 1,
    menu_name: "主页",
    menu_url: "/home",
    path_name: "home",
    component_path: "pages/Home",
    menu_state: 0,
    menu_father: 0,
    menu_id: 1
  },
  {
    permission_no: 1,
    menu_name: "系统设置",
    menu_url: "/index/sysIndex",
    path_name: "systemIndex",
    component_path: "user/Home/SystemIndex",
    menu_imgClass: "",
    menu_state: 0,
    menu_father: 0,
    menu_id: 2,
    chidPermissions: [
      {
        permission_no: 1,
        menu_name: "用户管理",
        menu_url: "/index/sysIndex/userTotal",
        path_name: "loginLog",
        component_path: "user/Home/UserTotal",
        menu_imgClass: null,
        menu_state: 0,
        menu_father: 1,
        menu_id: 11,
        chidPermissions: []
      },

    ]
  }
]


class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['3']} defaultOpenKeys={['sub1']} mode="inline">
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="3">Tom</Menu.Item>
                <Menu.Item key="4">Bill</Menu.Item>
                <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="6">Team 1</Menu.Item>
                <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} >这里是logo</Header>
            <Content style={{ margin: '16px' }}>
              <Route path='/'>
                <Card style={{ width: '100%', height: '100%' }}>
                  <Test></Test>

                </Card>,
              </Route>
            </Content>
            <Footer style={{ textAlign: 'center' }}>©2020 珠海百智科技</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
