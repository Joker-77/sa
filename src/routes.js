/* eslint-disable */

import Products from "layouts/products";
import SignIn from "layouts/authentication/sign-in";

// @mui icons
import Icon from "@mui/material/Icon";
import Categories from "layouts/categories";
import Damaged from "layouts/damaged";
import Stores from "layouts/stores";
import Users from "layouts/users";
import Coupons from "layouts/coupons";
import Dashboard from "layouts/dashboard";
import Orders from "layouts/orders";
import Sliders from "layouts/sliders";
import Complaints from "layouts/complaints";

const routes = [
  {
    type: "collapse",
    name: "Home",
    ar_name: "الصفحة الرئيسية",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Products",
    ar_name: "المنتجات",
    key: "products",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/products",
    component: <Products />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Damaged Products",
    ar_name: "المنتجات التالفة",
    key: "damaged",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/damaged",
    component: <Damaged />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Categories",
    ar_name: "الأصناف",
    key: "categories",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/categories",
    component: <Categories />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Stores",
    ar_name: "المتاجر",
    key: "stores",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/stores",
    component: <Stores />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Users",
    ar_name: "المستخدمين",
    key: "users",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/users",
    component: <Users />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Coupons",
    ar_name: "الكوبونات",
    key: "coupons",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/coupons",
    component: <Coupons />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Orders",
    ar_name: "الطلبات",
    key: "orders",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/orders",
    component: <Orders />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Sliders",
    ar_name: "الصورة المنزلقة",
    key: "sliders",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/sliders",
    component: <Sliders />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "complaints",
    ar_name: "الشكاوى",
    key: "complaints",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/complaints",
    component: <Complaints />,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
    isPrivate: false,
  },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  //   isPrivate: true,
  // },
 
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
