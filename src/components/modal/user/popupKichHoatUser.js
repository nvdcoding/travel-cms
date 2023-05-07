/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Switch, message } from "antd";
import { sendGet, sendPut } from "../../../utils/api";
function ModalactivatedUser({ data1, listUser }) {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [data, setData] = useState([]);
  const onFinish = async (values) => {
    values.userId = data1.id
    setIsModalVisible(false);
    await sendPut(`/users`, values);
    await listUser();
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
          <Form.Item label="Họ tên" name="name" initialValue={data1?.name}>
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label="Email" name="email" initialValue={data1?.email}>
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
                  value: '1',
                  label: 'Active',
                },
                {
                  value: '2',
                  label: 'Khóa',
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
export default ModalactivatedUser;
