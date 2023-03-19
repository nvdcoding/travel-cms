import React, { useEffect } from "react";
import "../../assets/css/home.css";
import { Collapse, Button, Form, Input, message } from "antd";
import { logo } from "../../constants/images";
export default function ActiveAdmin() {
  const { Panel } = Collapse;
  const onFinish = (values) => {
    setTimeout(() => {
      message.success("Active thành công");
    }, 2000);

    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="active-admin-wrapper">
        <div className="logo">
          <img alt="" src={logo} />
          <h3 className="active-title"> TravelVN</h3>
        </div>
        <div className="active-main">
          <h1 className="main-header-title">Tạo mật khẩu</h1>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không đưọc để trống!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không đưọc để trống",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Collapse className="collapse-body" expandIconPosition="right">
                <Panel header="Quy tắc đặt mật khẩu">
                  <p className="collapse-content">
                    Để bảo mật cho tài khoản của bạn, vui lòng đặt mật khẩu theo
                    quy tắc:
                  </p>
                  <ul className="collapse-item">
                    <li className="collapse-des">Tối thiểu 8 kí tự. </li>
                    <li className="collapse-des">
                      Mật khẩu bao gồm ít nhất 1 kí tự hoa, 1 kí tự thường và 1
                      kí tự đặc biệt.
                    </li>
                  </ul>
                </Panel>
              </Collapse>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                danger
                htmlType="submit"
                className="button-active-user"
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
