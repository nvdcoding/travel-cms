/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message, Tabs } from "antd";
import Layout from "../../components/layout/layout";
import ModalDetailRequest from "../../components/modal/hdv/popup-chi-tiet-yc.js";
import LichSuPheDuyet from "./lich-su-phe-duyet";
import ListHdv from "./listHdv";
import { sendGet } from "../../utils/api";
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
      title: "Họ tên",
      dataIndex: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Tỉnh thành",
      dataIndex: "provinceName",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <div className="table-cell-action">
            <ModalDetailRequest
              className="modal-delete-user"
              data={record}
              listRequest={listRequest}
            />
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
      status: "PENDING",
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
      <Layout>
        <div className="home__wrapper">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Yêu cầu phê duyệt" key="1">
              <Table
                rowKey={(record) => record.id}
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
