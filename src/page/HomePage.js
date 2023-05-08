import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import { Table, Input, message } from "antd";
import Layout from "../components/layout/layout";
import ModalactivatedUser from "../components/modal/user/popupKichHoatUser";
import ModalDeleteUser from "../components/modal/user/poupXoaUser";
import { sendGet } from "../utils/api";

function HomePage() {
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
      title: "SĐT",
      dataIndex: "phone",
    },
    // {
    //   title: "Số tour đã đi",
    //   dataIndex: "tour",
    //   sorter: {
    //     compare: (a, b) => a.tour - b.tour,
    //     multiple: 1,
    //   },
    // },
    // {
    //   title: "Điểm",
    //   dataIndex: "voucherPoint",
    //   sorter: {
    //     compare: (a, b) => a.voucherPoint - b.voucherPoint,
    //     multiple: 1,
    //   },
    // },
    {
      title: "Trạng thái ",
      dataIndex: "verifyStatus",
      render: (_, record) => (
        <>
          {record.verifyStatus == 0
            ? "Chưa kích hoạt"
            : record.verifyStatus == 1
            ? "Đang hoạt động"
            : "Bị khóa"}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <div className="table-cell-action">
            <ModalactivatedUser
              className="modal-active-user"
              data1={record}
              listUser={listUser}
            />
            <ModalDeleteUser
              className="modal-delete-user"
              data1={record}
              listUser={listUser}
            />
          </div>
        </>
      ),
    },
  ];
  const { Search } = Input;
  const [data, setData] = useState([]);
  const onSearch = (value) => console.log(value);
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
    const res = await sendGet("/users", { limit: 100 });
    if (res.statusCode === 200) {
      setData(res.returnValue?.data);
    } else {
      message.error("Cập nhật User thất bại");
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
          <div className="header-group">
            <h5 className="sum-title">
              Tổng số user: <span>{data.length}</span>
            </h5>
            <div className="header-right">
              <Search
                placeholder="Nhập nội dung..."
                allowClear
                onSearch={onSearch}
              />
            </div>
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
export default HomePage;
