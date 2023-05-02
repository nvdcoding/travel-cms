/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { sendDelete, sendGet } from "../../../utils/api";
function ModalDeleteUser({ data1, listUser }) {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  const handleDelete = async () => {
    setOpen(false);
    let res = await sendDelete(`/users/${data1.id}`);
    if (res.statusCode === 200) {
      await listUser();
    } else {
      message.error("Xóa User thất bại");
    }
  };
  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        danger
        className="button-primary"
      >
        <i className="fa-solid fa-trash-can"></i>Xóa
      </Button>
      <Modal
        title={"Xóa tài khoản này?"}
        centered
        visible={open}
        onOk={handleDelete}
        onCancel={handleCancel}
        cancelText="Hủy"
        okText="Đồng ý"
      >
        <p className="popup-des">
          Bạn muốn xóa tài khoản
          <span className="popup-des-name">{data1?.name}</span>
        </p>
      </Modal>
    </>
  );
}
export default ModalDeleteUser;
