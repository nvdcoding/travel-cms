import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Select,
  InputNumber,
  DatePicker,
} from "antd";
import moment from "moment";

function ModalEditVoucher(props) {
  const [open, setOpen] = useState(false);
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = (e) => {
    form.resetFields();
    setOpen(false);
  };
  const onFinish = (values) => {
    setTimeout(() => {
      setOpen(false);
      message.success("Sửa mã giảm giá thành công");
    }, 2000);

    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button className="button-nomal" onClick={showModal}>
        <i className="fa-solid fa-pencil"></i>Edit
      </Button>
      <Modal
        title="Edit Voucher"
        centered
        visible={open}
        footer={null}
        onCancel={handleCancel}
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
              initialValue={props.data.name}
              label="Tên voucher"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên voucher không đưọc để trống!",
                },
              ]}
            >
              <Input defaultValue={props.data.name} />
            </Form.Item>
            <Form.Item
              initialValue={props.data.code}
              label="Mã code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Mã code không đưọc để trống!",
                },
              ]}
            >
              <Input defaultValue={props.data.code} />
            </Form.Item>
            <Form.Item
              label="Nội dung voucher"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Nội dung không đưọc để trống không đưọc để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              initialValue={props.data.value}
              label="Số giảm"
              name="value"
              rules={[
                {
                  required: true,
                  message: "Số giảm không đưọc để trống!",
                },
              ]}
            >
              <Input defaultValue={props.data.value} />
            </Form.Item>
            <Form.Item
              initialValue={props.data.number}
              label="Số lượng"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Số lượng không đưọc để trống!",
                },
              ]}
            >
              <InputNumber
                min={1}
                max={1000}
                defaultValue={props.data.number}
              />
            </Form.Item>
            <Form.Item
              initialValue={props.data.type}
              name="type"
              label="Loại mã"
            >
              <Select placeholder="Loại mã" defaultValue={props.data.type}>
                <Option value="%">Giảm theo %</Option>
                <Option value="đ">vnđ</Option>
              </Select>
            </Form.Item>
            <Form.Item name="Thời gian" label="time">
              <RangePicker
                defaultValue={[moment(), moment().add(1, "days")]}
                format={dateFormat}
              />
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
export default ModalEditVoucher;
