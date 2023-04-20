/* eslint-disable */
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  IdcardOutlined,
  UserOutlined,
  PayCircleOutlined,
  BookOutlined,
  CloudServerOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Input } from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { logo } from "../../constants/images";
import "../../assets/css/layout.css";
const { Header, Sider, Content } = Layout;
const LayoutAdmin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(localStorage.getItem("activeHeader"));
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  const onClick = (e) => {
    localStorage.setItem("activeHeader", e.key);
    setActive(localStorage.getItem("activeHeader"));
  };
  console.log("1", active);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="navbar-left"
      >
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <Menu theme="dark" mode="inline" onClick={onClick}>
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            className={
              active == 1
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
          >
            <Link to="/quan-ly-user"> Quản lý người dùng</Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            className={
              active == 2
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
          >
            <Link to="/quan-ly-admin"> Quản lý Admin</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<IdcardOutlined />}
            className={
              active == 3
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
          >
            <Link to="/quan-ly-hdv">Quản lý hướng dẫn viên</Link>
          </Menu.Item>
          <Menu.Item
            key="7"
            className={
              active == 7
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
            icon={<CloudServerOutlined />}
          >
            <Link to="/quan-ly-tour">Quản lý Tour</Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            className={
              active == 4
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
            icon={<BookOutlined />}
          >
            <Link to="/quan-ly-blog">Quản lý bài viết</Link>
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<PayCircleOutlined />}
            className={
              active == 5
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
          >
            <Link to="/quan-ly-ma-giam-gia">Mã giảm giá</Link>
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<PieChartOutlined />}
            className={
              active == 6
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
          >
            <Link to="/thong-ke">Thống kê</Link>
          </Menu.Item>
          <Menu.Item
            key="8"
            icon={<PieChartOutlined />}
            className={
              active == 8
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
          >
            <Link to="/he-thong">Hệ thống</Link>
          </Menu.Item>
        </Menu>
        <div className="admin-infor">
          <div className="admin-info-left">
            <img alt="" src={logo} />
            <div className="admin-name">
              <h4 className="admin-name-title">Admin 1</h4>
              <p className="admin-name-role">Admin</p>
            </div>
          </div>
          <div className="admin-info-right">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <div className="header-left">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <h1 className="title-content">Hệ thống</h1>
          </div>
          <div className="header-right">
            <Search
              placeholder="Nhập nội dung..."
              allowClear
              onSearch={onSearch}
            />
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "5px 8px",
            padding: 12,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
