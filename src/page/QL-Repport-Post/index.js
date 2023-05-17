import React, { useEffect } from "react";
import "../../assets/css/home.css";
import { Tabs } from "antd";
import Layout from "../../components/layout/layout";
import RequestReport from "./yeucau";
import HistoryReport from "./lichsu";
export default function ManageReportPost() {
  useEffect(() => { }, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Báo cáo bài viết" key="1">
              <RequestReport />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử phê duyệt" key="2">
              <HistoryReport />
            </Tabs.TabPane>
          </Tabs>
          ;
        </div>
      </Layout>
    </>
  );
}
