/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, message } from "antd";
import Layout from "../../components/layout/layout";
import ModalEditVoucher from "../../components/modal/voucher/popupEditVoucher";
import ModalAddVoucher from "../../components/modal/voucher/popupThemMaGiamGia";
import { sendGet } from "../../utils/api";

export default function ListVoucher() {
  const data = [
    {
      name: "John Brown",
      code: "DULICHVUI",
      discountType: "FIX",
      value: "10.1000đ",
      startDate: "20/11/2333",
      quantity: "10200",
      id: "1",
    },
    {
      name: "John Brown",
      code: "DULICHVUI",
      discountType: "FIX",
      value: "10.1000đ",
      startDate: "20/11/2333",
      quantity: "10200",
      id: "4",
    },
    {
      name: "John Brown",
      code: "DULICHVUI",
      discountType: "FIX",
      value: "10.1000đ",
      startDate: "20/11/2333",
      quantity: "10200",
      id: "2",
    },
    {
      name: "John Brown",
      code: "DULICHVUI",
      discountType: "RATE",
      value: "10.1000đ",
      startDate: "20/11/2333",
      quantity: "10200",
      id: "3",
    },
  ];

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8,
      total: data.length,
    },
  });
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const columns = [
    {
      title: "Tên Voucher",
      dataIndex: "name",
    },
    {
      title: "Mã Voucher",
      dataIndex: "code",
    },
    {
      title: "Loại mã",
      dataIndex: "discountType",
      filters: [
        { text: "Phần trăm", value: "RATE" },
        { text: "Số giảm", value: "FIX" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Số giảm",
      dataIndex: "value",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "endDate",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
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

  const listVoucher = async () => {
    const result = await sendGet(`/vourchers`);
    if (result.statusCode == 200) {
      message.success("Lấy dữ liệu thành công");
    } else {
      message.error("thất bại");
    }
  };
  useEffect(() => {
    listVoucher();
  }, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <div className="home-header">
            <h5 className="sum-title">
              Tổng số Mã giảm giá: <span>100</span>
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
