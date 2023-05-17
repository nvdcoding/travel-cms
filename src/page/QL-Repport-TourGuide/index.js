import React, { useEffect } from "react";
import "../../assets/css/home.css";
import { Tabs } from "antd";
import Layout from "../../components/layout/layout";
export default function ManageReportToudeGuide() {
  useEffect(() => {}, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Báo cáo HDV" key="1"></Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử phê duyệt" key="2"></Tabs.TabPane>
          </Tabs>
          ;
        </div>
      </Layout>
    </>
  );
}
