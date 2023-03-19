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

/**
 * define main pages routes
 */
const RoutePage = [
  {
    path: ROUTES.HOME,
    exact: true,
    component: Home,
  },
  {
    path: ROUTES.MANAGEADMIN,
    exact: true,
    component: manageAdmin,
  },
  {
    path: ROUTES.ACTIVEADMIN,
    exact: true,
    component: activeAdmin,
  },
  {
    path: ROUTES.MANAGEHDV,
    exact: true,
    component: manageHdv,
  },
  {
    path: ROUTES.MANAGEVOUCHER,
    exact: true,
    component: manageVoucher,
  },
  {
    path: ROUTES.MANAGEBLOG,
    exact: true,
    component: manageBlog,
  },
  {
    path: ROUTES.BLOGDETAIL,
    exact: true,
    component: blogDetail,
  },
  {
    path: ROUTES.THONGKE,
    exact: true,
    component: thongKe,
  },
  {
    path: ROUTES.MANAGEUSER,
    exact: true,
    component: Home,
  },
];
export default RoutePage;
