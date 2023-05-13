import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message } from "antd";
import { Link } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";

export default function LichSuRutTien() {
    const [data, setData] = useState([]);
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            width: "40px",
            render: (_, record, index) => (
                <>
                    {index + 1}
                </>
            ),
        },
        {
            title: "Thời gian yêu cầu",
            dataIndex: "time",
        },
        {
            title: "Mã rút tiền",
            dataIndex: "name",
        },
        {
            title: "Số tiền",
            dataIndex: "money",
        },
        {
            title: "HDV",
            dataIndex: "nameGuide",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            filters: [
                {
                    text: 'Đã phê duyệt',
                    value: '1',
                },
                {
                    text: 'Chưa phê duyệt',
                    value: '0',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
    ];
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 8,
            total: data.length,
        },
    });
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };
    const ListRequest = async () => {
        const result = await sendGet("/tours/admin/approve-list", { limit: 100 });
        if (result.returnValue.data.length >= 0) {
            setData(result.returnValue.data);
        } else {
            message.error("thất bại");
        }
    };
    useEffect(() => {
        ListRequest();
    }, []);
    return (
        <>
            <Table
                rowKey={(record) => record.id}
                className="table-custom-user"
                columns={columns}
                dataSource={data}
                onChange={handleTableChange}
                pagination={tableParams.pagination}
            />
        </>
    );
}
