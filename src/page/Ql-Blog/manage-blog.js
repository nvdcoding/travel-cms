import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/home.css";
import { Table, Button, message, Tabs } from "antd";
import Layout from "../../components/layout/layout";
import LichSuDuyetBlog from "./lich-su-duyet-blog";
import ListBlog from "./list-blog";
const data = [
  {
    id: "5",
    title: "Tooi yeue HN 1 tesst",
    author: "Author 1",
    time: "20/10/2022",
  },
  {
    id: "4",
    title: "Tooi yeue HN 1 tesst",
    author: "Author 1",
    time: "20/10/2022",
  },
  {
    id: "3",
    title: "Tooi yeue HN 1 tesst",
    author: "Author 1",
    time: "20/10/2022",
  },
  {
    id: "2",
    title: "Tooi yeue HN 1 tesst",
    author: "Author 1",
    time: "20/10/2022",
  },
  {
    id: "1",
    title: "Tooi yeue HN 1 tesst",
    author: "Author 1",
    time: "20/10/2022",
  },
];
export default function ManageBlog() {
  const columns = [
    {
      title: "Ngày tạo",
      dataIndex: "time",
    },
    {
      title: "Tiêu đề ",
      dataIndex: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <div className="table-cell-action">
            <Button
              type="primary"
              className="button-accept button-primary"
              danger
              onClick={() => acceptHDV(record)}
            >
              Chấp nhận
            </Button>
            <Button
              className="button-deny button-nomal"
              onClick={() => denyHDV(record)}
            >
              Từ chối
            </Button>
            <Button className="button-nomal">
              {" "}
              <Link to={`/quan-ly-blog/${record.id}`}> Xem </Link>
            </Button>
          </div>
        </>
      ),
    },
  ];
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: data.length,
    },
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  const acceptHDV = (values) => {
    setTimeout(() => {
      message.success("Thêm bài viết thành công");
    }, 2000);

    console.log("Success:", values);
  };
  const denyHDV = (values) => {
    setTimeout(() => {
      message.success("Từ chối phê duyệt bài viết");
    }, 2000);

    console.log("Success:", values);
  };
  useEffect(() => {}, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Yêu cầu phê duyệt" key="1">
              <Table
                rowKey={(record) => record.id}
                scroll={{ y: 500 }}
                className="table-custom-user"
                columns={columns}
                dataSource={data}
                onChange={handleTableChange}
                pagination={tableParams.pagination}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử phê duyệt" key="2">
              <LichSuDuyetBlog />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Blog" key="3">
              <ListBlog />
            </Tabs.TabPane>
          </Tabs>
          ;
        </div>
      </Layout>
    </>
  );
}
