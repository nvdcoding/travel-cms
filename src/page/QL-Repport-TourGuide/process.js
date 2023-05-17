import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Table, Button, message, DatePicker, Modal } from "antd";
import { Link } from "react-router-dom";
import { sendGet, sendPut } from "../../utils/api";
import moment from "moment";

export default function ProcessReportHDV() {
    const [data, setData] = useState([]);

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            width: "40px",
            render: (_, record, index) => <>{index + 1}</>,
        },
        {
            title: "Thời gian báo cáo",
            dataIndex: "time",
            render: (_, record) => <>{new Date(record.createdAt).toLocaleString()}</>,
        },
        {
            title: "Ngày hẹn làm việc",
            dataIndex: "meetingDate",
        },
        {
            title: "Chuyến đi",
            dataIndex: "id",
            dataIndex: "time", render: (_, record) => <>{record?.order?.id} -{record?.order?.name}</>,
        },
        {
            title: "Nội dung báo cáo",
            dataIndex: "content",
        },
        {
            title: "Số lượt cảnh báo",
            dataIndex: "reportNum",
            render: (_, record) => <>{record?.order?.tourGuide?.warningTime}</>,
        },
        {
            title: "Người báo cáo",
            dataIndex: "reportBy",
            render: (_, record) => (
                <>
                    {record.reportedBy?.id} - {record.reportedBy?.username}
                </>
            ),
        },
        {
            title: "",
            dataIndex: "action",
            render: (_, record) => (
                <>
                    <div className="table-cell-action">
                        <Button
                            type="primary"
                            className="button-accept button-primary"
                            danger
                            onClick={() => handlehdvWarning(record)}
                        >
                            Cảnh báo
                        </Button>
                        <Button
                            className="button-deny ant-btn-primary"
                            onClick={() => handlehdvLock(record)}
                        >
                            Khóa
                        </Button>
                        <Button
                            className="button-deny ant-btn-primary"
                            onClick={() => handlehdvSkip(record)}
                        >
                            Bỏ qua
                        </Button>
                    </div>
                </>
            ),
        },
    ];

    const [startDate, setStartDate] = useState(
        moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
    );
    const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
    const dateFormat = "YYYY-MM-DD";
    const changeDate = (date, dateString) => {
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
    };
    const { RangePicker } = DatePicker;
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
    const handlehdvLock = async (values) => {
        try {
            let result = await sendPut(`/reports/admin/resolve-band-tourguide/${values.id}`);
            if (result.statusCode === 200) {
                message.success("Đã khóa tài khoản HDV");
                await ListRequest();
            } else {
                message.error("thất bại");
            }
        } catch (error) {
            message.error("Không thành công");

        }

    }
    const handlehdvWarning = async (values) => {
        try {
            let result = await sendPut(`/reports/admin/resolve-warning-tourguide/${values.id}`);
            if (result.statusCode === 200) {
                message.success("Đã cảnh báo tài khoản HDV");
                await ListRequest();
            } else {
                message.error("thất bại");
            }
        } catch (error) {
            message.error("Không thành công");

        }

    }
    const handlehdvSkip = async (values) => {
        let result = await sendPut(`/reports/admin/resolve-skip-report/${values.id}`);
        if (result.statusCode === 200) {
            message.success("Đã bỏ qua báo cáo");
            await ListRequest();
        } else {
            message.error("thất bại");
        }
    };
    const ListRequest = async () => {
        const result = await sendGet("/reports/admin/tourguide", {
            status: 2, limit: 100,
            startDate: startDate,
            endDate: endDate,
        });
        if (result.returnValue.data.length >= 0) {
            setData(result.returnValue.data?.filter((item) => item.status == 2));
        } else {
            message.error("thất bại");
        }
    };
    useEffect(() => {
        ListRequest();
    }, []);
    return (
        <>
            <div className="group-search">
                <RangePicker
                    defaultValue={[
                        moment().subtract(1, "months").startOf("month"),
                        moment(),
                    ]}
                    format={dateFormat}
                    onChange={changeDate}
                />
                <button
                    onClick={() => ListRequest()}
                    type="button"
                    class="ant-btn ant-btn-primary ant-btn-dangerous button-add"
                >
                    <span>Tìm kiếm</span>
                </button>
            </div>
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
