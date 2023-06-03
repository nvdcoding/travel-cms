/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Switch, message } from "antd";
import { sendGet, sendPut } from "../../../utils/api";
function ModalactivatedHdv({ data, listRequest }) {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = async (values) => {
    values.tourGuideId = data.id;
    setIsModalVisible(false);
    await sendPut(`/tour-guide`, values);
    await listRequest();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  async function getOneUser() {
    setIsModalVisible(true);
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Button className="button-nomal" onClick={() => getOneUser()}>
        <i className="fa-solid fa-pencil"></i>Khóa
      </Button>
      <Modal
        title="Chỉnh sửa thông tin"
        open={isModalVisible}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Họ tên" name="name" initialValue={data?.username}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="Email" name="email" initialValue={data?.email}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái tài khoản"
            initialValue={data?.verifyStatus}
          >
            <Select
              allowClear
              options={[
                {
                  value: "ACTIVE",
                  label: "Active",
                },
                {
                  value: "INACTIVE",
                  label: "Khóa",
                },
              ]}
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "10px",
            }}
          >
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Button
                type="primary"
                htmlType="reset"
                onClick={() => setIsModalVisible(false)}
              >
                Hủy
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
}
export default ModalactivatedHdv;
