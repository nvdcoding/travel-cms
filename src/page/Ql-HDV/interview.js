/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Button, Table, message } from "antd";
import { sendGet, sendPut } from "../../utils/api";
import ModalDetailRequest from "../../components/modal/hdv/popup-chi-tiet-yc";
export default function Interview() {
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
      title: "Thời gian phê duyệt",
      dataIndex: "createdAt",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Địa chỉ Email",
      dataIndex: "email",
    },
    {
      title: "Tỉnh thành",
      dataIndex: "provice",
    },
    {
      title: "Ngày hẹn PV",
      dataIndex: "interviewDate",
    },
    {
      title: "Người duyệt",
      dataIndex: "approvedBy",
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
            {/* <ModalDetailRequest className="modal-delete-user" data={record} /> */}
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
  const acceptHDV = async (values) => {
    let params = {
      tourGuideId: values.id,
      action: "ACCEPT",
    };
    const result = await sendPut(`/tour-guide/response-interview`, params);
    if (result.statusCode == 200) {
      message.success("Lấy dữ liệu thành công");
      await listRequest();
    } else {
      message.error("thất bại");
    }
  };
  const denyHDV = async (values) => {
    let params = {
      tourGuideId: values.id,
      action: "REJECT",
    };
    const result = await sendPut(`/tour-guide/response-interview`, params);
    if (result.statusCode == 200) {
      message.success("Từ chối thành công");
      await listRequest();
    } else {
      message.error("thất bại");
    }
  };
  const listRequest = async () => {
    let result = await sendGet(`/tour-guide/admin`, {
      status: "WAITING_INTERVIEW",
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
