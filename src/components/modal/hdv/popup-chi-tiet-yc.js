import React, { useState } from 'react';
import { Button, Modal, Form, message } from 'antd';

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
    const handleDeny = (e) => {
        setOpen(false);
        setTimeout(() => {

            message.success("Từ chối thành công");
        }, 1000);
    };
    const onFinish = (values) => {
        setTimeout(() => {
            setOpen(false);
            message.success("Thêm tài khoản thành công");
        }, 2000);

        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Button className='button-deny button-nomal' onClick={showModal}> <i className="fa-solid fa-pencil"></i> Edit</Button>
            <Modal
                title="Chi tiết yêu cầu"
                centered
                visible={open}
                footer={null}
                onCancel={handleCancel}
            >
                <div className='popup-content'>
                    <Form form={form}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className='popup-item__group'>
                            <Form.Item
                                name="email"
                                label="E-mail"
                            >
                                <div className='popup-item'><p className='popup-item-value'>{props.data.mail}</p></div>
                            </Form.Item>
                            <Form.Item
                                label="Họ tên"
                                name="name"
                            >
                                <div className='popup-item'><p className='popup-item-value'>{props.data.name}</p></div>
                            </Form.Item>
                        </div>
                        <div className='popup-item__group'>
                            <Form.Item
                                label="Ngày sinh"
                                name="date"
                            >
                                <div className='popup-item'><p className='popup-item-value'>14/01/2000</p></div>
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                            >
                                <div className='popup-item'><p className='popup-item-value'>09781088544</p></div>
                            </Form.Item>
                        </div>
                        <div className='popup-item__group'> <Form.Item
                            label="Tỉnh thành"
                            name="date"
                        > <div className='popup-item'><p className='popup-item-value'>{props.data.provice}</p></div>
                        </Form.Item>
                            <Form.Item
                                label="Giới tính"
                                name="sex"
                            > <div className='popup-item'><p className='popup-item-value'>Nam</p></div>
                            </Form.Item></div>

                        <Form.Item name="btn">
                            <div className='group-button'>
                                <Button type="primary" danger htmlType="submit" className='group-button-ok'>
                                    Chấp nhận
                                </Button>
                                <Button className='button-normal group-button-no-ok' onClick={() => handleDeny()}>
                                    Từ chối
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};