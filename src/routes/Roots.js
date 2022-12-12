import { lazy } from "react";
import { ROUTES } from "../constants/route";
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
];
export default RoutePage;