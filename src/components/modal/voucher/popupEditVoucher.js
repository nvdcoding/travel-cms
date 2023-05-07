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
import moment from "moment";
import { sendPut } from "../../../utils/api";

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
  const onFinish = async (values) => {
    // const result = await sendPut(`/vourchers/${props.data.id}`, values);
    // if (result.statusCode == 200) {
    //   message.success("Update thành công");
    //   setOpen(false);
    // } else {
    message.error("Không thể edit voucher");
    // }
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
            <div className="group" style={{ display: "flex" }}>
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
                <Input />
              </Form.Item>
              <Form.Item
                name="quantity"
                label="Số lượng"
                initialValue={props?.data?.quantity}
              >
                <InputNumber min={1} max={1000} placeholder="Số mã giảm giá" />
              </Form.Item>
            </div>
            <div className="group" >
              <Form.Item
                name="discountType"
                label="Loại mã"
                initialValue={props?.data?.discountType}
              >
                <Select placeholder="Loại mã">
                  <Option value="0">Giảm theo %</Option>
                  <Option value="1">vnđ</Option>
                </Select>
              </Form.Item>
              <Form.Item initialValue={props?.data?.requirementPoint}
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
