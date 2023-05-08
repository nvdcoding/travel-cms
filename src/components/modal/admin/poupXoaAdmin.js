/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import { sendDelete, sendGet } from "../../../utils/api";
function ModalDeleteAdmin({ data1 }) {
  const [open, setOpen] = useState(false);
  console.log("dtAA", data1);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = (e) => {
    setOpen(false);
  };
  const handleDelete = async () => {
    setOpen(false);
    await sendDelete(`api/user/${data1.id}`);
    const res = await sendGet("api/user/manage/", { limit: 100 });
    if (res.status === 200) {
      // setData(res.data);
      // await props.list();
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
export default ModalDeleteAdmin;
