import React, { useEffect } from "react";
import "../assets/css/home.css";
import Layout from "../components/layout/layout";
import { Button, Form, Input, InputNumber } from "antd";

export default function Hethong() {
  const onFinish = (values) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, []);
  return (
    <>
      <Layout>
        <div className="main">
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="order"
              label="Hướng dẫn viên đặt cọc trước"
              rules={[
                {
                  type: "number",
                  message: "Number ko hợp lệ.",
                },
                {
                  required: true,
                  message: "Không đưọc để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số lần cảnh báo HDV"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Số lần cảnh báo HDV không đưọc để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tỉ lệ phần trăm đền bù user"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Tỉ lệ phần trăm đền bù user không đưọc để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Hoa hồng hệ thống"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Hoa hồng hệ thống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <div className="group-button">
                <Button
                  type="primary"
                  danger
                  htmlType="submit"
                  className="group-button-ok"
                >
                  Lưu
                </Button>
                <Button
                  className="button-normal group-button-no-ok"
                  htmlType="reset"
                >
                  Hủy
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    </>
  );
}
