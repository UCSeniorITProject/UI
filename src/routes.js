import Register from "views/pages/Register.jsx";

import Prescribe from "views/pages/Prescribe.jsx";
import User from "views/pages/User.jsx";
import Login from "views/pages/Login.jsx";

const routes = [
  {
    collapse: true,
    name: "User",
    rtlName: "",
    icon: "tim-icons icon-single-02",
    state: "pagesCollapse",
    views: [
      {
        path: "/user-profile",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        mini: "UP",
        component: User,
        isHidden: false,
        layout: "/admin"
      },
      {
        path: "/login",
        name: "Login",
        mini: "L",
        component: Login,
        isHidden: true,
        layout: "/auth"
      },
      {
        path: "/register",
        name: "Register",
        mini: "R",
        isHidden: true,
        component: Register,
        layout: "/auth"
      },
    ]
  },
  {
    collapse: true,
    name: "Pharmacy",
    rtlName: "tim-icons icon-tap-02",
    icon: "tim-icons icon-tap-02",
    state: "pagesCollapse",
    views: [
      {
        path: "/prescribe",
        name: "Prescribe",
        mini: "P",
        component: Prescribe,
        isHidden: false,
        layout: "/admin"
      },
    ],
  }
];

export default routes;
