/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message, Tabs } from "antd";
import Layout from "../../components/layout/layout";
import ModalDetailRequest from "../../components/modal/hdv/popup-chi-tiet-yc.js";
import LichSuPheDuyet from "./lich-su-phe-duyet";
import ListHdv from "./listHdv";
import { sendGet, sendPut } from "../../utils/api";
import Interview from "./interview";

export default function ManageHdv() {
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
      title: "Thời gian yêu cầu",
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
            <ModalDetailRequest className="modal-delete-user" data={record} />
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
      interviewDate: "2023-04-24T14:25:04.235Z",
    };
    const result = await sendPut(`/tour-guide/response-registation`, params);
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
      interviewDate: "2023-04-24T14:25:04.235Z",
    };
    const result = await sendPut(`/tour-guide/response-registation`, params);
    if (result.statusCode == 200) {
      message.success("Từ chối thành công");
      await listRequest();
    } else {
      message.error("thất bại");
    }
  };
  const listRequest = async () => {
    let result = await sendGet(`/tour-guide`, { status: "PENDING" });
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
      <Layout>
        <div className="home__wrapper">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Yêu cầu phê duyệt" key="1">
              <Table
                rowKey={(record) => record.id}
                scroll={{ y: 500 }}
                className="table-custom-user"
                columns={columns}
                dataSource={data}
                onChange={handleTableChange}
                pagination={tableParams.pagination}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="CHờ phỏng vấn" key="2">
              <Interview />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đã từ chối " key="3">
              <LichSuPheDuyet />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hướng dẫn viên" key="4">
              <ListHdv />
            </Tabs.TabPane>
          </Tabs>
          ;
        </div>
      </Layout>
    </>
  );
}
