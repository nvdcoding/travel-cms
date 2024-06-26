import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/home.css";
import { Table, Button, message, Tabs } from "antd";
import Layout from "../../components/layout/layout";
import LichSuDuyetBlog from "./lich-su-duyet-blog";
import ListBlog from "./list-blog";
import { sendGet, sendPut } from "../../utils/api";

export default function ManageUpdate() {
  const [data, setData] = useState();
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      width: "40px",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Ngày sửa",
      dataIndex: "time",
      render: (_, record) => <>{new Date(record.updatedAt).toLocaleString()}</>,
    },
    {
      title: "Tiêu đề ",
      dataIndex: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      render: (_, record) => (
        <>
          {record.tourGuide != null
            ? record.tourGuide?.username
            : record.user?.username}
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
              className="button-deny button-nomal"
              onClick={() => denyBlog(record.id)}
            >
              Từ chối
            </Button>
            <Button className="button-nomal">
              <Link to={`/quan-ly-blog/${record.id}`}> Xem </Link>
            </Button>
          </div>
        </>
      ),
    },
  ];
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 8,
      total: data?.length,
    },
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  const denyBlog = async (e) => {
    let params = {
      postId: e,
      action: "REJECTED",
    };
    const result = await sendPut(`/posts/admin/approve-update`, params);
    if (result.statusCode == 200) {
      message.success("Từ chối thành công");
      await listUpdate();
    } else {
      message.error("thất bại");
    }
  };
  const listUpdate = async () => {
    try {
      const res = await sendGet("/posts/admin", {
        status: "WAITING",
        limit: 100,
      });
      if (res.statusCode === 200) {
        setData(res.returnValue?.data);
      } else {
        message.error("Thất bại");
      }
    } catch (error) {
      if (error.response?.status == 406) {
        message.error("Tài quản Mod không có quyền thao tác chức năng này");
      }
    }
  };
  useEffect(() => {
    listUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
