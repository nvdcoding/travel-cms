import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message, DatePicker, Modal } from "antd";
import { Link } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";
import moment from "moment";

export default function RequestReportHDV() {
  const [data, setData] = useState([]);
  const [schedule, showSchedule] = useState(false);
  const [date, setDate] = useState();
  const handleCancel = () => {
    showSchedule(false);
    setDate("");
  };
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
      title: "Chuyến đi",
      dataIndex: "id",
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
      title: "Ngày bắt đầu",
      dataIndex: "time",
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
      title: "Số lượt cảnh báo",
      dataIndex: "reportNum",
      render: (_, record) => <>{record?.order?.tourGuide?.warningTime}</>,
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
              onClick={() => showSchedule(true)}
            >
              Lên lịch
            </Button>
            <Modal
              title=""
              open={schedule}
              visible={schedule}
              onOk={() => handleSchedule(record)}
              footer={null}
              onCancel={handleCancel}
            >
              <h1 className="modal-title">Lên lịch hẹn HDV</h1>
              <p className="modal-des">
                Xác nhận lại lịch hẹn và gửi Mail mời làm việc cho HDV
              </p>
              <div className="modal-main">
                <DatePicker onChange={(date) => setDate(date)} />
              </div>
              <div className="modal-btn">
                <div
                  className="button button--primary"
                  onClick={() => handleSchedule(record)}
                >
                  Gửi Email
                </div>
                <div className="button button--normal" onClick={handleCancel}>
                  Hủy
                </div>
              </div>
            </Modal>
            <Button
              className="button-deny ant-btn-primary"
              onClick={() => handlehdvSkip(record)}
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
  const handleSchedule = async (data) => {
    try {
      let result = await sendPut("/reports/admin/tourguide-meeting", {
        reportId: data.id,
        meetingDate: date,
      });
      if (result.statusCode === 200) {
        message.success("Đã gửi email về HDV");
        await ListRequest();
        showSchedule(false);
        setDate("");
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      message.error("Không thành công");
    }
  };
  const handlehdvSkip = async (values) => {
    let result = await sendPut(
      `/reports/admin/resolve-skip-report/${values.id}`
    );
    if (result.statusCode === 200) {
      message.success("Đã bỏ qua đánh giá");
      await ListRequest();
    } else {
      message.error("thất bại");
    }
  };
  const ListRequest = async () => {
    try {
      const result = await sendGet("/reports/admin/tourguide", {
        status: 2,
        limit: 100,
        startDate: startDate,
        endDate: endDate,
      });
      if (result.returnValue.data.length >= 0) {
        setData(result.returnValue.data?.filter((item) => item.status == 0));
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
