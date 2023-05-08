/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, message } from "antd";

import ModalactivatedUser from "../../components/modal/user/popupKichHoatUser";
import ModalDeleteUser from "../../components/modal/user/poupXoaUser";
import { sendGet } from "../../utils/api";

export default function ListHdv() {
  const columns = [
    {
      title: "STT",
      width: "40px",
      render: (_, record, index) => (
        <>
          <p>{index + 1}</p>
        </>
      ),
    },
    {
      title: "Ngày kích hoạt",
      dataIndex: "createdAt",
    },
    {
      title: "Username",
      dataIndex: "name",
    },
    {
      title: "Địa chỉ Email",
      dataIndex: "email",
    },
    {
      title: "SDT",
      dataIndex: "phone",
    },
    {
      title: "Tour đã thực hiện",
      dataIndex: "tour",
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
  const [data, setData] = useState([]);
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
  const listRequest = async () => {
    let result = await sendGet(`/tour-guide/admin`, {
      status: "ACTIVE",
      limit: 100,
    });
    if (result.statusCode == 200) {
      message.success("Lấy dữ liệu thành công");
      setData(result.returnValue.data);
    } else {
      message.error("thất bại");
    }
  };
  useEffect(() => {
    listRequest();
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
