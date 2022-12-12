import React, { useState } from 'react';
import { Button, Modal } from 'antd';
function ModalDeleteUser(props) {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = (e) => {
        setOpen(false);
    };
    const handleCancel = (e) => {
        setOpen(false);
    };
    return (
        <>
            <Button onClick={showModal} type="primary" danger className="button-primary">
                <i className="fa-solid fa-trash-can"></i>Xóa
            </Button>
            <Modal
                title="Xóa tài khoản này?"
                centered
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="Hủy"
                okText="Đồng ý"
            >
                <p className='popup-des'>Bạn muốn xóa tài khoản <span className='popup-des-name'>{props.data.name}</span></p>
            </Modal>
        </>
    );
};
export default ModalDeleteUser;