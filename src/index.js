 

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './components/DecisionRoute/DecisionRoute';
import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";

import "assets/css/nucleo-icons.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.0.0";
import "assets/demo/demo.css";
import "react-notification-alert/dist/animate.css";
import SetupAxiosInterceptors from './services/SetupAxiosInterceptors';
const hist = createBrowserHistory();
SetupAxiosInterceptors(null, hist);
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <PrivateRoute path="/admin" component={AdminLayout} />} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);


function isAuthorized(){
  const token = localStorage.getItem("accessToken");
  console.log(token)
	if(token !== null){
		return true;
	}
	return false;
}