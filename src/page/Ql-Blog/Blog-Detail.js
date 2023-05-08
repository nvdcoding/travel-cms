import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import { Button, message, Popconfirm } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { logo } from "../../constants/images";
import Layout from "../../components/layout/layout";
import { sendGet, sendPut } from "../../utils/api";

export default function BlogDetail() {
  const [data, setData] = useState();
  const params = useParams();
  const history = useHistory();
  const handlePost = async (value) => {
    const post = await sendPut(`/posts/admin`, {
      postId: parseInt(params.id),
      status: value,
    });
    if (post.statusCode == 200) {
      history.push("/quan-ly-blog");
      message.success("Cập nhật trạng thái bài viết");
    }
  };
  const Blog = async () => {
    const res = await sendGet(`/posts/admin/${params.id}`, { limit: 100 });
    if (res.statusCode === 200) {
      setData(res.returnValue);
    } else {
      message.error("Cập nhật khóa học thất bại");
    }
  };
  useEffect(() => {
    Blog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // if (!Object.keys(data).length)
  // return (
  // <>
  // <Skeleton />
  // </>
  // );
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <div className="blog-action">
            <Button type="primary" danger onClick={() => handlePost("ACTIVE")}>
              Phê duyệt
            </Button>
            <Button
              type="primary"
              className="button-deny"
              onClick={() => handlePost("REJECTED")}
            >
              Từ chối
            </Button>
            <Button
              className="button-nomal"
              onClick={() => history.push("/quan-ly-blog")}
            >
              Trở về
            </Button>
          </div>
        </div>
        <div className="main-detail">
          <h2>
            <strong>Tiêu đề: </strong> {data?.title}
          </h2>
          <h3>
            <strong>
              Tác giả:{" "}
              {data?.tourGuide != null
                ? data?.tourGuide.username
                : data?.user.username}{" "}
            </strong>
          </h3>
          <img src={data?.image} alt="ảnh mô tả" className="img-detail" />
          <div className="content">
            {" "}
            <h3>
              <strong>Nội dung ở đây: </strong>
            </h3>{" "}
            <p dangerouslySetInnerHTML={{ __html: data?.currentContent }} />
          </div>
        </div>
      </Layout>
    </>
  );
}
