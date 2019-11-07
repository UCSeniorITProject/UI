/*!

=========================================================
* Black Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './components/DecisionRoute/DecisionRoute';
import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";
import RTLLayout from "layouts/RTL/RTL.jsx";

import "assets/css/nucleo-icons.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.0.0";
import "assets/demo/demo.css";
import "react-notification-alert/dist/animate.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <PrivateRoute path="/admin" authed = {isAuthorized()} component={AdminLayout} />} />
      <PrivateRoute path="/rtl" authed = {isAuthorized()} component={RTLLayout} />} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);


function isAuthorized(){
	const token = localStorage.getItem('accessToken');
	if(token){
		return true;
	}
	return false;
}