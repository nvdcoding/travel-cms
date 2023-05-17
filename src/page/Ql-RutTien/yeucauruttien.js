import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";
import moment from "moment";

export default function YeuCauRutTien() {
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
      render: (_, record) => <>{new Date(record.time).toLocaleString()}</>,
    },
    {
      title: "Mã rút tiền",
      dataIndex: "id",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
    },
    {
      title: "Tài khoản ",
      dataIndex: "nameGuide",
      render: (_, record) => <>{record.user != null ? <>{record.user?.id} -{record.user?.username}</> : <>{record.tourGuide?.id} - {record.tourGuide?.username}</>}</>,
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
              onClick={() => handleDrawMoney(record, "ACCEPT")}
            >
              Chấp nhận
            </Button>
            <Button
              className="button-deny ant-btn-primary"
              onClick={() => handleDrawMoney(record, "REJECT")}
            >
              Từ chối
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
  const handleDrawMoney = async (values, index) => {
    let result = await sendPut("/transactions/request-withdraw", {
      withdrawId: values.id,
      action: index,
    });
    if (result.statusCode === 200) {
      message.success("Phê duyệt thành công");
      await ListRequest();
    } else {
      message.error("thất bại");
    }
  };
  const ListRequest = async () => {
    const result = await sendGet("/transactions/request-withdraw", {
      startDate: startDate,
      endDate: endDate,
    });
    if (result.returnValue.data.length >= 0) {
      setData(result.returnValue?.data?.filter((item) => item.status == 3));
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
