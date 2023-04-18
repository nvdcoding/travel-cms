/* eslint-disable eqeqeq */
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
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { sendGet } from "../../../utils/api";

function ModalAddVoucher() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
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
  const onChange = (date, dateString) => {
    // console.log(`dateString`, dateString);
    setDate(dateString[0]);
  };
  const onFinish = async (values) => {
    console.log(`values`, values);
    values.date = date;
    const result = await sendGet(`/vourchers`, values);
    if (result.statusCode == 200) {
      message.success("Thêm mã giảm giá thành công");
    } else {
      message.error("thất bại");
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
        Thêm Mã giảm giá
      </Button>
      <Modal
        title="Thêm voucher"
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
              label="Tour áp dụng"
              name="tourId"
              rules={[
                {
                  required: true,
                  message: "Mã Tour không đưọc để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên voucher"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên voucher không đưọc để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mã Voucher"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Mã code không đưọc để trống!",
                },
              ]}
            >
              <Input />
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
              label="Số giảm"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Số giảm không đưọc để trống!",
                },
              ]}
            >
              <InputNumber min={1} max={1000} />
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="numberOfMember"
              rules={[
                {
                  required: true,
                  message: "Số lượng không đưọc để trống!",
                },
              ]}
            >
              <InputNumber min={1} max={1000} defaultValue={10} />
            </Form.Item>
            <Form.Item name="type" label="Loại mã">
              <Select placeholder="Loại mã" defaultValue="%">
                <Option value="%">Giảm theo %</Option>
                <Option value="đ">vnđ</Option>
              </Select>
            </Form.Item>
            <Form.Item name="time" label="Thời gian">
              <RangePicker
                defaultValue={[moment(), moment().add(1, "days")]}
                format={dateFormat}
                onChange={onChange}
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
                  Tạo
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
export default ModalAddVoucher;
