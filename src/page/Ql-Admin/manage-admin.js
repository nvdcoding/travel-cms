/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Tag, message } from "antd";
import Layout from "../../components/layout/layout";
import ModalAddAdmin from "../../components/modal/admin/popupAddAdmin";
import { sendGet } from "../../utils/api";
import ModalEditAdmin from "../../components/modal/admin/popupEditAmin";
import ModalDeleteAdmin from "../../components/modal/admin/poupXoaAdmin";

function ManageAdmin() {
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      width: "40px",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_, record) => (
        <>
          {record.role == "MOD" ? (
            <Tag color="magenta">
              {record.role}-{record.permission?.level}
            </Tag>
          ) : (
            <Tag color="red">{record.role}</Tag>
          )}
        </>
      ),
      filters: [
        {
          text: "ADMIN",
          value: "ADMIN",
        },
        {
          text: "MOD",
          value: "MOD",
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (_, record) => (
        <>{record.status == 0 ? "Bị khóa" : "Đang hoạt động"}</>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <div className="table-cell-action">
            {record.role == "MOD" && (
              <ModalEditAdmin
                className="modal-delete-user"
                data1={record}
                listUser={listUser}
              />
            )}

            {/* <ModalDeleteAdmin
              className="modal-delete-user"
              data1={record}
              listUser={listUser}
            /> */}
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

  const listUser = async () => {
    try {
      const res = await sendGet("/admin", { limit: 100 });
      if (res.statusCode === 200) {
        setData(res.returnValue?.data);
      } else {
        message.error("Cập nhật User thất bại");
      }
    } catch (error) {
      if (error.response?.status == 406) {
        message.error("Tài quản Mod không có quyền thao tác chức năng này");
      }
    }
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
              Tổng số Admin/Mod: <span>{data.length}</span>
            </h5>
            <ModalAddAdmin listAdmin={listUser} />
          </div>

          <Table
            rowKey={(record) => record.id}
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
