import User from "views/pages/User.jsx";
import Login from "views/pages/Login.jsx";

const routes = [
    {
      collapse: true,
      name: "User",
      rtlName: "",
      icon: "tim-icons icon-image-02",
      state: "pagesCollapse",
      views: [
        {
          path: "/user-profile",
          name: "User Profile",
          rtlName: "ملف تعريفي للمستخدم",
          mini: "UP",
          rtlMini: "شع",
          component: User,
          layout: "/admin"
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      rtlName: "هعذاتسجيل الدخول",
      mini: "L",
      rtlMini: "هعذا",
      component: Login,
      layout: "/auth"
    },
  ];

export default routes;
