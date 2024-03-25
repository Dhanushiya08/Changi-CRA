import { lazy } from "react";
const IndexOfDocumentUpload = lazy(
  () => import("../super-admin/document-upload/IndexOfDocumentUpload")
);
// const Sample = lazy(() => import("../t_est/Sample"));
const NotFound = lazy(() => import("./NotFound"));
const IndexOfUserManage = lazy(
  () => import("../super-admin/user-manage/IndexOfUsermanage")
);
const IndexOfDashboard = lazy(
  () => import("../super-admin/dashboard/IndexOfDashboard")
);
const IndexOfUserSetting = lazy(
  () => import("../super-admin/user-setting/IndexOfUserSetting")
);
const IndexOfSignin = lazy(() => import("../components/login/IndexOfSignin"));
const IndexOfHistory = lazy(
  () => import("../super-admin/chathistory/IndexOfHistory")
);
const LAYOUT_TYPE = {
  TWO_COLUMN: "TWO_COLUMN",
};
const roles = { USER: "user", ADMIN: "super admin" };
const { USER, ADMIN } = roles;
const PRIVATE_ROUTES = [
  {
    path: "/document-upload",
    layoutType: LAYOUT_TYPE.TWO_COLUMN,
    component: <IndexOfDocumentUpload />,
    loadingFallback: null,
    accessTo: [ADMIN, USER],
  },
  {
    path: "/user-management",
    layoutType: LAYOUT_TYPE.TWO_COLUMN,
    component: <IndexOfUserManage />,
    loadingFallback: null,
    accessTo: [ADMIN, USER],
  },
  {
    path: "/dashboard",
    layoutType: LAYOUT_TYPE.TWO_COLUMN,
    component: <IndexOfDashboard />,
    loadingFallback: null,
    accessTo: [ADMIN, USER],
  },
  {
    path: "/settings",
    layoutType: LAYOUT_TYPE.TWO_COLUMN,
    component: <IndexOfUserSetting />,
    loadingFallback: null,
    accessTo: [ADMIN, USER],
  },
  {
    path: "/chatbot-history",
    layoutType: LAYOUT_TYPE.TWO_COLUMN,
    component: <IndexOfHistory />,
    loadingFallback: null,
    accessTo: [ADMIN, USER],
  },
];
const PUBLIC_ROUTES = [
  {
    path: "*",
    layoutType: null,
    component: <NotFound />,
    loadingFallback: null,
  },
  {
    path: "/",
    layoutType: null,
    component: <IndexOfSignin />,
    loadingFallback: null,
  },
  {
    path: "/sign-in",
    layoutType: null,
    component: <IndexOfSignin />,
    loadingFallback: null,
  },
  // {
  //   path: "/s",
  //   layoutType: null,
  //   component: <Sample />,
  //   loadingFallback: null,
  // },
];
export { LAYOUT_TYPE, PRIVATE_ROUTES, PUBLIC_ROUTES };
