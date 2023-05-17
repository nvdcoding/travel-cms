import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";
import moment from "moment";

export default function RequestReport() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "40px",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Thời gian báo cáo",
      dataIndex: "time",
      render: (_, record) => <>{new Date(record.createdAt).toLocaleString()}</>,
    },
    {
      title: "Mã bài viết",
      dataIndex: "id",
      render: (_, record) => <>{record.post.id} - {record.post.title}</>,
    },
    {
      title: "Nội dung báo cáo",
      dataIndex: "content",
    },
    {
      title: "Người báo cáo",
      dataIndex: "reportBy",
      render: (_, record) => (
        <>
          {record.reportedBy?.id} - {record.reportedBy?.username}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <div className="table-cell-action">
            <Button
              className="button-deny ant-btn-primary"
              onClick={() => handlePost("DELETE_POST", record)}
            >
              Xóa
            </Button>
            <Button
              className="button-deny ant-btn-primary"
              onClick={() => handlePost("SKIP", record)}
            >
              Bỏ qua
            </Button>
          </div>
        </>
      ),
    },
  ];

  const [startDate, setStartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const dateFormat = "YYYY-MM-DD";
  const changeDate = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };
  const { RangePicker } = DatePicker;
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
  const handlePost = async (index, values) => {
    let result = await sendPut("/reports/admin/post", {
      reportId: values.id,
      action: index,
    });
    if (result.statusCode === 200) {
      message.success("Đã xóa bài viết");
      await ListRequest();
    } else {
      message.error("thất bại");
    }
  };
  const ListRequest = async () => {
    const result = await sendGet("/reports/admin/post", {
      startDate: startDate,
      endDate: endDate,
    });
    if (result.returnValue.data.length >= 0) {
      setData(result.returnValue.data?.filter((item) => item.status == 0));
    } else {
      message.error("thất bại");
    }
  };
  useEffect(() => {
    ListRequest();
  }, []);
  return (
    <>
      <div className="group-search">
        <RangePicker
          defaultValue={[
            moment().subtract(1, "months").startOf("month"),
            moment(),
          ]}
          format={dateFormat}
          onChange={changeDate}
        />
        <button
          onClick={() => ListRequest()}
          type="button"
          class="ant-btn ant-btn-primary ant-btn-dangerous button-add"
        >
          <span>Tìm kiếm</span>
        </button>
      </div>
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
