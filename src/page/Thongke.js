import React, { useEffect } from "react";
import "../assets/css/home.css";
import Layout from "../components/layout/layout";
import { DatePicker, Col, Row } from "antd";
import moment from "moment";

export default function Thongke() {
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  useEffect(() => {}, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <div className="home-header">
            <h5 className="sum-title">
              Tổng số lượt hoạt động: <span>100</span>
            </h5>
            <RangePicker
              defaultValue={[moment(), moment().add(1, "days")]}
              format={dateFormat}
            />
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
                <div title="Card title">Card content</div>
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    </>
  );
}
