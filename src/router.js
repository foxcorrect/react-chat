import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Login from './containers/login/index'

function RouterConfig({ history }) {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Redirect exact from="/" to="/login" ></Redirect>
                    <Route path="/login" component={Login} />
                </Switch>
            </Router>
        </div>
    )
}

export default RouterConfig;