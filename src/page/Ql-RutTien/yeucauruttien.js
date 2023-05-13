import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message } from "antd";
import { Link } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";

export default function YeuCauRutTien() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "40px",
      render: (_, record, index) => (
        <>
          {index + 1}
        </>
      ),
    },
    {
      title: "Thời gian yêu cầu",
      dataIndex: "time",
    },
    {
      title: "Mã rút tiền",
      dataIndex: "name",
    },
    {
      title: "Số tiền",
      dataIndex: "money",
    },
    {
      title: "HDV",
      dataIndex: "nameGuide",
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
              onClick={() => acceptDrawMoney(record)}
            >
              Chấp nhận
            </Button>
            <Button
              className="button-deny ant-btn-primary"
              onClick={() => denyDrawMoney(record)}
            >
              Từ chối
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
  const acceptDrawMoney = async (values) => {
    // let result = await sendPut("/tours", {
    //   tourId: values.id,
    //   action: "APPROVE",
    // });
    // if (result.statusCode === 200) {
    //   setData(result.returnValue.data);
    //   message.success("Phê duyệt thành công");
    //   await ListTour();
    // } else {
    //   message.error("thất bại");
    // }
  };
  const denyDrawMoney = async (values) => {
    // let result = await sendPut("/tours", {
    //   tourId: values.id,
    //   action: "REJECT",
    // });
    // if (result.statusCode === 200) {
    //   setData(result.returnValue.data);
    //   message.success("Phê duyệt thành công");
    //   await ListTour();
    // } else {
    //   message.error("thất bại");
    // }
  };
  const ListRequest = async () => {
    const result = await sendGet("/tours/admin/approve-list", { limit: 100 });
    if (result.returnValue.data.length >= 0) {
      setData(result.returnValue.data);
    } else {
      message.error("thất bại");
    }
  };
  useEffect(() => {
    ListRequest();
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
