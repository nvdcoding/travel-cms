import React, { useEffect } from "react";
import "../../assets/css/home.css";
import { Button, message, Popconfirm } from "antd";
import { useParams, useHistory } from "react-router-dom";
import { logo } from "../../constants/images";
import Layout from "../../components/layout/layout";

export default function BlogDetail() {
  // const [data, setData] = useState([]);
  const params = useParams();
  const history = useHistory();
  const handleDelete = async (key) => {
    message.success("Xóa thành công!");
    history.push("/quan-ly-blog");
  };
  const handlePost = async (key, value) => {
    message.success("Duyệt bài viết");
    history.push("/quan-ly-blog");
  };
  useEffect(() => {
    const handleView = async () => {
      message.success("TC");
    };
    handleView();
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
            <Button type="primary" danger onClick={() => handlePost(params.id)}>
              Phê duyệt
            </Button>
            <Button type="primary" className="button-deny">
              <Popconfirm
                title="Từ chối bài viết?"
                onConfirm={() => handleDelete(params.id)}
              >
                Từ chối
              </Popconfirm>
            </Button>
            <Button
              className="button-nomal"
              onClick={() => history.push("/quan-ly-blog")}
            >
              Trở về
            </Button>
          </div>
        </div>
        <h2>
          <strong>Tiêu đề: </strong> Đi du lịch
        </h2>
        <h3>
          <strong>Tác giả: </strong> Mai Lam
        </h3>
        <img src={logo} alt="ảnh mô tả" className="img-detail" />
        <div className="content">Nội dung ở đây id: {params.id}</div>
      </Layout>
    </>
  );
}
