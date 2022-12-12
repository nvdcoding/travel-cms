import React, { useState } from 'react';
import { Button, Modal, Form, Input, message, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function ModalAddAdmin(props) {
    const [open, setOpen] = useState(false);
    const { Option } = Select;
    const [form] = Form.useForm();
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = (e) => {
        form.resetFields();
        setOpen(false);
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
            <Button type="primary" className='button-add' icon={<PlusOutlined />} danger onClick={showModal}>Tạo tài khoản</Button>
            <Modal
                title="Thêm tài khoản "
                centered
                visible={open}
                footer={null}
                onCancel={handleCancel}
                cancelText="Hủy"
                okText="Đồng ý"
            >
                <div className='popup-content'>
                    <Form form={form}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'E-mail không hợp lệ.',
                                },
                                {
                                    required: true,
                                    message: 'E-mail không đưọc để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Họ tên không đưọc để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="role"
                            label="Role"
                        >
                            <Select placeholder="Chọn Role" defaultValue="admin">
                                <Option value="admin" >Admin</Option>
                                <Option value="mod">Mod</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <div className='group-button'>
                                <Button type="primary" danger htmlType="submit" className='group-button-ok'>
                                    Tạo tài khoản
                                </Button>
                                <Button className='button-normal group-button-no-ok' htmlType="reset" onClick={() => setOpen(false)}>
                                    Hủy
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
};
export default ModalAddAdmin;