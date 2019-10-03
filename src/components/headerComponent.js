import React, { Component } from "react";
import { Layout, Menu,Icon} from "antd";
import { Link,withRouter } from "react-router-dom";
const { Header } = Layout;
class headerComponent extends Component {
  state = {
    current: 'mail',
    visible: false
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { pathname } = this.props.location
    return (
      <Header style={{position: 'fixed',zIndex: 1, width: '100%'}}>
       <Menu
        mode="horizontal"
        style={{ lineHeight: '64px',backgroundColor:'#ACF3D3'}}
        selectedKeys={[pathname === '/'?'1'
        :pathname === '/manaka'?'2'
        :pathname === '/ruka'?'3'
        :pathname === '/fuka'?'4'
        :pathname === '/suzuka'?'5'
        :null]}
      >
        <Menu.Item key="1"><Link to="/">김채원</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/manaka">志田愛佳</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/ruka">三品瑠香</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/fuka">熊澤風花</Link></Menu.Item>
        <Menu.Item key="5"><Link to="/suzuka">富田鈴花</Link></Menu.Item>
        <Menu.Item style={{float: 'right'}}><Link to="/"><Icon type="instagram" />Monaka.online My memories.</Link></Menu.Item>
      </Menu>
      </Header>
    );
  }
}
export default withRouter(headerComponent)