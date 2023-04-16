import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table } from "antd";

const data = [
  {
    name: "John Brown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Chấp nhận",
    id: "1",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John Brown1",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Từ chối",
    id: "2",
    provice: "Hà Nội",
  },
  {
    name: "John Bro23ewn",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Chấp nhận",
    id: "3",
    provice: "Hà Nội",
  },
  {
    name: "John Bhỷtgrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Chấp nhận",
    id: "4",
    provice: " Hưng Yên",
  },
  {
    name: "John grgBrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Từ chối",
    id: "5",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John Bgregrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Chấp nhận",
    id: "6",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John Bgregrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Chấp nhận",
    id: "7",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John ggg",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Chấp nhận",
    id: "8",
    provice: "Hà Nội, Hưng Yên",
  },

  {
    name: "John Bfffrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Chấp nhận",
    id: "9",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John ferf",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Chấp nhận",
    id: "10",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John wreBrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Chấp nhận",
    id: "11",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "3ư Brown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    approvedBy: "Admin Lam",
    status: "Chấp nhận",
    id: "12",
    provice: "Hà Nội, Hưng Yên",
  },
];
export default function LichSuPheDuyet() {
  const columns = [
    {
      title: "Thời gian phê duyệt",
      dataIndex: "time",
    },
    {
      title: "Username",
      dataIndex: "name",
    },
    {
      title: "Địa chỉ Email",
      dataIndex: "mail",
    },
    {
      title: "Tỉnh thành",
      dataIndex: "provice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
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
