import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message, Tabs } from "antd";
import Layout from "../../components/layout/layout";
import ModalDetailRequest from "../../components/modal/hdv/popup-chi-tiet-yc.js";
import LichSuPheDuyet from "./lich-su-phe-duyet";
import ListHdv from "./listHdv";
const data = [
  {
    name: "John Brown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "1",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John Brown1",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "2",
    provice: "Hà Nội",
  },
  {
    name: "John Bro23ewn",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "3",
    provice: "Hà Nội",
  },
  {
    name: "John Bhỷtgrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "4",
    provice: " Hưng Yên",
  },
  {
    name: "John grgBrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "5",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John Bgregrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "6",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John Bgregrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "7",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John ggg",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "8",
    provice: "Hà Nội, Hưng Yên",
  },

  {
    name: "John Bfffrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "9",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John ferf",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "10",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "John wreBrown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "11",
    provice: "Hà Nội, Hưng Yên",
  },
  {
    name: "3ư Brown",
    mail: "lamdgka@gmail.com",
    time: "20/10/2022",
    id: "12",
    provice: "Hà Nội, Hưng Yên",
  },
];
export default function ManageHdv() {
  const columns = [
    {
      title: "Thời gian yêu cầu",
      dataIndex: "time",
    },
    {
      title: "Username",
      dataIndex: "name",
    },
    {
      title: "Địa chỉ Email",
      dataIndex: "mail",
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
  const acceptHDV = (values) => {
    setTimeout(() => {
      message.success("Thêm HDV thành công");
    }, 2000);

    console.log("Success:", values);
  };
  const denyHDV = (values) => {
    setTimeout(() => {
      message.success("Từ chối tài khoản");
    }, 2000);

    console.log("Success:", values);
  };
  useEffect(() => {}, []);
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
            <Tabs.TabPane tab="Lịch sử phê duyệt" key="2">
              <LichSuPheDuyet />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hướng dẫn viên" key="3">
              <ListHdv />
            </Tabs.TabPane>
          </Tabs>
          ;
        </div>
      </Layout>
    </>
  );
}
