import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import Layout from "../components/layout/layout";
import { DatePicker, Col, Row, Table } from "antd";
import moment from "moment";
const columns = [
  {
    title: "Id",
    dataIndex: "id",
  },
  {
    title: "Số tiền",
    dataIndex: "money",
    sorter: {
      compare: (a, b) => a.money - b.money,
      multiple: 1,
    },
    render: (text) => <p>{text} đ</p>,
  },
  {
    title: "Ví điện tử",
    dataIndex: "bank",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Loại giao dịch",
    dataIndex: "type",
  },
];
const data = [
  {
    id: "45678921",
    money: 189000,
    bank: "Zalo-0978674341",
    email: "lamdgka@gmail.com",
    type: 1,
  },
  {
    id: "45673321",
    money: 121000,
    bank: "Zalo - 077582368362",
    email: "lamdgka@gmail.com",
    type: 1,
  },
  {
    id: "3456781",
    money: 12000,
    bank: "Zalo - 0878574621",
    email: "duynguyen@gmail.com",
    type: 1,
  },
];
export default function Thongke() {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
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
  useEffect(() => {}, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <div className="home-header">
            <h5 className="sum-title">
              Tổng số lượt hoạt động: <span>100</span>
            </h5>
            <div className="select_month">
              <p>Chọn tháng cần tra cứu</p>
              <DatePicker
                onChange={onChange}
                picker="month"
                defaultValue={moment()}
              />
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
              <Col xs={24} lg={12} className="statistical-card">
                <div className="statistical-main">
                  <div className="statistical-card-header">
                    <p className="statistical-card-header-name">Thống kê</p>
                  </div>
                  <div className="statistical-content">
                    <ul className="statistical-top">
                      <li className="statistical-item">
                        <p className="statistical-name">
                          Top 3 địa điểm đến trong tháng
                        </p>
                        <div className="statistical-top-item">
                          <span class="number ">1</span>
                          <span className="statistical-value">Hà Nội</span>
                        </div>
                        <div className="statistical-top-item">
                          <span class="number ">2</span>
                          <span className="statistical-value">Đà Nẵng</span>
                        </div>
                        <div className="statistical-top-item">
                          <span class="number ">3</span>
                          <span className="statistical-value">Thái Nguyên</span>
                        </div>
                      </li>
                      <li className="statistical-item">
                        <p className="statistical-name">Top 3 HDV</p>
                        <div className="statistical-top-item">
                          <span class="number ">1</span>
                          <span className="statistical-value">
                            Nguyễn Duy - 12356742
                          </span>
                        </div>
                        <div className="statistical-top-item">
                          <span class="number ">2</span>
                          <span className="statistical-value">
                            Nguyễn Duy - 3121234
                          </span>
                        </div>
                        <div className="statistical-top-item">
                          <span class="number ">3</span>
                          <span className="statistical-value">
                            Nguyễn Duy - 54211
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="transaction_history">
              <div className="transaction_header">
                <h5 className="sum-title">
                  Tổng số giao dịch trong tháng: <span>100</span>
                </h5>
                <div className="select_month">
                  <p>Chọn tháng cần tra cứu</p>
                  <DatePicker
                    onChange={onChange}
                    picker="month"
                    defaultValue={moment()}
                  />
                </div>
              </div>

              <Table
                rowKey={(record) => record.id}
                scroll={{ y: 500 }}
                className="table-custom-user"
                columns={columns}
                dataSource={data}
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
