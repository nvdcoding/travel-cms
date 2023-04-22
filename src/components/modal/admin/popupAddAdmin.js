import React, { useState } from "react";
import { Button, Modal, Form, Input, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { sendPost } from "../../../utils/api";
function ModalAddAdmin(props) {
  const [open, setOpen] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();
  const history = useHistory();
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = (e) => {
    form.resetFields();
    setOpen(false);
  };
  const onFinish = async (values) => {
    const res = await sendPost("/gen-data/admin", values);
    if (res.statusCode === 200) {
      message.error("Có lỗi hệ thống");
    } else {
      setOpen(false);
      message.success("Tạo tài khoản thành công");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button
        type="primary"
        className="button-add"
        icon={<PlusOutlined />}
        danger
        onClick={showModal}
      >
        Tạo tài khoản
      </Button>
      <Modal
        title="Thêm tài khoản "
        centered
        visible={open}
        footer={null}
        onCancel={handleCancel}
        cancelText="Hủy"
        okText="Đồng ý"
      >
        <div className="popup-content">
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="E-mail"
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
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Họ tên không đưọc để trống!",
                },
              ]}
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
            <Form.Item name="role" label="Role">
              <Select placeholder="Chọn Role" defaultValue="admin">
                <Option value="admin">Admin</Option>
                <Option value="mod">Mod</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <div className="group-button">
                <Button
                  type="primary"
                  danger
                  htmlType="submit"
                  className="group-button-ok"
                >
                  Tạo tài khoản
                </Button>
                <Button
                  className="button-normal group-button-no-ok"
                  htmlType="reset"
                  onClick={() => setOpen(false)}
                >
                  Hủy
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
export default ModalAddAdmin;
