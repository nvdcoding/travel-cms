import React, { useEffect } from "react";
import "../../assets/css/home.css";
import { Tabs } from "antd";
import Layout from "../../components/layout/layout";
import YeuCauRutTien from "./yeucauruttien";
import LichSuRutTien from "./lichsuruttien";
export default function ManageRutTien() {
    useEffect(() => { }, []);
    return (
        <>
            <Layout>
                <div className="home__wrapper">
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Yêu cầu rút tiền" key="1">
                            <YeuCauRutTien />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Lịch sử phê duyệt" key="2">
                            <LichSuRutTien />
                        </Tabs.TabPane>
                    </Tabs>
                    ;
                </div>
            </Layout>
        </>
    );
}
