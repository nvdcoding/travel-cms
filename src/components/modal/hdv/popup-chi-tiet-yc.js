import React, { useState } from "react";
import { Button, Modal, Form, message, DatePicker } from "antd";
import { sendPut } from "../../../utils/api";

export default function ModalDetailRequest(props) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = (e) => {
    form.resetFields();
    setOpen(false);
  };
  const acceptHDV = async (values) => {
    let params = {
      tourGuideId: props.data.id,
      action: "ACCEPT",
      interviewDate: values.interviewDate,
    };
    const result = await sendPut(`/tour-guide/response-registation`, params);
    if (result.statusCode == 200) {
      setOpen(false);
      message.success("Lấy dữ liệu thành công");
      await props.listRequest();
    } else {
      message.error("Thất bại");
    }
  };
  const denyHDV = async (values) => {
    let params = {
      tourGuideId: props.data.id,
      action: "REJECT",
      //   interviewDate: values.interviewDate,
    };
    const result = await sendPut(`/tour-guide/response-registation`, params);
    if (result.statusCode == 200) {
      message.success("Từ chối thành công");
      await props.listRequest();
    } else {
      message.error("Thất bại");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button className="button-deny button-nomal" onClick={showModal}>
        {" "}
        <i className="fa-solid fa-pencil"></i> Edit
      </Button>
      <Modal
        title="Chi tiết yêu cầu"
        centered
        visible={open}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="popup-content">
          <Form
            form={form}
            name="basic"
            onFinish={acceptHDV}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="popup-item__group">
              <Form.Item name="email" label="E-mail">
                <div className="popup-item">
                  <p className="popup-item-value">{props.data.email}</p>
                </div>
              </Form.Item>
              <Form.Item label="Họ tên" name="name">
                <div className="popup-item">
                  <p className="popup-item-value">{props.data.name}</p>
                </div>
              </Form.Item>
            </div>
            <div className="popup-item__group">
              <Form.Item label="Ngày sinh" name="date">
                <div className="popup-item">
                  <p className="popup-item-value">{props.data.dob}</p>
                </div>
              </Form.Item>
              <Form.Item label="Số điện thoại" name="phone">
                <div className="popup-item">
                  <p className="popup-item-value">{props.data?.phone}</p>
                </div>
              </Form.Item>
            </div>
            <div className="popup-item__group">
              {" "}
              <Form.Item label="Tỉnh thành" name="date">
                {" "}
                <div className="popup-item">
                  <p className="popup-item-value">{props.data.provice}</p>
                </div>
              </Form.Item>
              <Form.Item label="Giới tính" name="sex">
                {" "}
                <div className="popup-item">
                  <p className="popup-item-value">
                    {props.data?.gender ? "Nữ" : "Nam"}
                  </p>
                </div>
              </Form.Item>
            </div>
            <Form.Item label="Ngày hẹn phỏng vấn" name="interviewDate">
              <DatePicker />
            </Form.Item>
            <Form.Item name="btn">
              <div className="group-button">
                <Button
                  type="primary"
                  danger
                  htmlType="submit"
                  className="group-button-ok"
                >
                  Chấp nhận
                </Button>
                <Button
                  className="button-normal group-button-no-ok"
                  onClick={() => denyHDV()}
                >
                  Từ chối
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
