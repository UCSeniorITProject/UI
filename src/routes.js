import Register from "views/pages/Register.jsx";
import Prescribe from "views/pages/Prescribe.jsx";
import User from "views/pages/User.jsx";
import Login from "views/pages/Login.jsx";
import AddPatient from "views/pages/AddPatient";
import PatientList from "./views/pages/PatientList";
import PatientProfile from "./views/pages/PatientProfile";
import AddPharmacy from "./views/pages/AddPharmacy";
import PharmacyList from "./views/pages/PharmacyList";
import PharamacyProfile from "./views/pages/PharmacyProfile";
import AddDrug from "./views/pages/AddDrug";
import DrugList from "./views/pages/DrugList";
import DrugProfile from "./views/pages/DrugProfile";
import PrescribableProfile from "./views/pages/PrescribableProfile";
import PrescriptionReason from "./views/pages/PrescriptionReason";
import PatientAnalytics from "./views/pages/PatientAnalytics";
import DoctorList from "./views/pages/DoctorList";
import DoctorAnalytics from "./views/pages/DoctorAnalytics";

const routes = [
  {
    collapse: true,
    name: "User",
    rtlName: "",
    icon: "tim-icons icon-single-02",
    state: "userCollapse",
    requiredRoles: [],
    views: [
      {
        path: "/user-profile",
        name: "User Profile",
        mini: "UP",
        component: User,
        isHidden: false,
        requiredRoles: [],
        layout: "/admin",
      },
      {
        path: "/login",
        name: "Login",
        mini: "L",
        component: Login,
        requiredRoles: [],
        isHidden: true,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        mini: "R",
        isHidden: true,
        requiredRoles: [],
        component: Register,
        layout: "/auth",
      },
    ],
  },
  {
    collapse: true,
    name: "Pharmacy",
    rtlName: "tim-icons icon-tap-02",
    icon: "tim-icons icon-tap-02",
    state: "pharmacyCollapse",
    requiredRoles: ["Doctor", "Pharmacist", "Admin"],
    views: [
      {
        collapse: true,
        name: "Drugs",
        mini: "D",
        state: "drugCollapse",
        requiredRoles: ["Doctor", "Pharmacist", "Admin"],
        views: [
          {
            path: "/drug/new",
            name: "Add Drug",
            mini: "AD",
            component: AddDrug,
            isHidden: false,
            requiredRoles: ["Pharmacist", "Admin"],
            state: "addDrug",
            layout: "/admin",
          },
          {
            path: "/drug/list",
            name: "Drug List",
            mini: "DL",
            component: DrugList,
            isHidden: false,
            state: "drugList",
            requiredRoles: [],
            layout: "/admin",
          },
          {
            path: "/drug/profile/:id",
            name: "Drug Profile",
            mini: "DL",
            component: DrugProfile,
            isHidden: true,
            state: "drugProfile",
            requiredRoles: [],
            layout: "/admin",
          },
          {
            path: "/prescribable/profile/:id",
            name: "Prescribable Profile",
            mini: "PP",
            component: PrescribableProfile,
            isHidden: true,
            state: "prescribableProfile",
            requiredRoles: [],
            layout: "/admin",
          },
        ],
      },
      {
        path: "/pharmacy/prescription/reason",
        name: "Prescription Reasons",
        mini: "PR",
        requiredRoles: ["Doctor"],
        component: PrescriptionReason,
        isHidden: false,
        layout: "/admin",
      },
      {
        path: "/pharmacy/prescribe",
        name: "Prescribe",
        mini: "P",
        requiredRoles: ["Doctor"],
        component: Prescribe,
        isHidden: false,
        layout: "/admin",
      },
      {
        path: "/pharmacy/new",
        name: "Create Pharmacy",
        mini: "P",
        requiredRoles: ["Doctor", "Pharmacist", "Admin"],
        component: AddPharmacy,
        isHidden: false,
        layout: "/admin",
      },
      {
        path: "/pharmacy/list",
        name: "Pharmacy List",
        mini: "PL",
        requiredRoles: ["Doctor", "Pharmacist", "Admin"],
        component: PharmacyList,
        isHidden: false,
        layout: "/admin",
      },
      {
        path: "/pharmacy/profile/:id/",
        name: "Pharmacy Profile",
        mini: "PP",
        component: PharamacyProfile,
        requiredRoles: ["Doctor", "Pharmacist", "Admin"],
        isHidden: true,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Patient",
    rtlName: "tim-icons icon-badge",
    icon: "tim-icons icon-badge",
    state: "patientCollapse",
    requiredRoles: ["Doctor", "Pharmacist"],
    views: [
      {
        path: "/patient/new",
        name: "Create New",
        mini: "C",
        requiredRoles: ["Doctor"],
        component: AddPatient,
        isHidden: false,
        layout: "/admin",
      },
      {
        path: "/patient/profile/:id/",
        name: "Patient Profile",
        mini: "P",
        requiredRoles: ["Doctor"],
        component: PatientProfile,
        isHidden: true,
        layout: "/admin",
      },
      {
        path: "/patient/list",
        name: "View List",
        mini: "P",
        requiredRoles: ["Doctor"],
        component: PatientList,
        isHidden: false,
        layout: "/admin",
      },
      {
        path: "/patient/:id/analytics",
        name: "Analytics",
        mini: "A",
        requiredRoles: [],
        component: PatientAnalytics,
        isHidden: true,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Doctors",
    rtlName: "",
    icon: "tim-icons icon-heart-2",
    state: "roleCollapse",
    requiredRoles: ["Admin"],
    views: [
      {
        path: "/doctor/list",
        name: "Doctor List",
        mini: "DL",
        component: DoctorList,
        isHidden: false,
        requiredRoles: [],
        layout: "/admin",
      },
      {
        path: "/doctor/:id/analytics",
        name: "Doctor Analytics",
        mini: "DL",
        component: DoctorAnalytics,
        isHidden: true,
        requiredRoles: [],
        layout: "/admin",
      },
    ],
  },
];

export default routes;
