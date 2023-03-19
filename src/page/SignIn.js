/* eslint-disable eqeqeq */
import React, { useEffect } from "react";
import "../assets/css/home.css";
import { Button, Form, Input, message } from "antd";
import { logo } from "../constants/images";
import { useHistory } from "react-router-dom";
export default function SignIn() {
  const history = useHistory();
  const onFinish = (values) => {
    if (values.mail == "admin@gmail.com" && values.password == "123") {
      history.push("/");
      setTimeout(() => {
        message.success("Đăng nhập thành công");
      }, 2000);
    } else {
      message.error("Tài khoản không tồn tại");
    }
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {}, []);
  return (
    <>
      <div className="sign-in_wrapper">
        <div className="logo">
          <img alt="" src={logo} />
          <h3 className="active-title"> TravelVN</h3>
        </div>
        <div className="active-main">
          <h1 className="main-header-title">Đăng nhập</h1>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="mail"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "E-mail không hợp lệ.",
                },
                {
                  required: true,
                  message: "E-mail không đưọc để trống!",
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

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
            <Form.Item>
              <Button
                type="primary"
                danger
                htmlType="submit"
                className="button-active-user"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
