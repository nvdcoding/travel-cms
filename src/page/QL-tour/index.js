import React, { useEffect } from "react";
import "../../assets/css/home.css";
import { Tabs } from "antd";
import Layout from "../../components/layout/layout";
import YeuCau from "./yeucau";
import Tour from "./tour";
import TuChoi from "./tuchoi";

export default function ManageTour() {
  useEffect(() => {}, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Yêu cầu phê duyệt" key="1">
              <YeuCau />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Danh sách tour" key="3">
              <Tour />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tour từ chối" key="2">
              <TuChoi />
            </Tabs.TabPane>
          </Tabs>
          ;
        </div>
      </Layout>
    </>
  );
}
