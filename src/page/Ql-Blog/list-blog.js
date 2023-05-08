import React, { useEffect, useState, useRef } from "react";
import "../../assets/css/home.css";
import { Table, Input, Space, Button, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ModalactivatedUser from "../../components/modal/user/popupKichHoatUser";
import ModalDeleteUser from "../../components/modal/user/poupXoaUser";
import { sendGet } from "../../utils/api";
// import Highlighter from 'react-highlight-words';

export default function ListBlog() {
  const [data, setData] = useState();
  const [, setSearchText] = useState("");
  const [, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: true,
              });
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => <p>{text}</p>,
  });
  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      width: "40px",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "time",
      render: (_, record) => <>{new Date(record.createdAt).toLocaleString()}</>,
    },
    {
      title: "Tiêu đề ",
      dataIndex: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      render: (_, record) => <>{record.user?.username}</>,
      ...getColumnSearchProps("author"),
    },

    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <>
          <div className="table-cell-action">
            <ModalactivatedUser
              className="modal-active-user"
              data={record}
              type="1"
            />
            <ModalDeleteUser
              className="modal-delete-user"
              data={record}
              type="1"
            />
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
  const listBlog = async () => {
    const res = await sendGet("/posts/admin", {
      status: "REJECTED",
      limit: 100,
    });
    if (res.statusCode === 200) {
      setData(res.returnValue?.data);
    } else {
      message.error("Thất bại");
    }
  };
  useEffect(() => {
    listBlog();
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
