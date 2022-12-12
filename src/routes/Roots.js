import { lazy } from "react";
import { ROUTES } from "../constants/route";
const manageAdmin = lazy(() => import("../page/Ql-Admin/manage-admin"));
const activeAdmin = lazy(() => import("../page/Ql-Admin/activeAdmin"));
const manageHdv = lazy(() => import("../page/Ql-HDV/manage-hdv"));
// pages
const Home = lazy(() => import("../page/HomePage"));

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
];
export default RoutePage;