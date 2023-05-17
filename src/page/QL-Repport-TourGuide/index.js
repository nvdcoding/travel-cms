import React, { useEffect } from "react";
import "../../assets/css/home.css";
import { Tabs } from "antd";
import Layout from "../../components/layout/layout";
import RequestReportHDV from "./yeucau";
import HistoryReportHDV from "./lichsu";
import ProcessReportHDV from "./process";
export default function ManageReportToudeGuide() {
  useEffect(() => { }, []);
  return (
    <>
      <Layout>
        <div className="home__wrapper">
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Báo cáo HDV" key="1">
              <RequestReportHDV />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đang xử lý" key="2">
              <ProcessReportHDV />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đã xử lý" key="3">
              <HistoryReportHDV />
            </Tabs.TabPane>
          </Tabs>
          ;
        </div>
      </Layout>
    </>
  );
}
