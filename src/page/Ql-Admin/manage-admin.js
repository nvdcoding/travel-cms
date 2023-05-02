import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, message } from "antd";
import Layout from "../../components/layout/layout";
import ModalactivatedUser from "../../components/modal/user/popupKichHoatUser";
import ModalDeleteUser from "../../components/modal/user/poupXoaUser";
import ModalAddAdmin from "../../components/modal/admin/popupAddAdmin";
import { sendGet } from "../../utils/api";

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
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Created date",
    dataIndex: "created",
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
    active: "Active",
    id: "1",
    created: "20/10/20001",
    role: "Admin",
  },
  {
    name: "John Brown1",
    mail: "lamdgka@gmail.com",
    active: "Active",
    id: "2",
    created: "20/10/20001",
    role: "Admin",
  },
];
function ManageAdmin() {
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

  // const listUser = async () => {
  //   const res = await sendGet("api/user/manage/");
  //   if (res.statusCode === 200) {
  //     setData(res.data);
  //   } else {
  //     message.error("Cập nhật User thất bại");
  //   }
  // };
  // useEffect(() => {
  //   listUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <div className="home-header">
            <h5 className="sum-title">
              Tổng số user: <span>100</span>
            </h5>
            <ModalAddAdmin />
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
export default ManageAdmin;
