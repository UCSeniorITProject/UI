import User from "views/pages/User.jsx";

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
    }
  ];

export default routes;
