import { lazy } from "react";
import { ROUTES } from "../constants/route";
const manageAdmin = lazy(() => import("../page/Ql-Admin/manage-admin"));
const activeAdmin = lazy(() => import("../page/Ql-Admin/activeAdmin"));
const manageHdv = lazy(() => import("../page/Ql-HDV/manage-hdv"));
// pages
const Home = lazy(() => import("../page/HomePage"));
const manageVoucher = lazy(() => import("../page/Ql-Voucher/list-voucher"));
const manageBlog = lazy(() => import("../page/Ql-Blog/manage-blog"));
const blogDetail = lazy(() => import("../page/Ql-Blog/Blog-Detail"));
const thongKe = lazy(() => import("../page/Thongke"));
const dangnhap = lazy(() => import("../page/SignIn"));
const QlTour = lazy(() => import("../page/QL-tour/index"));
const Hethong = lazy(() => import("../page/Hethong"));
const TourDetail = lazy(() => import("../page/QL-tour/TourDetail"));
const Ruttien = lazy(() => import("../page/Ql-RutTien/index"));
const reportPost = lazy(() => import("../page/QL-Repport-Post/index"));
const reportHdv = lazy(() => import("../page/QL-Repport-TourGuide/index"));

/**
 * define main pages routes
 */
const RoutePage = [
  {
    path: ROUTES.HOME,
    exact: true,
    authen: true,
    component: Home,
  },
  {
    path: ROUTES.MANAGEADMIN,
    exact: true,
    authen: true,
    component: manageAdmin,
  },
  {
    path: ROUTES.ACTIVEADMIN,
    exact: true,
    authen: true,
    component: activeAdmin,
  },
  {
    path: ROUTES.MANAGEHDV,
    exact: true,
    authen: true,
    component: manageHdv,
  },
  {
    path: ROUTES.MANAGEVOUCHER,
    exact: true,
    authen: true,
    component: manageVoucher,
  },
  {
    path: ROUTES.BAOCAOHDV,
    exact: true,
    authen: true,
    component: reportHdv,
  },
  {
    path: ROUTES.BAOCAOPOST,
    exact: true,
    authen: true,
    component: reportPost,
  },
  {
    path: ROUTES.MANAGEBLOG,
    exact: true,
    authen: true,
    component: manageBlog,
  },
  {
    path: ROUTES.BLOGDETAIL,
    exact: true,
    authen: true,
    component: blogDetail,
  },
  {
    path: ROUTES.THONGKE,
    exact: true,
    authen: true,
    component: thongKe,
  },
  {
    path: ROUTES.MANAGEUSER,
    exact: true,
    authen: true,
    component: Home,
  },
  {
    path: ROUTES.QLTOUR,
    exact: true,
    authen: true,
    component: QlTour,
  },
  {
    path: ROUTES.HETHONG,
    exact: true,
    authen: true,
    component: Hethong,
  },
  {
    path: ROUTES.RUTTIEN,
    exact: true,
    authen: true,
    component: Ruttien,
  },
  {
    path: ROUTES.TOURDETAIL,
    exact: true,
    authen: true,
    component: TourDetail,
  },
  {
    path: ROUTES.DANGNHAP,
    exact: true,
    component: dangnhap,
  },
];
export default RoutePage;
