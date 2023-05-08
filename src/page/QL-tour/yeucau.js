import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message } from "antd";
import { Link } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";

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
              onClick={() => acceptTour(record)}
            >
              Chấp nhận
            </Button>
            <Button
              className="button-deny ant-btn-primary"
              onClick={() => denyTour(record)}
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
  const acceptTour = async (values) => {
    let result = await sendPut("/tours", {
      tourId: values.id,
      action: "APPROVE",
    });
    if (result.statusCode === 200) {
      setData(result.returnValue.data);
      message.success("Phê duyệt thành công");
      await ListTour();
    } else {
      message.error("thất bại");
    }
  };
  const denyTour = async (values) => {
    let result = await sendPut("/tours", {
      tourId: values.id,
      action: "REJECT",
    });
    if (result.statusCode === 200) {
      setData(result.returnValue.data);
      message.success("Phê duyệt thành công");
      await ListTour();
    } else {
      message.error("thất bại");
    }
  };
  const ListTour = async () => {
    const result = await sendGet("/tours/admin/approve-list", { limit: 100 });
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
        className="table-custom-user"
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
        pagination={tableParams.pagination}
      />
    </>
  );
}
