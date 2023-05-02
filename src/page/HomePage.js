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
          <ModalactivatedUser className="modal-active-user" data1={record} />
          <ModalDeleteUser className="modal-delete-user" data1={record} />
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
  useEffect(() => { }, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <h5 className="sum-title">
            Tổng số user: <span>{data.length}</span>
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
