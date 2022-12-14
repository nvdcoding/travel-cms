import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table } from "antd";
import Layout from "../../components/layout/layout";
import ModalEditVoucher from "../../components/modal/voucher/popupEditVoucher";
import ModalAddVoucher from "../../components/modal/voucher/popupThemMaGiamGia";

const columns = [
  {
    title: "Mã Voucher",
    dataIndex: "name",
  },
  {
    title: "Loại mã",
    dataIndex: "code",
  },
  {
    title: "Số giảm",
    dataIndex: "value",
  },
  {
    title: "Ngày hết hạn",
    dataIndex: "time",
  },
  {
    title: "Số lượng",
    dataIndex: "number",
  },
  {
    title: "",
    dataIndex: "action",
    render: (_, record) => (
      <>
        <div className="table-cell-action">
          <ModalEditVoucher className="modal-edit-voucher" data={record} />
        </div>
      </>
    ),
  },
];
const data = [
  {
    name: "John Brown",
    code: "DULICHVUI",
    type: "đ",
    value: "10.1000đ",
    time: "20/11/2333",
    number: "10200",
    id: "1",
  },
  {
    name: "John ferf",
    code: "DULICHVUI",
    type: "%",
    value: "10.1000đ",
    time: "20/11/2333",
    number: "10200",
    id: "10",
  },
  {
    name: "John wreBrown",
    code: "DULICHVUI",
    type: "%",
    value: "10.1000đ",
    time: "20/11/2333",
    number: "10200",
    id: "11",
  },
  {
    name: "3ư Brown",
    code: "DULICHVUI",
    type: "đ",
    value: "10.1000đ",
    time: "20/11/2333",
    number: "10200",
    id: "12",
  },
];
export default function ListVoucher() {
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
      <Layout>
        <div className="home__wrapper">
          <div className="home-header">
            <h5 className="sum-title">
              Tổng số user: <span>100</span>
            </h5>
            <ModalAddVoucher />
          </div>

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
