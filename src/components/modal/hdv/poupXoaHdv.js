/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { sendDelete, sendGet } from "../../../utils/api";
function ModalDeleteHdv({ data, listRequest }) {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
      setOpen(false);
      let res = await sendDelete(`/tour-guide/${data.id}`);
      if (res.statusCode === 200) {
        await listRequest();
        message.success("Xóa HDV thành công");
      } else {
        message.error("Xóa HDV thất bại");
      }
    } catch (error) {
      message.error("Xóa HDV thất bại");
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
          <span className="popup-des-name">{data?.username}</span>
        </p>
      </Modal>
    </>
  );
}
export default ModalDeleteHdv;
