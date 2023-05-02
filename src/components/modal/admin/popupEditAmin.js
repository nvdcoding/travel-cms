/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Switch, message } from "antd";
import { sendGet, sendPut } from "../../../utils/api";
function ModalEditAdmin({ data1, listUser }) {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [data, setData] = useState([]);
  const onFinish = async (values) => {
    if (values.status == false) {
      values.status = "0"
    }
    if (values.status == true) {
      values.status = "1"
    }
    values.modId = data1.id
    setIsModalVisible(false);
    await sendPut(`/admin/`, values);
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
        <i className="fa-solid fa-pencil"></i>Edit
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
          <Form.Item label="Họ tên" name="name" initialValue={data1?.username}>
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label="Email" name="email" initialValue={data1?.email}>
            <Input disabled={true} />
          </Form.Item>

          <Form.Item name="roles" label="Chức vụ" initialValue={data1?.role}>
            <Select placeholder="Chọn chức vụ của bạn!" defaultValue="user">
              <Option value="admin">Admin</Option>
              <Option value="mod">Mod</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái tài khoản"
            initialValue={data?.status}
          >
            <Switch
              checkedChildren="active"
              unCheckedChildren="enable"
              defaultChecked
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
export default ModalEditAdmin;
