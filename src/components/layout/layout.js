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
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { logo } from "../../constants/images";
import "../../assets/css/layout.css";
const { Header, Sider, Content } = Layout;
const LayoutAdmin = ({ children }) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(localStorage.getItem("activeHeader"));
  const onClick = (e) => {
    localStorage.setItem("activeHeader", e.key);
    setActive(localStorage.getItem("activeHeader"));
  };
  const logOut = (e) => {
    localStorage.setItem("accessToken", null);
    localStorage.setItem("refreshToken", null);
    history.push("/dang-nhap");
  };
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
            key="10"
            className={
              active == 10
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
            icon={<BookOutlined />}
          >
            <Link to="/bao-cao-bai-viet">Báo cáo bài viết</Link>
          </Menu.Item>
          <Menu.Item
            key="11"
            className={
              active == 11
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
            icon={<BookOutlined />}
          >
            <Link to="/bao-cao-hdv">Báo cáo HDV</Link>
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
            key="9"
            icon={<PayCircleOutlined />}
            className={
              active == 9
                ? "ant-menu-item ant-menu-item-selected"
                : "ant-menu-item"
            }
          >
            <Link to="/quan-ly-rut-tien">Quản lý rút tiền</Link>
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
          <div className="admin-info-right" onClick={() => logOut()}>
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
