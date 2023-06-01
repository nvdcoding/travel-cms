import React, { useEffect, useState } from "react";
import "../assets/css/home.css";
import Layout from "../components/layout/layout";
import { sendGet, sendPut } from "../utils/api";
import { Button, Form, Input, InputNumber, message } from "antd";

export default function Hethong() {
  const [data, setData] = useState();
  const getSetting = async () => {
    try {
      let result = await sendGet("/setting");
      if (result.statusCode === 200) {
        setData(result.returnValue);
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      message.error("thất bại");
    }
  };
  const onFinish = async (values) => {
    try {
      values.commission = parseInt(values.commission);
      values.returnUserPercent = parseInt(values.returnUserPercent);
      values.warningTime = parseInt(values.warningTime)
        ? parseInt(values.warningTime)
        : 3;
      values.tourGuidePrepaidOrder = parseInt(values.tourGuidePrepaidOrder);

      let result = await sendPut("/setting", values);
      if (result.statusCode === 200) {
        message.success("Update thành công");
        await getSetting();
      } else {
        message.error("thất bại");
      }
    } catch (error) {
      message.error("thất bại");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    getSetting();
  }, []);
  return (
    <>
      <Layout>
        <div className="main main-setting">
          {data && (
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="tourGuidePrepaidOrder"
                label="Hướng dẫn viên đặt cọc trước"
                rules={[
                  {
                    required: true,
                    message: "Không đưọc để trống!",
                  },
                ]}
                initialValue={data?.tourGuidePrepaidOrder}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số lần cảnh báo HDV"
                name="commission"
                rules={[
                  {
                    required: true,
                    message: "Số lần cảnh báo HDV không đưọc để trống!",
                  },
                ]}
                initialValue={data?.commission}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tỉ lệ phần trăm đền bù user"
                name="returnUserPercent"
                rules={[
                  {
                    required: true,
                    message: "Tỉ lệ phần trăm đền bù user không đưọc để trống!",
                  },
                ]}
                initialValue={data?.returnUserPercent}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Hoa hồng hệ thống"
                name="balance"
                rules={[
                  {
                    required: true,
                    message: "Hoa hồng hệ thống!",
                  },
                ]}
                initialValue={data?.balance}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <div className="btn-setting group-button">
                  <Button
                    type="primary"
                    danger
                    htmlType="submit"
                    className="group-button-ok"
                  >
                    Lưu
                  </Button>
                  <Button
                    className="button-normal group-button-no-ok"
                    htmlType="reset"
                  >
                    Hủy
                  </Button>
                </div>
              </Form.Item>
            </Form>
          )}
        </div>
      </Layout>
    </>
  );
}
