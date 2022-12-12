import React, { useState } from 'react';
import { Button, Modal } from 'antd';
function ModalactivatedUser(props) {
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = (e) => {
        console.log(e);
        setOpen(false);
    };
    const handleCancel = (e) => {
        console.log(e);
        setOpen(false);
    };
    return (
        <>
            <Button className='button-nomal' onClick={showModal}>
                <i className="fa-solid fa-pencil"></i>Edit
            </Button>
            <Modal
                title="Chỉnh sửa người dùng "
                centered
                visible={open}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelText="Hủy"
                okText="Đồng ý"
            >
                <p className='popup-des'>Bạn muốn khóa tài khoản <span className='popup-des-name'>{props.data.name}</span></p>
            </Modal>
        </>
    );
};
export default ModalactivatedUser;