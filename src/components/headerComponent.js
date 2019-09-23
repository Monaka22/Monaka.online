import React, { Component } from "react";
import { Layout, Menu,Icon } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
export default class headerComponent extends Component {
  state = {
    current: "mail"
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <Header>
       <Menu
        mode="horizontal"
        style={{ lineHeight: '63px',backgroundColor:'#ACF3D3'}}
      >
        <Menu.Item key="1"><Link to="/">김채원</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/manaka">志田愛佳</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/ruka">三品瑠香</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/fuka">熊澤風花</Link></Menu.Item>
        <Menu.Item key="5"><Link to="/suzuka">富田鈴花</Link></Menu.Item>
        <Menu.Item key="6" style={{float: 'right'}} disabled><Icon type="instagram" />Monaka.online My memories.</Menu.Item>
      </Menu>
      </Header>
    );
  }
}
