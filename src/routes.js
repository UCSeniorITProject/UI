 
import Register from "views/pages/Register.jsx";
import User from "views/pages/User.jsx";
import Login from "views/pages/Login.jsx";

const routes = [
  {
    collapse: true,
    name: "Pages",
    icon: "tim-icons icon-image-02",
    state: "pagesCollapse",
    views: [
      {
        path: "/login",
        name: "Login",
        mini: "L",
        component: Login,
        layout: "/auth"
      },
      {
        path: "/register",
        name: "Register",
        mini: "R",
        component: Register,
        layout: "/auth"
      },
      {
        path: "/user-profile",
        name: "User Profile",
        mini: "UP",
        component: User,
        layout: "/admin"
      }
    ]
  },
];

export default routes;
