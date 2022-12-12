import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table } from 'antd';

import ModalactivatedUser from "../../components/modal/user/popupKichHoatUser";
import ModalDeleteUser from "../../components/modal/user/poupXoaUser";

const data = [
    {
        name: 'John Brown',
        mail: "lamdgka@gmail.com",
        time: "20/10/2022",
        phone: "7986789402",
        status: "Kích hoạt",
        id: "1",
        tour: "20",
        rate: "4.5 sao",
        sex: "Nam",
        provice: "Hà nội",
        money: "10.10000"
    },
    {
        name: 'John Brown1',
        mail: "lamdgka@gmail.com",
        time: "20/10/2022",
        phone: "7986789402",
        status: "Từ chối",
        id: "2",
        tour: "20",
        rate: "4.5 sao",
        sex: "Nam",
        provice: "Hà nội",
        money: "10.10000"
    },
    {
        name: 'John Bro23ewn',
        mail: "lamdgka@gmail.com",
        time: "20/10/2022",
        phone: "7986789402",
        status: "Kích hoạt",
        id: "3",
        tour: "20",
        rate: "4.5 sao",
        sex: "Nam",
        provice: "Hà nội",
        money: "10.10000"
    },
    {
        name: 'John Bhỷtgrown',
        mail: "lamdgka@gmail.com",
        time: "20/10/2022",
        phone: "7986789402",
        status: "Kích hoạt",
        id: "4",
        tour: "20",
        rate: "4.5 sao",
        sex: "Nam",
        provice: "Hà nội",
        money: "10.10000"
    },
    {
        name: 'John grgBrown',
        mail: "lamdgka@gmail.com",
        time: "20/10/2022",
        phone: "7986789402",
        status: "Từ chối",
        id: "5",
        tour: "20",
        rate: "4.5 sao",
        sex: "Nam",
        provice: "Hà nội",
        money: "10.10000",
    },

];
export default function ListHdv() {
    const columns = [
        {
            title: 'Ngày tạo',
            dataIndex: 'time',
        },
        {
            title: 'Username',
            dataIndex: 'name',
        },
        {
            title: 'Địa chỉ Email',
            dataIndex: 'mail',
        },
        {
            title: 'SDT',
            dataIndex: 'phone',
        },
        {
            title: 'Tour đã thực hiện',
            dataIndex: 'tour',
        },
        {
            title: 'Tỉnh thành',
            dataIndex: 'provice',
        },
        {
            title: 'Số tiền giao dịch',
            dataIndex: 'money',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
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
            <Table rowKey={record => record.id} scroll={{ y: 500 }} className="table-custom-user" columns={columns} dataSource={data} onChange={handleTableChange} pagination={tableParams.pagination} />
        </>
    );
}