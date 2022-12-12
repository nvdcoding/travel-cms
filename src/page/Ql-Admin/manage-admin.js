import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table } from 'antd';
import Layout from "../../components/layout/layout";
import ModalactivatedUser from "../../components/modal/user/popupKichHoatUser";
import ModalDeleteUser from "../../components/modal/user/poupXoaUser";
import ModalAddAdmin from "../../components/modal/admin/popupAddAdmin";

const columns = [
    {
        title: 'Tên',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'mail',
    },
    {
        title: 'Role',
        dataIndex: 'role',
    },
    {
        title: 'Created date',
        dataIndex: 'created',
    },
    {
        title: 'Kích hoạt',
        dataIndex: 'active',
    },
    {
        title: '',
        dataIndex: 'action',
        render: (_, record) => (
            <>
                <div className="table-cell-action">
                    <ModalactivatedUser className="modal-active-user" data={record} />
                    <ModalDeleteUser className="modal-delete-user" data={record} />
                </div>
            </>

        ),
    },
];
const data = [
    {
        name: 'John Brown',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "1",
        created: "20/10/20001",
        role: "Admin"
    },
    {
        name: 'John Brown1',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "2",
        created: "20/10/20001",
        role: "Admin"
    },
    {
        name: 'John Bro23ewn',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "3",
        created: "20/10/20001",
        role: "Admin"
    },
    {
        name: 'John Bhỷtgrown',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "4",
        created: "20/10/20001",
        role: "Mod"
    },
    {
        name: 'John grgBrown',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "5",
        created: "20/10/20001",
        role: "Mod"
    },
    {
        name: 'John Bgregrown',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "6",
        created: "20/10/20001",
        role: "Admin"
    },
    {
        name: 'John Bgregrown',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "7",
        created: "20/10/20001",
        role: "Mod"
    },
    {

        name: 'John ggg',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "8",
        created: "20/10/20001",
        role: "Admin"
    },

    {
        name: 'John Bfffrown',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "9",
        created: "20/10/20001",
        role: "Admin"
    }, {
        name: 'John ferf',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "10",
        created: "20/10/20001",
        role: "Admin"
    },
    {
        name: 'John wreBrown',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "11",
        created: "20/10/20001",
        role: "Admin"
    },
    {
        name: '3ư Brown',
        mail: "lamdgka@gmail.com",
        active: "Active",
        id: "12",
        created: "20/10/20001",
        role: "Admin"
    },

];
function ManageAdmin() {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: data.length
        },
    });
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };
    useEffect(() => {
    }, []);
    return (
        <>
            <Layout>
                <div className="home__wrapper">
                    <div className="home-header">
                        <h5 className="sum-title">
                            Tổng số user: <span>100</span>
                        </h5>
                        <ModalAddAdmin />
                    </div>

                    <Table rowKey={record => record.id} scroll={{ y: 500 }} className="table-custom-user" columns={columns} dataSource={data} onChange={handleTableChange} pagination={tableParams.pagination} />
                </div>
            </Layout>
        </>
    );
}
export default ManageAdmin;