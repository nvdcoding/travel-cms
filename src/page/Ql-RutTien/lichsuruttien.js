import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";
import moment from "moment";

export default function LichSuRutTien() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: "40px",
      render: (_, record, index) => <>{index + 1}</>,
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
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Đã phê duyệt",
          value: "1",
        },
        {
          text: "Chưa phê duyệt",
          value: "0",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
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
    const result = await sendGet("/transactions/request-withdraw", {
      startDate: startDate,
      endDate: endDate,
    });
    if (result.returnValue.data.length >= 0) {
      setData(result.returnValue?.data);
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
