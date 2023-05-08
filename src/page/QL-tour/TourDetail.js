/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Button, message, Popconfirm, Skeleton } from "antd";
import { useParams, useHistory } from "react-router-dom";
import Layout from "../../components/layout/layout";
import { sendGet } from "../../utils/api";

export default function TourDetail() {
  const [data, setData] = useState([]);
  const params = useParams();
  const history = useHistory();
  const handleDeny = async (key) => {
    message.success("Từ chối thành công!");
    history.push("/quan-ly-tour");
  };
  const handlePost = async (key, value) => {
    message.success("Phê duyệt tour");
    history.push("/quan-ly-tour");
  };
  const dataTour = async () => {
    const res = await sendGet(`/tours/${params.id}`, { limit: 100 });
    if (res.statusCode == 200) {
      setData(res.data);
    } else {
      message.error("Lỗi hệ thống");
    }
  };
  useEffect(() => {
    dataTour();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!Object.keys(data).length) return <Skeleton />;
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <div className="blog-action">
            <Button type="primary" danger onClick={() => handlePost(params.id)}>
              Phê duyệt
            </Button>
            <Button type="primary" className="button-deny">
              <Popconfirm
                title="Từ chối bài viết?"
                onConfirm={() => handleDeny(params.id)}
              >
                Từ chối
              </Popconfirm>
            </Button>
            <Button
              className="button-nomal"
              onClick={() => history.push("/quan-ly-tour")}
            >
              Trở về
            </Button>
          </div>
        </div>
        <h2>
          <strong>Tiêu đề: </strong> {data?.name}
        </h2>
        <h3>
          <strong>Mô tả: </strong> {data?.description}
        </h3>
        <img
          src={data?.images[0]?.url}
          alt="ảnh mô tả"
          className="img-detail"
        />
        <p className="value">
          <strong>Giá cơ bản: </strong> {data?.basePrice}
        </p>
        <p className="value">
          <strong>Giá tour: </strong> {data?.maxPrice}
        </p>
        <p className="value">
          <strong>Số người tối đa: </strong> {data?.maxMember}
        </p>
        <p className="value">
          <strong>Giá tour: </strong> {data?.feePerMember}
        </p>
        <p className="value">
          <strong>Lịch trình: </strong>
        </p>
        {data.tourSchedule?.map((item, index) => {
          <div className="schedule" key={index}>
            <p className="value">
              <strong>Ngày {index + 1}</strong>
            </p>
            <p className="value">
              <strong>Tiêu đề: </strong> {item?.title}
            </p>
            <p className="value">
              <strong>Mô tả</strong>
              {item?.content}
            </p>
          </div>;
        })}

        <div className="content">Nội dung ở đây id: {params.id}</div>
      </Layout>
    </>
  );
}
