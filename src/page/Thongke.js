import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import Layout from "../components/layout/layout";
import { DatePicker, Col, Row, Table, message } from "antd";
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
      compare: (a, b) => a.transaction_amount - b.transaction_amount,
      multiple: 1,
    },
    render: (transaction_amount) => <p>{transaction_amount} đ</p>,
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
      <p>
        {record?.transaction_type == "WITHDRAW"
          ? "Rút tiền"
          : record?.transaction_type == "DEPOSIT"
          ? "Nạp tiền"
          : record?.transaction_type == "PAY_ORDER"
          ? "Thanh toán chuyến đi"
          : record?.transaction_type == "USER_PREPAID_ORDER"
          ? "Đặt cọc chuyến đi"
          : record?.transaction_type == "TOURGUIDE_APPROVE_ORDER"
          ? "Đặt cọc nhận chuyến"
          : record?.transaction_type == "TOURGUIDE_RECEIVE_ORDER"
          ? "Lợi nhuận chuyến đi"
          : record?.transaction_type == "CANCEL_ORDER"
          ? "Hủy chuyến"
          : record?.transaction_type == "BACK_PREPAID"
          ? "Hoàn tiền đặt cọc"
          : "Giao dịch khác"}
      </p>
    ),
  },
];
function formatCurrency(price, symbol = "$") {
  var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
  var priceWithCommas = price.toLocaleString();
  var arParts = String(priceWithCommas).split(DecimalSeparator);
  var intPart = arParts[0];
  var decPart = arParts.length > 1 ? arParts[1] : "";
  decPart = (decPart + "00").substr(0, 2);
  return symbol + intPart + DecimalSeparator + decPart;
}
export default function Thongke() {
  const { RangePicker } = DatePicker;
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [options, setOptions] = useState({});

  const dateFormat = "YYYY-MM-DD";
  const changeDate = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };
  const [transaction, setTransaction] = useState([]);
  const getTransaction = async () => {
    try {
      const res = await sendGet("/transactions/admin", {
        startDate: startDate,
        endDate: endDate,
      });
      if (res.statusCode == 200) {
        message.success("Lấy dữ liệu thành công");
        setTransaction(res?.returnValue?.data);
        setOptions(res.options);
      } else {
        //đơn hàng thất bại
      }
    } catch (error) {
      if (error.response?.status == 406) {
        message.error("Tài quản Mod không có quyền thao tác chức năng này");
      }
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
                          {+options.totalProfit
                            ? formatCurrency(+options.totalProfit, "VNĐ ")
                                .split(" ")
                                .reverse()
                                .join(" ")
                                .split(".")[0]
                            : 0}{" "}
                          VNĐ
                        </span>
                      </li>
                      <li className="statistical-item">
                        <p className="statistical-name">Số tour đã thực hiện</p>
                        <span className="statistical-value">
                          {options.numOfOrders} tour
                        </span>
                      </li>
                      <li className="statistical-item">
                        <p className="statistical-name">
                          Số bài viết được duyệt
                        </p>
                        <span className="statistical-value">82 bài viết</span>
                      </li>
                      <li className="statistical-item">
                        <p className="statistical-name">Số đánh giá tích cực</p>
                        <span className="statistical-value">
                          {options.goodRates} đánh giá
                        </span>
                      </li>
                      <li className="statistical-item">
                        <p className="statistical-name">Số đánh giá tiêu cực</p>
                        <span className="statistical-value">
                          {options.badRates} đánh giá
                        </span>
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
