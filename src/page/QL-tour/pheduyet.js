import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, message } from "antd";
import { sendGet } from "../../utils/api";

export default function PheDuyet() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "40px",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Thời gian phê duyệt",
      dataIndex: "time",
      render: (_, record) => (
        <>{new Date(record?.createdAt).toLocaleString()}</>
      ),
    },
    {
      title: "Tên tour",
      dataIndex: "name",
    },
    {
      title: "Tên HDV",
      dataIndex: "nameGuide",
      render: (_, record) => <>{record.tourGuide?.name}</>,
    },
    {
      title: "Tỉnh thành",
      dataIndex: "provice",
      render: (_, record) => <>{record.province?.name}</>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, record) => (
        <>{record.status == 1 ? "Đang hoạt động" : "Bị khóa"}</>
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
  const ListTour = async () => {
    const result = await sendGet("/tours", { limit: 100 });
    if (result.returnValue.data.length >= 0) {
      setData(result.returnValue.data);
    } else {
      message.error("thất bại");
    }
  };
  useEffect(() => {
    ListTour();
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
