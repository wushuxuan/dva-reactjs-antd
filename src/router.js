import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Admin from "./routes/Admin/admin.js";
import Login from "./routes/Login/Login.js";
import Header from "./components/Header/header.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/admin" component={Admin} />
        <Route path='/admin/Header' component={Header}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
