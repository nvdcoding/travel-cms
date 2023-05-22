import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import Layout from "../components/layout/layout";
import { DatePicker, Col, Row, Table } from "antd";
import moment from "moment";
import { sendGet } from "../utils/api";
const columns = [
  {
    title: "STT",
    dataIndex: "index",
    render: (_, record, index) => <>{index + 1}</>,
  },
  {
    title: "Số tiền",
    dataIndex: "transaction_amount",
    sorter: {
      compare: (a, b) => a.money - b.money,
      multiple: 1,
    },
    render: (transaction_amount) => <p>{transaction_amount} đ</p>,
  },
  {
    title: "Ví điện tử",
    dataIndex: "transaction_wallet",
  },
  {
    title: "Tài khoản",
    dataIndex: "account",
    render: (_, record) => (
      <>
        {record.user_id == null ? (
          <p>
            {record.tourGuide_id} - {record.tourGuide_name}
          </p>
        ) : (
          <p>
            {record.user_id} - {record.user_username}
          </p>
        )}
      </>
    ),
  },
  {
    title: "Loại giao dịch",
    dataIndex: "transaction_type",
    render: (_, record) => (
      <p>{record.transaction_type == "DEPOSIT" ? `Nạp tiền` : "Rút tiền"}</p>
    ),
  },
];
export default function Thongke() {
  const { RangePicker } = DatePicker;
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const dateFormat = "YYYY-MM-DD";
  const changeDate = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };
  const [transaction, setTransaction] = useState([]);
  const getTransaction = async () => {
    const res = await sendGet("/transactions/admin", {
      startDate: startDate,
      endDate: endDate,
    });
    if (res.statusCode == 200) {
      setTransaction(res?.returnValue?.data);
    } else {
      //đơn hàng thất bại
    }
  };
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8,
      total: transaction?.length,
    },
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  useEffect(() => {
    getTransaction();
  }, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <div className="home-header">
            <h5 className="sum-title">
              Tổng số lượt hoạt động: <span>100</span>
            </h5>
            <div className="select_month">
              <h5 className="sum-title"></h5>
              <div className="select_month">
                <div className="time-search">
                  <RangePicker
                    defaultValue={[
                      moment().subtract(1, "months").startOf("month"),
                      moment(),
                    ]}
                    format={dateFormat}
                    onChange={changeDate}
                  />
                  <div
                    className="btn-time-search button button--primary"
                    onClick={() => getTransaction()}
                  >
                    Tìm kiếm
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="statistical-body">
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col xs={24} lg={12} className="statistical-card">
                <div className="statistical-main">
                  <div className="statistical-card-header">
                    <p className="statistical-card-header-name">Thống kê</p>
                  </div>
                  <div className="statistical-content">
                    <ul>
                      <li className="statistical-item">
                        <p className="statistical-name">Tổng doanh thu</p>
                        <span className="statistical-value">
                          10,000,000 VNĐ
                        </span>
                      </li>
                      <li className="statistical-item">
                        <p className="statistical-name">Số tour đã thực hiện</p>
                        <span className="statistical-value">100 tour</span>
                      </li>
                      <li className="statistical-item">
                        <p className="statistical-name">
                          Số bài viết được duyệt
                        </p>
                        <span className="statistical-value">100 bài viết</span>
                      </li>
                      <li className="statistical-item">
                        <p className="statistical-name">Số đánh giá tích cực</p>
                        <span className="statistical-value">100 đánh giá</span>
                      </li>
                      <li className="statistical-item">
                        <p className="statistical-name">Số đánh giá tiêu cực</p>
                        <span className="statistical-value">5 đánh giá</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="transaction_history">
              <div className="transaction_header">
                <h5 className="sum-title">
                  Giao dịch(<span>{transaction?.length}</span>)
                </h5>
                <div className="select_month">
                  <div className="time-search">
                    <RangePicker
                      defaultValue={[
                        moment().subtract(1, "months").startOf("month"),
                        moment(),
                      ]}
                      format={dateFormat}
                      onChange={changeDate}
                    />
                    <div
                      className="btn-time-search button button--primary"
                      onClick={() => getTransaction()}
                    >
                      Tìm kiếm
                    </div>
                  </div>
                </div>
              </div>

              <Table
                rowKey={(record) => record.id}
                className="table-custom-user"
                columns={columns}
                dataSource={transaction}
                onChange={handleTableChange}
                pagination={tableParams.pagination}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
