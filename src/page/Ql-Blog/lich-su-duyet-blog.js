import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table } from "antd";

const data = [
  {
    id: "1",
    title: "Tooi yeue HN 1 tesst",
    author: "Author 1",
    time: "20/10/2022",
    status: "1",
    approvedBy: "Admin 1",
  },
  {
    id: "2",
    title: "Tooi yeue HN 1 tesst",
    author: "Author 1",
    time: "20/10/2022",
    status: "1",
    approvedBy: "Admin 1",
  },
  {
    id: "3",
    title: "Tooi yeue HN 1 tesst",
    author: "Author 1",
    time: "20/10/2022",
    status: "1",
    approvedBy: "Admin 3",
  },
  {
    id: "4",
    title: "Tooi yeue HN 1 tesst",
    author: "Author 1",
    time: "20/10/2022",
    status: "1",
    approvedBy: "Admin 2",
  },
  {
    id: "5",
    title: "Tooi yeue HN 1 tesst",
    author: "Author 1",
    time: "20/10/2022",
    status: "0",
    approvedBy: "Admin 1",
  },
];
export default function LichSuDuyetBlog() {
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
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <>{status === "1" ? <p>Chấp nhận</p> : <p>Từ chối</p>}</>
      ),
    },
    {
      title: "Người duyệt",
      dataIndex: "approvedBy",
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
  useEffect(() => {}, []);
  return (
    <>
      <Table
        rowKey={(record) => record.id}
        scroll={{ y: 500 }}
        className="table-custom-user"
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
      />
    </>
  );
}
