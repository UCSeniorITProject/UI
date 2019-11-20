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
    state: "userCollapse",
    requiredRoles:  [],
    views: [
      {
        path: "/user-profile",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        mini: "UP",
        component: User,
        isHidden: false,
        requiredRoles:  [],
        layout: "/admin"
      },
      {
        path: "/login",
        name: "Login",
        mini: "L",
        component: Login,
        requiredRoles:  [],
        isHidden: true,
        layout: "/auth"
      },
      {
        path: "/register",
        name: "Register",
        mini: "R",
        isHidden: true,
        requiredRoles:  [],
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
    state: "pharmacyCollapse",
    requiredRoles:  ['Doctor', 'Pharmacist'],
    views: [
      {
        path: "/prescribe",
        name: "Prescribe",
        mini: "P",
        requiredRoles:  ['Doctor'],
        component: Prescribe,
        isHidden: false,
        layout: "/admin"
      },
    ],
  }
];

export default routes;
