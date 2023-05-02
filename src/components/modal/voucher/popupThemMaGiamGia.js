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
import { sendGet, sendPost } from "../../../utils/api";

function ModalAddVoucher({ listVoucher }) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };
  const onFinish = async (values) => {
    values.startDate = values.time[0];
    values.endDate = values.time[1];
    const result = await sendPost(`/vourchers`, values);
    if (result.statusCode == 200) {
      await listVoucher();
      message.success("Thêm mã giảm giá thành công");
      setOpen(false);
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

            <div className="group" style={{ display: "flex" }}>
              <Form.Item
                label="Số giảm"
                name="value"
                rules={[
                  {
                    required: true,
                    message: "Số giảm không đưọc để trống!",
                  },
                ]}
              >
                <InputNumber min={1} max={1000} />
              </Form.Item>{" "}

              <Form.Item name="quantity" label="Số lượng" initialValue={10}>
                <InputNumber min={1} max={1000} placeholder="Số mã giảm giá" />
              </Form.Item>
            </div>
            <div className="group">
              <Form.Item name="discountType" label="Loại mã" initialValue="0">
                <Select placeholder="Loại mã">
                  <Option value="0">Giảm theo %</Option>
                  <Option value="1">vnđ</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="requirementPoint"
                label="Điểm cần để đổi"
                rules={[
                  {
                    required: true,
                    message: "Điểm không đưọc để trống!",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={1000}
                  placeholder="Nhập số điểm cần để đổi"
                />
              </Form.Item>
            </div>
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
