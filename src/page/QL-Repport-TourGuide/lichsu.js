import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";
import moment from "moment";

export default function HistoryReportHDV() {
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
      title: "Thời gian trao đổi",
      dataIndex: "meetingDate",
    },
    {
      title: "Chuyến đi",
      dataIndex: "time",
      render: (_, record) => (
        <>
          {record?.order?.id} -{record?.order?.name}
        </>
      ),
    },
    {
      title: "Nội dung báo cáo",
      dataIndex: "content",
    },
    {
      title: "Trạng thái",
      dataIndex: "satus",
      render: (_, record) => (
        <>{record.status == 1 ? "Đã xử lý" : "Đã bỏ qua"}</>
      ),
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
  const ListRequest = async () => {
    try {
      const result = await sendGet("/reports/admin/tourguide", {
        status: 1,
        limit: 100,
        startDate: startDate,
        endDate: endDate,
      });
      if (result.returnValue.data.length >= 0) {
        setData(result.returnValue?.data);
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      if (error.response?.status == 406) {
        message.error("Tài quản Mod không có quyền thao tác chức năng này");
      }
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
