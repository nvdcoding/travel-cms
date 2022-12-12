import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    IdcardOutlined, UserOutlined, FolderOpenOutlined
} from '@ant-design/icons';
import { Layout, Menu, Input } from 'antd';
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { logo } from "../../constants/images";
import "../../assets/css/layout.css"
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const LayoutAdmin = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { Search } = Input;
    const onSearch = (value) => console.log(value);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" >
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item
                        key="1"
                        icon={<UserOutlined />}
                        className="ant-menu-item-selected"
                    >
                        <Link to="/"> Quản lý người dùng</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="2"
                        icon={<UserOutlined />}
                        className="ant-menu-item"
                    >
                        <Link to="/quan-ly-admin"> Quản lý Admin</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="3"
                        icon={<IdcardOutlined />}
                        className="ant-menu-item"
                    >
                        <Link to="/quan-ly-hdv">Quản lý hướng dẫn viên</Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub3"
                        icon={<FolderOpenOutlined />}
                        title="Quản lý Bài viết"
                    >
                        <Menu.Item key="4" className="ant-menu-item">
                            <Link to="#">Tất cả bài viết</Link>
                        </Menu.Item>

                        <Menu.Item key="5" className="ant-menu-item">
                            <Link to="#">Chưa xử lý</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item
                        key="6"
                        icon={<PieChartOutlined />}
                        className="ant-menu-item"
                    >
                        <Link to="#">Mã giảm giá</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="7"
                        icon={<PieChartOutlined />}
                        className="ant-menu-item"
                    >
                        <Link to="#">Thống kê</Link>
                    </Menu.Item>
                </Menu>
                <div className='admin-infor'>
                    <div className='admin-info-left'>
                        <img alt='' src={logo} />
                        <div className='admin-name'>
                            <h4 className='admin-name-title'>
                                Admin 1
                            </h4>
                            <p className='admin-name-role'>Admin</p>
                        </div>
                    </div>
                    <div className='admin-info-right'>
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
                    <div className='header-left'>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <h1 className='title-content'>
                            Quản lý người dùng
                        </h1></div>
                    <div className='header-right'>
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
                        margin: '5px 8px',
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