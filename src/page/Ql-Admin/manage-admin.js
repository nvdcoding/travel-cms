import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, message } from "antd";
import Layout from "../../components/layout/layout";
import ModalAddAdmin from "../../components/modal/admin/popupAddAdmin";
import { sendGet } from "../../utils/api";
import ModalEditAdmin from "../../components/modal/admin/popupEditAmin";
import ModalDeleteAdmin from "../../components/modal/admin/poupXoaAdmin";

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
    title: "Kích hoạt",
    dataIndex: "active",
  },
  {
    title: "",
    dataIndex: "action",
    render: (_, record) => (
      <>
        <div className="table-cell-action">
          <ModalEditAdmin className="modal-active-user" data1={record} />
          <ModalDeleteAdmin className="modal-delete-user" data1={record} />
        </div>
      </>
    ),
  },
];
function ManageAdmin() {
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

  const listUser = async () => {
    // const res = await sendGet("/admin");
    // if (res.statusCode === 200) {
    //   setData(res.data);
    // } else {
    //   message.error("Cập nhật User thất bại");
    // }
  };
  useEffect(() => {
    listUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <div className="home-header">
            <h5 className="sum-title">
              Tổng số user: <span>100</span>
            </h5>
            <ModalAddAdmin listAdmin={listUser} />
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
