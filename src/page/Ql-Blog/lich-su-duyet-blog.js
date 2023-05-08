import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, message } from "antd";
import { sendGet } from "../../utils/api";

export default function LichSuDuyetBlog() {
  const [data, setData] = useState();
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      width: "40px",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "time",
      render: (_, record) => <>{new Date(record.createdAt).toLocaleString()}</>,
    },
    {
      title: "Tiêu đề ",
      dataIndex: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      render: (_, record) => (
        <>
          {record.tourGuide != null
            ? record.tourGuide?.username
            : record.user?.username}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <>{status === "ACTIVE" ? <p>Chấp nhận</p> : <p>Từ chối</p>}</>
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
      pageSize: 8,
      total: data?.length,
    },
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  const listBlog = async () => {
    const res = await sendGet("/posts/admin", {
      status: "ACTIVE",
      limit: 100,
    });
    if (res.statusCode === 200) {
      setData(res.returnValue?.data);
    } else {
      message.error("Thất bại");
    }
  };
  useEffect(() => {
    listBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Table
        rowKey={(record) => record.id}
        className="table-custom-user"
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
      />
    </>
  );
}
