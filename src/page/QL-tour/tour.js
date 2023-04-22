import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, message } from "antd";

import ModalDeleteUser from "../../components/modal/user/poupXoaUser";
import { sendGet } from "../../utils/api";

export default function ListTour() {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "40px",
    },
    {
      title: "Ngày tạo",
      dataIndex: "time",
    },
    {
      title: "Tên tour",
      dataIndex: "name",
    },
    {
      title: "HDV",
      dataIndex: "nameGuide",
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
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <div className="table-cell-action">
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
  const ListTour = async () => {
    const result = await sendGet("/tours");
    if (result.returnValue.data.length >= 0) {
      setData(
        result.returnValue.data.map((e, index) => {
          return {
            ...e,
            province: e.province?.name ? e.province?.name : "",
            stt: index,
            time: new Date(e.createdAt).toLocaleString(),
            nameGuide: e.tourGuide?.username,
          };
        })
      );
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