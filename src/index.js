 

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './components/DecisionRoute/DecisionRoute';
import AuthLayout from "layouts/Auth/Auth.jsx";
import AdminLayout from "layouts/Admin/Admin.jsx";
import {refreshAccessToken} from './services/User';
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

setInterval(async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if(refreshToken !== 'undefined'){
    const tokens = await refreshAccessToken(refreshToken);
    if(tokens !== null){
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }
  } else {
    window.location.href='/';
  }
}, process.env.REACT_APP_TOKEN_TIMEOUT);