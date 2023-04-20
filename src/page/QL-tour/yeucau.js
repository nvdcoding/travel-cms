import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message } from "antd";
import { Link } from "react-router-dom";
import { sendGet } from "../../utils/api";

export default function YeuCau() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "40px",
    },
    {
      title: "Thời gian yêu cầu",
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
      dataIndex: "province",
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
              className="button-deny ant-btn-primary"
              onClick={() => denyHDV(record)}
            >
              Từ chối
            </Button>
            <Button className="button-nomal">
              <Link to={`/quan-ly-tour/${record.id}`}> Xem </Link>
            </Button>
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
      message.success("Từ chối duyệt tour");
    }, 2000);

    console.log("Success:", values);
  };
  const ListTour = async () => {
    const result = await sendGet("/tours/approve-list");
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
