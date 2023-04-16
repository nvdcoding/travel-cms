import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message } from "antd";
const data = [
  {
    nameTour: "Bắc Hinh Hải dương 1 tuần",
    name: "John Brown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "1",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    nameTour: "Bắc Hinh Hải dương 1 tuần",
    name: "John Brown1",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "2",
    provice: "Hà Nội",
  },
  {
    nameTour: "Bắc Hinh Hải dương 1 tuần",
    name: "John Bro23ewn",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "3",
    provice: "Hà Nội",
  },
];
export default function YeuCau() {
  const columns = [
    {
      title: "Thời gian yêu cầu",
      dataIndex: "time",
    },
    {
      title: "Tên tour",
      dataIndex: "nameTour",
    },
    {
      title: "HDV",
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
          </div>
        </>
      ),
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
  const acceptHDV = (values) => {
    setTimeout(() => {
      message.success("Thêm HDV thành công");
    }, 2000);

    console.log("Success:", values);
  };
  const denyHDV = (values) => {
    setTimeout(() => {
      message.success("Từ chối tài khoản");
    }, 2000);

    console.log("Success:", values);
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
