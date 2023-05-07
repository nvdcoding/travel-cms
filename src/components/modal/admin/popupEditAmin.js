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
    try {
      values.level = parseInt(values.level);
      values.modId = data1.id;
      setIsModalVisible(false);
      await sendPut(`/admin`, values);
      await listUser();
    } catch (e) {
      message.error("Không thể thay đổi quyền admin");
    }
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
          <Form.Item name="level" label="Chức vụ">
            <Select placeholder="Chọn chức vụ của bạn!">
              <Option value="1">Mod L.1</Option>
              <Option value="2">Mod L.2</Option>
              <Option value="3">Mod L.3</Option>
              <Option value="4">Mod L.4</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái tài khoản"
            initialValue={data?.status}
          >
            <Select placeholder="Trạng thái tài khoản!">
              <Option value="1">Hoạt động1</Option>
              <Option value="0">Khóa</Option>
            </Select>
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
