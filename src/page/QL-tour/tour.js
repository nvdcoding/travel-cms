import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table } from "antd";

import ModalactivatedUser from "../../components/modal/user/popupKichHoatUser";
import ModalDeleteUser from "../../components/modal/user/poupXoaUser";

const data = [
  {
    name: "John Brown",
    nameTour: "Bắc Hinh Hải dương 1 tuần",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    status: "Kích hoạt",
    id: "1",
    provice: "Hà nội",
    money: "10.10000",
  },
  {
    name: "John Brown",
    nameTour: "Bắc Hinh Hải dương 1 tuần",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    status: "Kích hoạt",
    id: "2",
    provice: "Hà nội",
    money: "10.10000",
  },
  {
    name: "John Brown",
    nameTour: "Bắc Hinh Hải dương 1 tuần",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    status: "Kích hoạt",
    id: "3",
    provice: "Hà nội",
    money: "10.10000",
  },
];
export default function ListTour() {
  const columns = [
    {
      title: "Ngày tạo",
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
      title: "SDT",
      dataIndex: "phone",
    },
    {
      title: "Tỉnh thành",
      dataIndex: "provice",
    },
    {
      title: "Số tiền giao dịch",
      dataIndex: "money",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <div className="table-cell-action">
            <ModalactivatedUser className="modal-active-user" data={record} />
            <ModalDeleteUser className="modal-delete-user" data={record} />
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
