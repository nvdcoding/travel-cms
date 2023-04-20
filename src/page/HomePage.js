import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import { Table } from "antd";
import Layout from "../components/layout/layout";
import ModalactivatedUser from "../components/modal/user/popupKichHoatUser";
import ModalDeleteUser from "../components/modal/user/poupXoaUser";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "mail",
  },
  {
    title: "SĐT",
    dataIndex: "phone",
  },
  {
    title: "Số tour đã đi",
    dataIndex: "tour",
    sorter: {
      compare: (a, b) => a.tour - b.tour,
      multiple: 1,
    },
  },
  {
    title: "Số tiền giao dịch",
    dataIndex: "money",
    sorter: {
      compare: (a, b) => a.money - b.money,
      multiple: 1,
    },
  },
  {
    title: "Kích hoạt",
    dataIndex: "active",
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
const data = [
  {
    name: "John Brown",
    mail: "lamdgka@gmail.com",
    phone: "0388476663",
    active: "Active",
    id: "1",
    tour: 71,
    money: 123000,
  },
  {
    name: "John Brown1",
    mail: "lamdgka@gmail.com",
    phone: "0388476663",
    active: "Active",
    id: "2",
    tour: 71,
    money: 123000,
  },
  {
    name: "John Bro23ewn",
    mail: "lamdgka@gmail.com",
    phone: "0388476663",
    active: "Active",
    id: "3",
    tour: 71,
    money: 123000,
  },
  {
    name: "John Bhỷtgrown",
    mail: "lamdgka@gmail.com",
    phone: "0388476663",
    active: "Active",
    id: "4",
    tour: 71,
    money: 123000,
  },
  {
    name: "John grgBrown",
    mail: "lamdgka@gmail.com",
    phone: "0388476663",
    active: "Active",
    id: "5",
    tour: 71,
    money: 123000,
  },
  {
    name: "John Bgregrown",
    mail: "lamdgka@gmail.com",
    phone: "0388476663",
    active: "Active",
    id: "6",
    tour: 71,
    money: 123000,
  },
  {
    name: "John Bgregrown",
    mail: "lamdgka@gmail.com",
    phone: "0388476663",
    active: "Active",
    id: "7",
    tour: 71,
    money: 123000,
  },
];
function HomePage() {
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
      <Layout>
        <div className="home__wrapper">
          <h5 className="sum-title">
            Tổng số user: <span>100</span>
          </h5>
          <Table
            rowKey={(record) => record.id}
            scroll={{ y: 500 }}
            className="table-custom-user"
            columns={columns}
            dataSource={data}
            onChange={handleTableChange}
            pagination={tableParams.pagination}
          />
        </div>
      </Layout>
    </>
  );
}
export default HomePage;
